import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./_lib/firebaseAdmin";
import { verifyFirebaseToken } from "./_lib/firebaseAuth";

// Must match the entitlement identifier configured in the RevenueCat dashboard.
const ENTITLEMENT_ID = "ArnaqueScan Pro";

const REVENUECAT_SECRET_KEY = process.env.REVENUECAT_SECRET_KEY;

type RCEntitlement = {
  expires_date?: string | null;
  product_identifier?: string;
};

type RCSubscriberResponse = {
  subscriber: {
    entitlements: Record<string, RCEntitlement>;
  };
};

// Called by the mobile app immediately after a successful purchase/restore so
// Firestore reflects "premium" right away, instead of waiting on
// api/revenuecat-webhook.ts (which can lag a few seconds behind checkout).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: true, code: "method_not_allowed" });
    return;
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  if (!bearerToken) {
    res.status(401).json({ error: true, code: "unauthorized" });
    return;
  }

  let uid: string;
  try {
    uid = await verifyFirebaseToken(bearerToken);
  } catch {
    res.status(401).json({ error: true, code: "unauthorized" });
    return;
  }

  if (!REVENUECAT_SECRET_KEY) {
    res.status(500).json({ error: true, code: "server_error" });
    return;
  }

  let rcResponse: Response;
  try {
    rcResponse = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(uid)}`, {
      headers: { Authorization: `Bearer ${REVENUECAT_SECRET_KEY}` },
    });
  } catch (err) {
    console.error("[subscription-sync] RevenueCat fetch failed:", err);
    res.status(502).json({ error: true, code: "upstream_error" });
    return;
  }

  if (!rcResponse.ok) {
    const errBody = await rcResponse.text().catch(() => "");
    console.error(`[subscription-sync] RevenueCat returned ${rcResponse.status}:`, errBody);
    res.status(502).json({ error: true, code: "upstream_error" });
    return;
  }

  const data = (await rcResponse.json()) as RCSubscriberResponse;
  const entitlement = data.subscriber.entitlements[ENTITLEMENT_ID];
  const expiresAt = entitlement?.expires_date ? new Date(entitlement.expires_date) : null;
  const isActive = !!entitlement && (!expiresAt || expiresAt.getTime() > Date.now());

  try {
    await adminDb()
      .collection("users")
      .doc(uid)
      .set(
        {
          premium: isActive,
          premiumEntitlement: isActive ? ENTITLEMENT_ID : null,
          premiumProductId: isActive ? (entitlement?.product_identifier ?? null) : null,
          premiumExpiresAt: isActive && expiresAt ? Timestamp.fromDate(expiresAt) : null,
          premiumUpdatedAt: FieldValue.serverTimestamp(),
          premiumSource: "sync",
        },
        { merge: true }
      );
  } catch (err) {
    console.error("[subscription-sync] Firestore write failed:", err);
    res.status(503).json({ error: true, code: "service_unavailable" });
    return;
  }

  res.status(200).json({ premium: isActive });
}
