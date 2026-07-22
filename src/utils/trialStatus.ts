import type { Timestamp } from "firebase/firestore";

// Keep in sync with TRIAL_DAYS in api/_lib/quota.ts.
export const TRIAL_DAYS = 7;

export type TrialStatus =
  | { kind: "trial"; daysLeft: number }
  | { kind: "premium" }
  | { kind: "free"; used?: number; limit?: number };

interface UserDocData {
  premium?: boolean;
  premiumExpiresAt?: Timestamp;
  createdAt?: Timestamp;
}

/**
 * Mirrors the trial/premium/quota logic in api/_lib/quota.ts, for
 * client-side display only — the API remains the source of truth for
 * whether a request is actually allowed.
 */
export function computeTrialStatus(data: UserDocData | undefined): TrialStatus {
  const premiumExpiresAt = data?.premiumExpiresAt;
  const isPremium = data?.premium === true && (!premiumExpiresAt || premiumExpiresAt.toMillis() > Date.now());
  if (isPremium) return { kind: "premium" };

  // No createdAt means checkQuota (api/_lib/quota.ts) has never run for this
  // uid yet — either no doc at all, or one created some other way (e.g. a
  // RevenueCat/Stripe sync that only ever set premium fields). Either way the
  // server falls back to "trial starts now", so the client must match that
  // exactly rather than only handling the no-doc-at-all case.
  const createdMs = data?.createdAt ? data.createdAt.toMillis() : Date.now();
  const trialEndMs = createdMs + TRIAL_DAYS * 24 * 60 * 60 * 1000;
  const msLeft = trialEndMs - Date.now();
  if (msLeft > 0) {
    return { kind: "trial", daysLeft: Math.max(1, Math.ceil(msLeft / (24 * 60 * 60 * 1000))) };
  }

  return { kind: "free" };
}
