import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€",
    period: "/mois",
    description: "Pour découvrir ArnaqueScan",
    features: [
      "3 analyses gratuites (sans compte)",
      "Analyses illimitées avec compte",
      "SMS, email, URL, numéro",
      "Historique (30 jours)",
    ],
    cta: "Plan actuel",
    current: true,
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "4,99€",
    period: "/mois",
    description: "Pour les utilisateurs réguliers",
    features: [
      "Tout le plan Gratuit",
      "Historique illimité",
      "Analyses d'images en haute qualité",
      "Export PDF des rapports",
      "Alertes email hebdomadaires",
      "Support prioritaire",
    ],
    cta: "Bientôt disponible",
    current: false,
    highlight: true,
  },
  {
    id: "family",
    name: "Famille",
    price: "9,99€",
    period: "/mois",
    description: "Protégez toute la famille",
    features: [
      "Tout le plan Pro",
      "Jusqu'à 5 comptes",
      "Tableau de bord famille",
      "Alertes pour les proches",
    ],
    cta: "Bientôt disponible",
    current: false,
    highlight: false,
  },
];

export default function Subscription() {
  const { user } = useAuth();

  return (
    <div className="bg-sand min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-3">Abonnements</h1>
          <p className="text-gray-500">Choisissez le plan qui vous convient. Annulez à tout moment.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border-2 p-6 relative flex flex-col ${
                plan.highlight ? "border-blue shadow-lg shadow-blue/10" : "border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue text-white text-xs font-bold px-4 py-1 rounded-full">Recommandé</span>
                </div>
              )}

              <div className="mb-5">
                <h2 className="text-lg font-black text-gray-900 mb-1">{plan.name}</h2>
                <p className="text-xs text-gray-400 mb-3">{plan.description}</p>
                <div className="flex items-baseline gap-0.5">
                  <span className={`text-3xl font-black ${plan.highlight ? "text-blue" : "text-gray-900"}`}>{plan.price}</span>
                  <span className="text-sm text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className={`mt-0.5 text-xs font-bold ${plan.highlight ? "text-blue" : "text-green"}`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <div className="w-full py-3 text-center text-sm font-semibold text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                  Plan actuel
                </div>
              ) : (
                <button
                  disabled
                  className={`w-full py-3 text-sm font-bold rounded-xl transition-colors cursor-not-allowed ${
                    plan.highlight
                      ? "bg-blue/20 text-blue/60"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Stripe notice */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-bold text-gray-900 mb-1">Paiement sécurisé à venir</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Les plans payants seront disponibles prochainement via Stripe. Inscrivez-vous maintenant pour être notifié en priorité.
          </p>
          {!user && (
            <Link
              to="/auth?mode=register"
              className="inline-block mt-4 px-6 py-2.5 bg-blue text-white rounded-xl text-sm font-semibold hover:bg-blue/90 transition-colors"
            >
              Créer un compte gratuit →
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
