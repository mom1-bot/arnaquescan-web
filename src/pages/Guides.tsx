import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { LandingNavbar } from "../landing/LandingNavbar";
import { LandingFooter } from "../landing/LandingFooter";

interface ChecklistItem {
  title: string;
  desc: string;
}

interface GuideCategory {
  id: string;
  icon: string;
  title: string;
  desc: string;
  items: ChecklistItem[] | null;
}

const CATEGORIES: GuideCategory[] = [
  {
    id: "livraison",
    icon: "📦",
    title: "Livraison & Colis",
    desc: "Faux SMS de transporteur, colis bloqué en douane, frais surprise à régler…",
    items: [
      {
        title: "Ne payez jamais de frais par SMS ou e-mail",
        desc: "Colissimo, Chronopost, DHL ou UPS ne demandent jamais de régler des frais de douane ou de « débloquer » un colis via un lien reçu par SMS. Un message de ce type est presque toujours frauduleux.",
      },
      {
        title: "Ne cliquez pas sur le lien reçu — retapez l'adresse vous-même",
        desc: "Ouvrez votre navigateur et tapez directement l'adresse officielle du transporteur, ou utilisez son application. Les liens raccourcis cachent souvent une fausse page conçue pour voler vos coordonnées bancaires.",
      },
      {
        title: "Vérifiez le numéro de suivi sur le site officiel",
        desc: "Comparez le numéro de colis reçu par SMS avec celui fourni par le vendeur au moment de l'achat. En cas de doute, contactez le service client du transporteur via son site officiel, jamais via le lien du message.",
      },
    ],
  },
  {
    id: "banque",
    icon: "🏦",
    title: "Banque & Sécurité",
    desc: "Faux conseiller bancaire, blocage de carte, virement instantané frauduleux…",
    items: null,
  },
  {
    id: "impots",
    icon: "📄",
    title: "Impôts & CPF",
    desc: "Faux remboursement des impôts, arnaque au compte CPF, faux message de la DGFiP…",
    items: null,
  },
  {
    id: "achats",
    icon: "🛒",
    title: "Achats en ligne",
    desc: "Faux site marchand, produit jamais livré, avis clients truqués…",
    items: null,
  },
];

export default function Guides() {
  const [openId, setOpenId] = useState<string | null>("livraison");

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div className="bg-sand min-h-screen">
      <Helmet>
        <title>Guides anti-arnaque — Livraison, Banque, Impôts, Achats | ArnaqueScan</title>
        <meta
          name="description"
          content="Checklists gratuites pour repérer les arnaques les plus courantes : faux colis, phishing bancaire, faux CPF, faux sites marchands. Protégez-vous et vos proches."
        />
        <link rel="canonical" href="https://arnaquescan.fr/guides" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <LandingNavbar />

      {/* Header */}
      <section className="pt-32 pb-14 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue rounded-full px-4 py-1.5 mb-5">
            <span className="text-lg leading-none">📚</span>
            <span className="text-xs font-bold tracking-wide">Guides anti-arnaque</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-snug mb-4">
            Apprenez à repérer les arnaques les plus courantes
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Des checklists simples et concrètes pour vous protéger, vous et vos proches, face aux arnaques
            du quotidien.
          </p>
        </div>
      </section>

      {/* Cards / accordion */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {CATEGORIES.map((cat) => {
            const isOpen = openId === cat.id;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(cat.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center text-2xl shrink-0">
                    {cat.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 text-base sm:text-lg">{cat.title}</h2>
                    <p className="text-sm text-gray-500 truncate">{cat.desc}</p>
                  </div>
                  <span
                    className={`text-gray-400 text-xl transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-5 border-t border-gray-50">
                      {cat.items ? (
                        <ul className="space-y-4">
                          {cat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-0.5 w-6 h-6 rounded-full bg-green/15 flex items-center justify-center shrink-0 text-green text-xs font-black">
                                ✓
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex items-center gap-3 bg-sand rounded-xl px-4 py-3.5">
                          <span className="text-lg">🚧</span>
                          <p className="text-sm text-gray-500">
                            Checklist en préparation — disponible prochainement.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-16 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Protégez votre téléphone en temps réel
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Ces checklists sont un bon début. Pour une protection continue, ArnaqueScan analyse vos SMS,
            e-mails, liens et QR codes suspects directement depuis votre téléphone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://apps.apple.com/app/arnaquescan/id6786055299"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-2xl font-medium hover:bg-gray-100 transition-colors"
            >
              <span className="text-[22px] leading-none">📲</span>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 font-normal leading-none mb-0.5">Télécharger sur l'</div>
                <div className="text-sm font-semibold leading-none">App Store</div>
              </div>
            </a>
            <div
              className="flex items-center gap-3 bg-gray-900 text-gray-500 px-6 py-3.5 rounded-2xl font-medium cursor-not-allowed select-none"
              title="Disponible prochainement sur Android"
            >
              <span className="text-[22px] leading-none grayscale opacity-60">🤖</span>
              <div className="text-left">
                <div className="text-[10px] text-gray-600 font-normal leading-none mb-0.5">Bientôt sur</div>
                <div className="text-sm font-semibold leading-none">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
