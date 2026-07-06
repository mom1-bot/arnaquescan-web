import { LogoIcon } from "../components/LogoIcon";

export function LandingFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-5 py-14">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoIcon size={32} />
              <span className="text-white font-black text-[17px] tracking-tight">ArnaqueScan</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Protégez-vous des arnaques grâce à l'IA. Analysez SMS, emails, liens et QR codes en quelques secondes.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
              <span className="text-xs font-bold text-yellow-500">🏅</span>
              <span className="text-xs text-gray-400 font-medium">Marque déposée INPI — Classes 9 & 42</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-3">Application</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <span className="flex items-center gap-2 text-gray-600 cursor-not-allowed">
                    App Store
                    <span className="text-[9px] font-black text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded uppercase tracking-wide">bientôt</span>
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-gray-600 cursor-not-allowed">
                    Google Play
                    <span className="text-[9px] font-black text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded uppercase tracking-wide">bientôt</span>
                  </span>
                </li>
                <li><a href="#fonctionnalites" onClick={(e) => { e.preventDefault(); document.getElementById("fonctionnalites")?.scrollIntoView({ behavior: "smooth" }); }} className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#tarifs" onClick={(e) => { e.preventDefault(); document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" }); }} className="text-gray-400 hover:text-white transition-colors">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-3">Légal</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://arnaquescan.vercel.app/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Politique de confidentialité
                  </a>
                </li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions légales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CGV / CGU</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-3">Compte</p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="/auth" className="text-gray-400 hover:text-white transition-colors">Se connecter</a></li>
                <li><a href="/auth?mode=register" className="text-gray-400 hover:text-white transition-colors">Créer un compte</a></li>
                <li><a href="/analyser" className="text-gray-400 hover:text-white transition-colors">Analyser en ligne</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2026 ArnaqueScan — <span className="text-gray-500">Tamih Apps (Mohamed Tamih)</span></p>
          <p>Marque déposée INPI — Classes 9 & 42</p>
        </div>
      </div>
    </footer>
  );
}
