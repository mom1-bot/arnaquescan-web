import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { LogoIcon } from "./LogoIcon";

export function Navbar() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const active = (path: string) =>
    location.pathname === path
      ? "text-blue font-semibold border-b-2 border-blue pb-0.5"
      : "text-gray-600 hover:text-blue transition-colors";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <LogoIcon size={32} />
          <span className="text-gray-900 font-extrabold text-lg tracking-tight">ArnaqueScan</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm">
          <Link to="/analyser" className={active("/analyser")}>Analyser</Link>
          {user && <Link to="/historique" className={active("/historique")}>Historique</Link>}
          {user && <Link to="/abonnement" className={active("/abonnement")}>Abonnement</Link>}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <Link to="/profil" className="text-sm text-gray-600 hover:text-blue transition-colors hidden sm:block truncate max-w-[140px]">
                {user.email}
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm px-4 py-1.5 rounded-lg border border-gray-300 hover:border-danger hover:text-danger transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm text-gray-600 hover:text-blue transition-colors">Connexion</Link>
              <Link to="/auth?mode=register" className="text-sm px-4 py-1.5 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-medium">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
