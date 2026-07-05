import { useState } from "react";

const FREE_FEATURES = [
  "3 analyses / mois",
  "SMS, email, URL, numéro",
  "Verdict + score de risque",
  "Conseil personnalisé",
];

const PREMIUM_FEATURES = [
  "Analyses illimitées",
  "Historique complet (12 mois)",
  "Scanner QR code intégré",
  "Analyse d'images et captures d'écran",
  "Mode senior — interface simplifiée",
  "Support prioritaire",
];

const PRO_FEATURES = [
  "Tout Premium, plus :",
  "Traitement prioritaire des analyses",
  "Export PDF des rapports d'analyse",
  "Accès API (développeurs/entreprises)",
  "Support prioritaire 24h",
];

const FAMILLE_FEATURES = [
  "Jusqu'à 5 comptes membres",
  "Tableau de bord familial centralisé",
  "Alertes partagées entre membres",
  "Mode senior activé pour tous les membres",
  "Idéal pour protéger parents et grands-parents",
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="tarifs" className="bg-white py-16 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Tarifs</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Simple et transparent
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Commencez gratuitement. Passez à l'offre qui correspond à vos besoins.
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center mt-8 rounded-2xl p-1.5"
            style={{ background: "#ECEEF2", border: "1px solid #D1D5DB" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                !annual
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                annual
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Annuel
              <span
                className="text-[10px] font-black text-white px-2 py-0.5 rounded-full"
                style={{ background: "#2E9E5B" }}
              >
                −44%
              </span>
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Le tarif annuel s'applique à l'offre Premium
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto items-stretch">

          {/* Free */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-7 flex flex-col">
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Gratuit</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-gray-900">0€</span>
                <span className="text-sm text-gray-400">/mois</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Pour découvrir ArnaqueScan</p>
            </div>

            <ul className="space-y-3 flex-1 mb-7">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-500 text-[9px] font-black">✓</span>
                  {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[9px]">✕</span>
                Pas d'historique
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[9px]">✕</span>
                Pas de scanner QR
              </li>
            </ul>

            <a
              href="https://apps.apple.com"
              className="block text-center py-3.5 text-sm font-bold text-gray-600 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              Télécharger gratuitement
            </a>
          </div>

          {/* Premium */}
          <div
            className="relative rounded-3xl p-7 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #f0f6ff 0%, #fff 60%)",
              border: "2px solid #1A6FC4",
              boxShadow: "0 20px 60px rgba(26,111,196,0.12)",
            }}
          >
            {/* Launch offer badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className="text-white text-xs font-black px-5 py-1.5 rounded-full whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #D8453F, #B53530)", boxShadow: "0 4px 12px rgba(216,69,63,0.35)" }}
              >
                🔥 Offre de lancement
              </span>
            </div>

            <div className="mb-6 pt-2">
              <p className="text-xs font-bold text-blue uppercase tracking-wider mb-1">Premium</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-gray-900">
                  {annual ? "1,66€" : "2,99€"}
                </span>
                <span className="text-sm text-gray-400">/mois</span>
              </div>
              {annual && (
                <p className="text-sm text-gray-500 mt-0.5">
                  facturé <strong className="text-gray-700">19,99€/an</strong>
                  <span className="ml-1.5 text-green text-xs font-bold">−44% vs mensuel</span>
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                🎁 <strong>7 jours d'essai gratuit</strong> — sans CB
              </p>
              <p className="text-[11px] text-warning font-semibold mt-2 flex items-center gap-1.5">
                <span>⏳</span>
                Prix de lancement — sera revu prochainement
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-7">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span
                    className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-black"
                    style={{ background: "#1A6FC4" }}
                  >✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://apps.apple.com"
              className="block text-center py-3.5 text-sm font-bold text-white rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #1A6FC4, #1254A0)",
                boxShadow: "0 6px 20px rgba(26,111,196,0.32)",
              }}
            >
              Commencer l'essai gratuit →
            </a>
            <p className="text-center text-[10px] text-gray-400 mt-2.5">
              Annulation possible à tout moment
            </p>
          </div>

          {/* Pro */}
          <div className="relative bg-gray-50 border border-gray-200 rounded-3xl p-7 flex flex-col">
            {/* Launch offer badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className="text-white text-xs font-black px-5 py-1.5 rounded-full whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #D8453F, #B53530)", boxShadow: "0 4px 12px rgba(216,69,63,0.35)" }}
              >
                🔥 Offre de lancement
              </span>
            </div>

            <div className="mb-6 pt-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pro</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-gray-900">4,99€</span>
                <span className="text-sm text-gray-400">/mois</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Pour développeurs et entreprises</p>
              <p className="text-[11px] text-warning font-semibold mt-2 flex items-center gap-1.5">
                <span>⏳</span>
                Prix de lancement — sera revu prochainement
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-7">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-500 text-[9px] font-black">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://apps.apple.com"
              className="block text-center py-3.5 text-sm font-bold text-gray-600 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              Choisir Pro
            </a>
          </div>

          {/* Famille */}
          <div className="relative bg-gray-50 border border-gray-200 rounded-3xl p-7 flex flex-col">
            {/* Launch offer badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className="text-white text-xs font-black px-5 py-1.5 rounded-full whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #D8453F, #B53530)", boxShadow: "0 4px 12px rgba(216,69,63,0.35)" }}
              >
                🔥 Offre de lancement
              </span>
            </div>

            <div className="mb-6 pt-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Famille</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-gray-900">9,99€</span>
                <span className="text-sm text-gray-400">/mois</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Protégez toute la famille</p>
              <p className="text-[11px] text-warning font-semibold mt-2 flex items-center gap-1.5">
                <span>⏳</span>
                Prix de lancement — sera revu prochainement
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-7">
              {FAMILLE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-500 text-[9px] font-black">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://apps.apple.com"
              className="block text-center py-3.5 text-sm font-bold text-gray-600 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              Choisir Famille
            </a>
          </div>
        </div>

        {/* App Store note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Abonnement géré par l'App Store · Annulation en 1 clic dans les réglages iOS
        </p>
      </div>
    </section>
  );
}
