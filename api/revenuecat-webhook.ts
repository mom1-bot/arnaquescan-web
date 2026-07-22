import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./_lib/firebaseAdmin.js";
import { logError } from "./_lib/sentry.js";

// Configured in the RevenueCat dashboard (Project Settings > Integrations >
// Webhooks) as the value of a custom "Authorization" header sent with every
// call, so we can reject anything that didn't actually come from RevenueCat.
const WEBHOOK_SECRET = process.env.REVENUECAT_WEBHOOK_SECRET;

// app_user_id is the Firebase uid: the mobile app calls Purchases.logIn(uid)
// right after Firebase sign-in, so RevenueCat's app_user_id and our uid match.
type RCWebhookBody = {
  event: {
    type: string;
    app_user_id: string;
    entitlement_ids?: string[];
    product_id?: string;
    expiration_at_ms?: number | null;
  };
};

// Events that mean the "ArnaqueScan Pro" entitlement is (still) active.
// CANCELLATION only turns off auto-renew — access remains until expiration.
const PREMIUM_ON = new Set([
  "INITIAL_PURCHASE",
  "RENEWAL",
  "UNCANCELLATION",
  "PRODUCT_CHANGE",
  "CANCELLATION",
]);
const PREMIUM_OFF = new Set(["EXPIRATION"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: true, code: "method_not_allowed" });
    return;
  }

  // RevenueCat's dashboard field for this varies by account/version: some let
  // you type the full "Bearer <secret>" value, others just take the raw
  // secret and send it verbatim. Accept either so a dashboard-side mismatch
  // in that convention doesn't reject legitimate calls.
  const authHeader = req.headers.authorization ?? "";
  const receivedSecret = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!WEBHOOK_SECRET || receivedSecret !== WEBHOOK_SECRET) {
    res.status(401).json({ error: true, code: "unauthorized" });
    return;
  }

  const { event } = req.body as RCWebhookBody;
  if (!event?.app_user_id) {
    res.status(400).json({ error: true, code: "bad_request" });
    return;
  }

  if (!PREMIUM_ON.has(event.type) && !PREMIUM_OFF.has(event.type)) {
    // Unhandled event type (e.g. TRANSFER, BILLING_ISSUE) — ack so RevenueCat
    // doesn't retry, but there's nothing for us to update.
    res.status(200).json({ received: true });
    return;
  }

  const premium = PREMIUM_ON.has(event.type);

  try {
    await adminDb()
      .collection("users")
      .doc(event.app_user_id)
      .set(
        {
          premium,
          premiumEntitlement: premium ? (event.entitlement_ids?.[0] ?? null) : null,
          premiumProductId: premium ? (event.product_id ?? null) : null,
          premiumExpiresAt: event.expiration_at_ms ? Timestamp.fromMillis(event.expiration_at_ms) : null,
          premiumUpdatedAt: FieldValue.serverTimestamp(),
          premiumSource: "webhook",
        },
        { merge: true }
      );
  } catch (err) {
    await logError("[revenuecat-webhook] Firestore write failed:", err);
    // Still 200: RevenueCat retries on non-2xx and we don't want infinite
    // retries for a transient Firestore hiccup to pile up. Logged for follow-up.
  }

  res.status(200).json({ received: true });
}
