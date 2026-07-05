import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "../components/LogoIcon";

const NAV_LINKS = [
  { label: "Fonctionnalités", id: "fonctionnalites" },
  { label: "Tarifs",          id: "tarifs"          },
  { label: "FAQ",             id: "faq"             },
];

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const goto = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/96 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <LogoIcon size={32} />
          <span className="font-black text-gray-900 text-[17px] tracking-tight">ArnaqueScan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className="text-sm font-medium text-gray-600 hover:text-blue transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            to="/auth"
            className="text-sm font-medium text-gray-600 hover:text-blue transition-colors"
          >
            Se connecter
          </Link>
          <div className="flex flex-col items-center gap-0.5">
            <a
              href="https://apps.apple.com"
              className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white pl-4 pr-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}
            >
              <span className="text-[17px] leading-none">📲</span>
              <span>App Store</span>
            </a>
            <span className="text-[9px] text-gray-400 font-medium">🤖 Android bientôt</span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
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
          <div className="mb-4">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => goto(id)}
                className="flex items-center w-full py-3.5 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="block text-center py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
            >
              Se connecter
            </Link>
            <a
              href="https://apps.apple.com"
              className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold"
            >
              📲 Télécharger sur l'App Store
            </a>
            <div className="flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-3 rounded-xl cursor-not-allowed select-none text-sm font-medium">
              🤖 Bientôt sur Google Play
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
