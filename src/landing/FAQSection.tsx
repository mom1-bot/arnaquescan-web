import { useState } from "react";
import { Helmet } from "react-helmet-async";

const FAQ = [
  {
    q: "Comment mes données sont-elles protégées ?",
    a: "Vos données sont chiffrées en transit via HTTPS/TLS et ne sont jamais stockées sur nos serveurs au-delà de la durée de l'analyse. ArnaqueScan est conforme au RGPD : aucune donnée personnelle n'est partagée avec des tiers. Chaque analyse est traitée de manière anonymisée et sécurisée.",
  },
  {
    q: "Comment l'IA détecte-t-elle les arnaques ?",
    a: "ArnaqueScan utilise Claude d'Anthropic — l'un des modèles d'IA les plus avancés au monde — pour analyser chaque message selon plus de 30 critères : structure et ton du message, urgence artificielle, fautes de grammaire typiques de la traduction automatique, URLs suspectes (typosquatting, domaines douteux, raccourcisseurs), numéros surtaxés, demandes inhabituelles d'informations personnelles ou bancaires, usurpation d'identité de marques connues, etc. L'analyse est contextuelle : l'IA comprend le sens du message, pas uniquement des mots-clés.",
  },
  {
    q: "Puis-je annuler mon abonnement facilement ?",
    a: "Oui, absolument. L'abonnement Premium est géré entièrement par l'App Store d'Apple. Vous pouvez l'annuler à tout moment depuis Réglages → [votre prénom] → Abonnements → ArnaqueScan. Aucune pénalité, aucun délai. Vous conservez l'accès Premium jusqu'à la fin de la période déjà payée.",
  },
  {
    q: "L'app fonctionne-t-elle sur Android ?",
    a: "ArnaqueScan sera bientôt disponible sur iOS et Android (iPhone et iPad, iOS 17+). Inscrivez-vous sur notre site pour être notifié dès la sortie. En attendant, vous pouvez utiliser la version web à l'adresse arnaquescan.vercel.app depuis n'importe quel navigateur.",
  },
  {
    q: "Pourquoi la marque est-elle déposée à l'INPI ?",
    a: "La marque ArnaqueScan est officiellement déposée à l'INPI (Institut National de la Propriété Industrielle) sous les classes 9 (logiciels, applications mobiles) et 42 (services informatiques, cybersécurité, SaaS). Ce dépôt protège la marque contre les imitateurs et garantit que vous utilisez l'application authentique. Dans un domaine où des faux outils anti-arnaque circulent pour piéger les utilisateurs, ce certificat officiel est un gage concret de sérieux et de légitimité.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": a,
    },
  })),
};

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-sand py-16 lg:py-24">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(FAQ_JSON_LD)}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Questions fréquentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  isOpen ? "border-blue/30 shadow-sm shadow-blue/5" : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`font-semibold text-sm leading-snug ${isOpen ? "text-blue" : "text-gray-900"}`}>
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                      isOpen
                        ? "bg-blue border-blue text-white rotate-45"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            Une autre question ?{" "}
            <a href="mailto:contact@arnaquescan.fr" className="text-blue hover:underline font-medium">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
