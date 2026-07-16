import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "./firebaseAdmin.js";

const TRIAL_DAYS = 7;
export const FREE_MONTHLY_QUOTA = 3;

export type QuotaResult =
  | { allowed: true; reason: "trial" | "premium" | "under_quota"; used?: number; limit?: number }
  | { allowed: false; used: number; limit: number; resetsAt: string };

function currentMonthKey(): string {
  return new Date().toISOString().slice(0, 7); // "YYYY-MM" UTC
}

/** ISO string for the first instant of next UTC month — used as the quota "resetsAt" hint. */
function nextMonthFirstDayIso(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString();
}

/**
 * Enforces the freemium funnel for a signed-in caller: unlimited during the
 * first TRIAL_DAYS since account creation, then capped at FREE_MONTHLY_QUOTA
 * analyses/month unless the RevenueCat "premium" entitlement is active
 * (synced into Firestore by api/revenuecat-webhook.ts / api/subscription-sync.ts).
 */
export async function checkQuota(uid: string): Promise<QuotaResult> {
  const fbUser = await adminAuth().getUser(uid);
  const createdMs = new Date(fbUser.metadata.creationTime).getTime();
  const trialEndsMs = createdMs + TRIAL_DAYS * 24 * 60 * 60 * 1000;
  if (Date.now() < trialEndsMs) {
    return { allowed: true, reason: "trial" };
  }

  const monthKey = currentMonthKey();
  const ref = adminDb().collection("users").doc(uid);

  return adminDb().runTransaction(async (tx): Promise<QuotaResult> => {
    const snap = await tx.get(ref);
    const data = snap.data();

    const premiumExpiresAt = data?.premiumExpiresAt as Timestamp | undefined;
    const isPremium = data?.premium === true && (!premiumExpiresAt || premiumExpiresAt.toMillis() > Date.now());
    if (isPremium) {
      return { allowed: true, reason: "premium" };
    }

    const sameMonth = data?.quotaMonthKey === monthKey;
    const currentCount: number = sameMonth ? (data?.quotaCount ?? 0) : 0;

    if (currentCount >= FREE_MONTHLY_QUOTA) {
      return { allowed: false, used: currentCount, limit: FREE_MONTHLY_QUOTA, resetsAt: nextMonthFirstDayIso() };
    }

    tx.set(
      ref,
      {
        quotaMonthKey: monthKey,
        quotaCount: currentCount + 1,
        quotaUpdatedAt: FieldValue.serverTimestamp(),
        ...(snap.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );

    return { allowed: true, reason: "under_quota", used: currentCount + 1, limit: FREE_MONTHLY_QUOTA };
  });
}
