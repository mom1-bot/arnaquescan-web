import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// FIREBASE_SERVICE_ACCOUNT_KEY holds the full service-account JSON as a single
// string (Firebase Console > Project Settings > Service Accounts > Generate
// new private key). Required for Firestore Admin access from Vercel —
// unlike Cloud Functions, this runtime gets no Firebase credentials for free.
//
// Deliberately no `firebase-admin/auth` export here: importing it pulls in
// jwks-rsa, which bundles a broken jose@4 build that crashes Vercel's Node
// ESM runtime with ERR_REQUIRE_ESM. We don't need Admin Auth for anything —
// see api/_lib/quota.ts for how the trial window is computed without it.
function getAdminApp(): App {
  if (getApps().length) return getApps()[0];
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("missing_firebase_service_account_key");
  return initializeApp({ credential: cert(JSON.parse(raw)) });
}

let _db: Firestore | undefined;

export function adminDb(): Firestore {
  if (!_db) _db = getFirestore(getAdminApp());
  return _db;
}
