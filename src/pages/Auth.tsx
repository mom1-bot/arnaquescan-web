import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { LogoIcon } from "../components/LogoIcon";

const googleProvider = new GoogleAuthProvider();

export default function Auth() {
  const { user }                = useAuth();
  const navigate                = useNavigate();
  const [params]                = useSearchParams();
  const [mode, setMode]         = useState<"login" | "register" | "reset">(
    params.get("mode") === "register" ? "register" : "login"
  );
  const [firstName, setFirstName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (user) navigate("/analyser", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        setResetSent(true);
      } else if (mode === "register") {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (firstName.trim()) {
          await updateProfile(credential.user, { displayName: firstName.trim() });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const messages: Record<string, string> = {
        "auth/email-already-in-use": "Cet email est déjà utilisé.",
        "auth/invalid-email": "Adresse email invalide.",
        "auth/weak-password": "Mot de passe trop faible (6 caractères minimum).",
        "auth/user-not-found": "Aucun compte trouvé avec cet email.",
        "auth/wrong-password": "Mot de passe incorrect.",
        "auth/invalid-credential": "Email ou mot de passe incorrect.",
        "auth/too-many-requests": "Trop de tentatives. Réessayez dans quelques minutes.",
      };
      setError(messages[code] ?? "Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        // L'utilisateur a fermé la fenêtre — rien à afficher.
      } else if (code === "auth/account-exists-with-different-credential") {
        setError("Un compte existe déjà avec cet email via une autre méthode de connexion.");
      } else {
        setError("Impossible de se connecter avec Google. Réessayez.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const titles = {
    login:    "Se connecter",
    register: "Créer un compte",
    reset:    "Réinitialiser le mot de passe",
  };

  return (
    <div className="bg-sand min-h-screen flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Connexion — ArnaqueScan</title>
        <meta name="description" content="Connectez-vous à votre compte ArnaqueScan pour accéder à votre historique et à toutes les fonctionnalités Premium." />
        <link rel="canonical" href="https://arnaquescan.fr/auth" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <LogoIcon size={40} />
            <span className="text-xl font-black text-gray-900">ArnaqueScan</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-700 mt-3">{titles[mode]}</h1>
        </div>

        {resetSent ? (
          <div className="bg-green/10 border border-green/30 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📧</div>
            <p className="text-sm text-gray-700">
              Un email de réinitialisation a été envoyé à <strong>{email}</strong>.
            </p>
            <button onClick={() => { setMode("login"); setResetSent(false); }} className="mt-4 text-sm text-blue hover:underline font-medium">
              Retour à la connexion
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {error && (
              <div className="bg-red-50 border border-danger/30 rounded-xl px-4 py-2.5 text-sm text-danger flex gap-2 mb-4">
                <span>⚠️</span> {error}
              </div>
            )}

            {mode !== "reset" && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 mb-4"
                >
                  {googleLoading ? (
                    <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
                      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"/>
                      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.27-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"/>
                      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
                    </svg>
                  )}
                  Continuer avec Google
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 font-medium">ou</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Prénom <span className="font-normal text-gray-400">(optionnel)</span></label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue/50 focus:ring-2 focus:ring-blue/10 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Adresse email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue/50 focus:ring-2 focus:ring-blue/10 transition-all"
                />
              </div>

              {mode !== "reset" && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Mot de passe</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue/50 focus:ring-2 focus:ring-blue/10 transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue text-white rounded-xl font-bold text-sm hover:bg-blue/90 transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Chargement…
                  </span>
                ) : titles[mode]}
              </button>
            </form>

            {/* Links */}
            <div className="mt-5 space-y-2 text-center text-sm">
              {mode === "login" && (
                <>
                  <p>
                    <button onClick={() => setMode("reset")} className="text-gray-400 hover:text-blue transition-colors">
                      Mot de passe oublié ?
                    </button>
                  </p>
                  <p className="text-gray-500">
                    Pas encore de compte ?{" "}
                    <button onClick={() => setMode("register")} className="text-blue font-semibold hover:underline">
                      S'inscrire
                    </button>
                  </p>
                </>
              )}
              {mode === "register" && (
                <p className="text-gray-500">
                  Déjà un compte ?{" "}
                  <button onClick={() => setMode("login")} className="text-blue font-semibold hover:underline">
                    Se connecter
                  </button>
                </p>
              )}
              {mode === "reset" && (
                <p>
                  <button onClick={() => setMode("login")} className="text-gray-400 hover:text-blue transition-colors">
                    ← Retour
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
