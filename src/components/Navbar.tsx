import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { LogoIcon } from "./LogoIcon";

export function Navbar() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut(auth);
    navigate("/");
  };

  const active = (path: string) =>
    location.pathname === path
      ? "text-blue font-semibold border-b-2 border-blue pb-0.5"
      : "text-gray-600 hover:text-blue transition-colors";

  const activeMobile = (path: string) =>
    location.pathname === path
      ? "text-blue font-semibold"
      : "text-gray-700";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <LogoIcon size={32} />
          <span className="text-gray-900 font-extrabold text-lg tracking-tight">ArnaqueScan</span>
        </Link>

        {/* Nav links (desktop only) */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/analyser" className={active("/analyser")}>Analyser</Link>
          {user && <Link to="/historique" className={active("/historique")}>Historique</Link>}
          {user && <Link to="/abonnement" className={active("/abonnement")}>Abonnement</Link>}
        </div>

        {/* Auth (desktop only) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] shrink-0"
          aria-label="Menu"
        >
          <span className={`block h-[2px] w-5 bg-gray-700 transition-all origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[2px] w-5 bg-gray-700 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-5 bg-gray-700 transition-all origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 pt-3 pb-5">
          <div className="flex flex-col mb-4">
            <Link
              to="/analyser"
              onClick={() => setOpen(false)}
              className={`py-3.5 text-sm font-medium border-b border-gray-50 ${activeMobile("/analyser")}`}
            >
              Analyser
            </Link>
            {user && (
              <Link
                to="/historique"
                onClick={() => setOpen(false)}
                className={`py-3.5 text-sm font-medium border-b border-gray-50 ${activeMobile("/historique")}`}
              >
                Historique
              </Link>
            )}
            {user && (
              <Link
                to="/abonnement"
                onClick={() => setOpen(false)}
                className={`py-3.5 text-sm font-medium border-b border-gray-50 ${activeMobile("/abonnement")}`}
              >
                Abonnement
              </Link>
            )}
            {user && (
              <Link
                to="/profil"
                onClick={() => setOpen(false)}
                className={`py-3.5 text-sm font-medium truncate ${activeMobile("/profil")}`}
              >
                {user.email}
              </Link>
            )}
          </div>

          <div className="space-y-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="block w-full text-center py-3 text-sm font-medium text-danger border border-gray-200 rounded-xl"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="block text-center py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
                >
                  Connexion
                </Link>
                <Link
                  to="/auth?mode=register"
                  onClick={() => setOpen(false)}
                  className="block text-center py-3 text-sm font-semibold text-white bg-blue rounded-xl"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
