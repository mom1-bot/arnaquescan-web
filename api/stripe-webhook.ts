import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import Stripe from "stripe";
import { adminDb } from "./_lib/firebaseAdmin.js";

// Raw body is required to verify the Stripe signature below.
export const config = { api: { bodyParser: false } };

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const ACTIVE_STATUSES = new Set<Stripe.Subscription.Status>(["active", "trialing"]);

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function setPremium(
  uid: string,
  premium: boolean,
  extra: Record<string, unknown> = {}
) {
  await adminDb()
    .collection("users")
    .doc(uid)
    .set(
      {
        premium,
        premiumSource: "stripe",
        premiumUpdatedAt: FieldValue.serverTimestamp(),
        ...extra,
      },
      { merge: true }
    );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: true, code: "method_not_allowed" });
    return;
  }

  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    res.status(500).json({ error: true, code: "server_error" });
    return;
  }

  const signature = req.headers["stripe-signature"];
  if (typeof signature !== "string") {
    res.status(400).json({ error: true, code: "bad_request" });
    return;
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  let event: Stripe.Event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    res.status(400).json({ error: true, code: "invalid_signature" });
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.client_reference_id ?? (session.metadata?.firebaseUid as string | undefined);
        if (uid) {
          await setPremium(uid, true, {
            stripeCustomerId: typeof session.customer === "string" ? session.customer : (session.customer?.id ?? null),
            stripeSubscriptionId:
              typeof session.subscription === "string" ? session.subscription : (session.subscription?.id ?? null),
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (uid) {
          const active = event.type === "customer.subscription.updated" && ACTIVE_STATUSES.has(subscription.status);
          // current_period_end lives on the subscription item, not the subscription itself.
          const periodEnd = subscription.items.data[0]?.current_period_end;
          await setPremium(uid, active, {
            premiumExpiresAt: periodEnd ? Timestamp.fromMillis(periodEnd * 1000) : null,
          });
        }
        break;
      }

      default:
        // Unhandled event type — ack so Stripe doesn't retry.
        break;
    }
  } catch (err) {
    console.error(`[stripe-webhook] Failed to process ${event.type}:`, err);
    // Still 200: Stripe retries on non-2xx and a transient Firestore hiccup
    // shouldn't cause pile-up of retries. Logged for follow-up.
  }

  res.status(200).json({ received: true });
}
