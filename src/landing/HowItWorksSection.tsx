const STEPS = [
  {
    num:   "1",
    icon:  "📋",
    title: "Copiez le message suspect",
    desc:  "SMS douteux, e-mail de phishing, lien bizarre ou QR code inconnu — copiez simplement le contenu suspect.",
    color: "#1A6FC4",
  },
  {
    num:   "2",
    icon:  "📱",
    title: "Collez-le dans ArnaqueScan",
    desc:  "Ouvrez l'app, sélectionnez le type de message et collez le contenu. En un seul geste.",
    color: "#E88500",
  },
  {
    num:   "3",
    icon:  "🛡️",
    title: "Le verdict de l'IA vous protège",
    desc:  "En 2 secondes, l'IA vous donne un score de risque, les signaux d'alerte et le conseil adapté à votre situation.",
    color: "#2E9E5B",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-white border-t border-gray-100 py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">
            Simple comme bonjour
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Comment ça marche ?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              {/* Card */}
              <div className="bg-white rounded-3xl border border-gray-100 p-7 h-full shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
                {/* Big background number */}
                <div
                  className="text-8xl font-black leading-none mb-1 select-none"
                  style={{ color: step.color, opacity: 0.09 }}
                >
                  {step.num}
                </div>
                {/* Icon */}
                <div className="text-3xl -mt-2 mb-3">{step.icon}</div>
                {/* Step badge */}
                <div
                  className="inline-block text-[10px] font-black tracking-widest text-white rounded-full px-2.5 py-1 mb-3"
                  style={{ background: step.color }}
                >
                  ÉTAPE {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>

              {/* Arrow connector (desktop only) */}
              {i < 2 && (
                <div className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 items-center justify-center pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
