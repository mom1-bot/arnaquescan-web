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
export function computeTrialStatus(data: UserDocData | undefined, docExists: boolean): TrialStatus {
  const premiumExpiresAt = data?.premiumExpiresAt;
  const isPremium = data?.premium === true && (!premiumExpiresAt || premiumExpiresAt.toMillis() > Date.now());
  if (isPremium) return { kind: "premium" };

  // No doc yet means no analysis has ever been run — the trial clock starts
  // at the first call, so a brand-new signed-in user has the full window ahead.
  if (!docExists) return { kind: "trial", daysLeft: TRIAL_DAYS };

  const createdAt = data?.createdAt;
  if (createdAt) {
    const trialEndMs = createdAt.toMillis() + TRIAL_DAYS * 24 * 60 * 60 * 1000;
    const msLeft = trialEndMs - Date.now();
    if (msLeft > 0) {
      return { kind: "trial", daysLeft: Math.max(1, Math.ceil(msLeft / (24 * 60 * 60 * 1000))) };
    }
  }

  return { kind: "free" };
}
