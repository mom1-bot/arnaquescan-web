import { createRemoteJWKSet, jwtVerify } from "jose";

const FIREBASE_PROJECT_ID = "arnaquescan";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

/** Verifies a Firebase Auth ID token and returns the caller's uid and email. Throws on any invalid/expired token. */
export async function verifyFirebaseIdToken(token: string): Promise<{ uid: string; email: string | null }> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
    audience: FIREBASE_PROJECT_ID,
  });
  if (!payload.sub) throw new Error("invalid_token");
  return { uid: payload.sub, email: typeof payload.email === "string" ? payload.email : null };
}

/** Verifies a Firebase Auth ID token and returns the caller's uid. Throws on any invalid/expired token. */
export async function verifyFirebaseToken(token: string): Promise<string> {
  return (await verifyFirebaseIdToken(token)).uid;
}
