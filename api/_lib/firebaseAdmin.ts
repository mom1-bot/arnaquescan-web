import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// FIREBASE_SERVICE_ACCOUNT_KEY holds the full service-account JSON as a single
// string (Firebase Console > Project Settings > Service Accounts > Generate
// new private key). Required for Firestore/Auth Admin access from Vercel —
// unlike Cloud Functions, this runtime gets no Firebase credentials for free.
function getAdminApp(): App {
  if (getApps().length) return getApps()[0];
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("missing_firebase_service_account_key");
  return initializeApp({ credential: cert(JSON.parse(raw)) });
}

let _auth: Auth | undefined;
let _db: Firestore | undefined;

export function adminAuth(): Auth {
  if (!_auth) _auth = getAuth(getAdminApp());
  return _auth;
}

export function adminDb(): Firestore {
  if (!_db) _db = getFirestore(getAdminApp());
  return _db;
}
