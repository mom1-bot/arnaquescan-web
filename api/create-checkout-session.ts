import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { adminDb } from "./_lib/firebaseAdmin.js";
import { verifyFirebaseIdToken } from "./_lib/firebaseAuth.js";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const PLAN_CONFIG = {
  monthly: { amount: 299, interval: "month" as const, label: "Premium Mensuel" },
  annual: { amount: 1999, interval: "year" as const, label: "Premium Annuel" },
};

type Plan = keyof typeof PLAN_CONFIG;

type RequestBody = { plan?: string };

function siteOrigin(req: VercelRequest): string {
  const origin = req.headers.origin;
  if (typeof origin === "string" && origin) return origin;
  const host = req.headers.host;
  return `https://${host ?? "arnaquescan.fr"}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: true, code: "method_not_allowed" });
    return;
  }

  if (!STRIPE_SECRET_KEY) {
    res.status(500).json({ error: true, code: "server_error" });
    return;
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  if (!bearerToken) {
    res.status(401).json({ error: true, code: "unauthorized" });
    return;
  }

  let uid: string;
  let email: string | null;
  try {
    ({ uid, email } = await verifyFirebaseIdToken(bearerToken));
  } catch {
    res.status(401).json({ error: true, code: "unauthorized" });
    return;
  }

  const plan = (req.body as RequestBody)?.plan;
  if (plan !== "monthly" && plan !== "annual") {
    res.status(400).json({ error: true, code: "bad_request" });
    return;
  }
  const { amount, interval, label } = PLAN_CONFIG[plan as Plan];

  // Reuse an existing Stripe customer for this user if we already have one,
  // so repeat/upgrade checkouts don't create duplicate Stripe customers.
  let existingCustomerId: string | undefined;
  try {
    const snap = await adminDb().collection("users").doc(uid).get();
    const data = snap.data();
    if (typeof data?.stripeCustomerId === "string") existingCustomerId = data.stripeCustomerId;
  } catch (err) {
    console.error("[create-checkout-session] Firestore read failed:", err);
    // Non-fatal: Stripe will just create a fresh customer for this session.
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);
  const origin = siteOrigin(req);

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: `ArnaqueScan — ${label}` },
            unit_amount: amount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      customer: existingCustomerId,
      customer_email: existingCustomerId ? undefined : (email ?? undefined),
      client_reference_id: uid,
      metadata: { firebaseUid: uid, plan },
      subscription_data: { metadata: { firebaseUid: uid, plan } },
      success_url: `${origin}/abonnement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/abonnement/annule`,
    });
  } catch (err) {
    console.error("[create-checkout-session] Stripe session creation failed:", err);
    res.status(502).json({ error: true, code: "upstream_error" });
    return;
  }

  if (!session.url) {
    res.status(502).json({ error: true, code: "upstream_error" });
    return;
  }

  res.status(200).json({ url: session.url });
}
