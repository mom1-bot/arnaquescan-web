import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword]                   = useState("");
  const [deleteError, setDeleteError]             = useState<string | null>(null);
  const [deleting, setDeleting]                   = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      setDeleteError("Veuillez entrer votre mot de passe pour confirmer.");
      return;
    }
    setDeleting(true);
    setDeleteError(null);
    try {
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      navigate("/");
    } catch {
      setDeleteError("Mot de passe incorrect ou session expirée. Reconnectez-vous et réessayez.");
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
              <p className="text-xs text-gray-400 mb-0.5">Membre depuis</p>
              <p className="text-sm font-semibold text-gray-900">{joined}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Plan</p>
              <span className="inline-block text-xs font-bold px-2.5 py-1 bg-blue/10 text-blue rounded-full">Gratuit</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Actions</h2>
          <div className="space-y-3">
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
                Cette action est <strong>irréversible</strong>. Toutes vos données seront supprimées. Entrez votre mot de passe pour confirmer.
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe actuel"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-danger/50 focus:ring-2 focus:ring-danger/10"
              />
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
                  {deleting ? "Suppression…" : "Supprimer définitivement"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
