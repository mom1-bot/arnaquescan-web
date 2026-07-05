import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { LogoIcon } from "../components/LogoIcon";

export default function Auth() {
  const { user }                = useAuth();
  const navigate                = useNavigate();
  const [params]                = useSearchParams();
  const [mode, setMode]         = useState<"login" | "register" | "reset">(
    params.get("mode") === "register" ? "register" : "login"
  );
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
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
        await createUserWithEmailAndPassword(auth, email, password);
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
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {error && (
                <div className="bg-red-50 border border-danger/30 rounded-xl px-4 py-2.5 text-sm text-danger flex gap-2">
                  <span>⚠️</span> {error}
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
