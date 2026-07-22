import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
  signOut,
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { computeTrialStatus, type TrialStatus } from "../utils/trialStatus";

const APP_STORE_SUBSCRIPTIONS_URL = "https://apps.apple.com/account/subscriptions";

export default function Profile() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword]                   = useState("");
  const [deleteError, setDeleteError]             = useState<string | null>(null);
  const [deleting, setDeleting]                   = useState(false);
  const [trialStatus, setTrialStatus]             = useState<TrialStatus | null>(null);
  const [premiumExpiresAt, setPremiumExpiresAt]   = useState<Date | null>(null);
  const [subLoading, setSubLoading]               = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.data();
        if (!cancelled) {
          setTrialStatus(computeTrialStatus(data, snap.exists()));
          const premiumExpiresAtTs = data?.premiumExpiresAt as Timestamp | undefined;
          setPremiumExpiresAt(premiumExpiresAtTs?.toDate() ?? null);
        }
      } catch {
        if (!cancelled) setTrialStatus({ kind: "free" });
      } finally {
        if (!cancelled) setSubLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [user]);

  if (!user) return null;

  const isGoogleUser = user.providerData.some((p) => p.providerId === "google.com");

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!isGoogleUser && !password.trim()) {
      setDeleteError("Veuillez entrer votre mot de passe pour confirmer.");
      return;
    }
    setDeleting(true);
    setDeleteError(null);
    try {
      if (isGoogleUser) {
        await reauthenticateWithPopup(user, new GoogleAuthProvider());
      } else {
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);
      }
      await deleteUser(user);
      navigate("/");
    } catch {
      setDeleteError(
        isGoogleUser
          ? "La reconnexion Google a échoué. Réessayez."
          : "Mot de passe incorrect ou session expirée. Reconnectez-vous et réessayez."
      );
    } finally {
      setDeleting(false);
    }
  };

  const joined = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="bg-sand min-h-screen py-10">
      <Helmet>
        <title>Mon profil — ArnaqueScan</title>
        <meta name="description" content="Gérez votre compte ArnaqueScan, vos préférences et votre abonnement Premium." />
        <link rel="canonical" href="https://arnaquescan.fr/profil" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Mon profil</h1>
        <p className="text-sm text-gray-500 mb-8">
          Bonjour{user.displayName ? ` ${user.displayName}` : ""} !
        </p>

        {/* Account info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Informations du compte</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Adresse email</p>
              <p className="text-sm font-semibold text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Prénom</p>
              <p className="text-sm font-semibold text-gray-900">{user.displayName || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Membre depuis</p>
              <p className="text-sm font-semibold text-gray-900">{joined}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Abonnement</p>
              {subLoading ? (
                <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
              ) : trialStatus?.kind === "premium" ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-xs font-bold px-2.5 py-1 bg-blue text-white rounded-full">Premium</span>
                  {premiumExpiresAt && (
                    <span className="text-xs text-gray-400">
                      jusqu'au{" "}
                      {premiumExpiresAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                  )}
                </div>
              ) : trialStatus?.kind === "trial" ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-xs font-bold px-2.5 py-1 bg-blue/10 text-blue rounded-full">🎁 Essai gratuit</span>
                  <span className="text-xs text-gray-400">
                    encore {trialStatus.daysLeft} jour{trialStatus.daysLeft !== 1 ? "s" : ""}
                  </span>
                </div>
              ) : (
                <span className="inline-block text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">Gratuit</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Actions</h2>
          <div className="space-y-3">
            <a
              href={APP_STORE_SUBSCRIPTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 text-sm font-bold text-white bg-blue rounded-xl hover:bg-blue/90 transition-colors"
            >
              Gérer mon abonnement
            </a>
            <button
              onClick={handleSignOut}
              className="w-full py-3 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-900 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-danger/20 p-6">
          <h2 className="text-sm font-bold text-danger uppercase tracking-wider mb-4">Zone dangereuse</h2>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 text-sm font-semibold text-danger border border-danger/30 rounded-xl hover:bg-red-50 transition-colors"
            >
              Supprimer mon compte
            </button>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Cette action est <strong>irréversible</strong>. Toutes vos données seront supprimées.{" "}
                {isGoogleUser
                  ? "Confirmez via votre compte Google pour continuer."
                  : "Entrez votre mot de passe pour confirmer."}
              </p>
              {!isGoogleUser && (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe actuel"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-danger/50 focus:ring-2 focus:ring-danger/10"
                />
              )}
              {deleteError && (
                <p className="text-xs text-danger mb-3">⚠️ {deleteError}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowDeleteConfirm(false); setPassword(""); setDeleteError(null); }}
                  className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-danger rounded-xl hover:bg-danger/90 transition-colors disabled:opacity-60"
                >
                  {deleting ? "Suppression…" : isGoogleUser ? "Confirmer avec Google" : "Supprimer définitivement"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
