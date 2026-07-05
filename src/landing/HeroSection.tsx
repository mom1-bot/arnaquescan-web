import { IPhoneMockup } from "./IPhoneMockup";

function HeroScreen() {
  return (
    <div style={{ padding: "8px 10px", height: "100%", overflow: "hidden" }}>
      {/* Mini app header */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M16 2L4 7V18C4 24.5 9.5 29.5 16 31C22.5 29.5 28 24.5 28 18V7L16 2Z" fill="#1A6FC4"/>
          <path d="M10.5 16.5L14 20L21.5 12.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 10, fontWeight: 800, color: "#1a1a1a" }}>ArnaqueScan</span>
      </div>

      {/* Type selector */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {["SMS", "Email", "URL"].map((t) => (
          <div key={t} style={{
            fontSize: 8, padding: "3px 8px",
            background: t === "SMS" ? "#1A6FC4" : "#fff",
            color: t === "SMS" ? "#fff" : "#aaa",
            borderRadius: 7, border: "1px solid #e8e4dc",
            fontWeight: t === "SMS" ? 700 : 500,
          }}>{t}</div>
        ))}
      </div>

      {/* Message box */}
      <div style={{
        background: "#fff", border: "1px solid #e8e4dc",
        borderRadius: 9, padding: "7px 9px", marginBottom: 7,
        fontSize: 7.5, color: "#444", lineHeight: 1.55,
      }}>
        Votre colis est bloqué. Payez 1,99€ pour débloquer :{" "}
        <span style={{ color: "#1A6FC4" }}>http://dhl-fr.delivery-now.net</span>
      </div>

      {/* Analyze button */}
      <div style={{
        background: "#1A6FC4", borderRadius: 9, padding: "7px",
        textAlign: "center", fontSize: 9, fontWeight: 800, color: "#fff", marginBottom: 9,
      }}>ANALYSER →</div>

      {/* Result card DANGER */}
      <div style={{
        background: "#D8453F18", border: "1.5px solid #D8453F", borderRadius: 11, padding: "9px 10px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 6 }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#D8453F", lineHeight: 1 }}>91</div>
            <div style={{ fontSize: 6, color: "#D8453F", opacity: 0.7 }}>/100</div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, fontWeight: 900, letterSpacing: 1, color: "#D8453F", marginBottom: 2 }}>ARNAQUE · DANGER</div>
            <div style={{ fontSize: 7.5, color: "#555", lineHeight: 1.4 }}>Faux service livraison DHL</div>
          </div>
        </div>
        <div style={{ height: 1, background: "#D8453F30", marginBottom: 6 }} />
        <div style={{ fontSize: 6.8, color: "#555", lineHeight: 1.6 }}>
          • Domaine non officiel (.net)<br />
          • Frais de déblocage frauduleux<br />
          • Urgence artificielle
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const scrollToPricing = () =>
    document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative bg-sand overflow-hidden pt-28 pb-16 lg:pb-24">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 75% 42%, rgba(26,111,196,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Text ── */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-7 shadow-sm">
              <span
                className="w-2 h-2 rounded-full bg-green shrink-0"
                style={{ boxShadow: "0 0 0 3px rgba(46,158,91,0.2)" }}
              />
              <span className="text-xs font-semibold text-gray-600">
                Disponible sur App Store · Marque déposée INPI
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-[40px] sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.08] tracking-tight mb-5 max-w-xl mx-auto lg:mx-0">
              Protégez vos proches et vos données contre{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1A6FC4 0%, #1254A0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                les arnaques
              </span>{" "}
              en un clic.
            </h1>

            {/* H2 */}
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              ArnaqueScan détecte les SMS frauduleux, les e-mails de phishing et les
              sites suspects en temps réel grâce à l'IA.
            </p>

            {/* Store badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
              {/* App Store */}
              <a
                href="https://apps.apple.com"
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-2xl font-medium transition-all justify-center"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.22)" }}
              >
                <span className="text-[22px] leading-none">📲</span>
                <div className="text-left">
                  <div className="text-[10px] text-white/60 font-normal leading-none mb-0.5">Télécharger sur</div>
                  <div className="text-sm font-bold leading-none">App Store</div>
                </div>
              </a>
              {/* Google Play (bientôt) */}
              <div
                className="flex items-center gap-3 bg-gray-100 text-gray-400 px-6 py-3.5 rounded-2xl font-medium cursor-not-allowed select-none"
                title="Disponible prochainement sur Android"
              >
                <span className="text-[22px] leading-none grayscale opacity-60">🤖</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 font-normal leading-none mb-0.5">Bientôt sur</div>
                  <div className="text-sm font-semibold leading-none">Google Play</div>
                </div>
              </div>
            </div>

            {/* "Voir les tarifs" text link */}
            <div className="flex justify-center lg:justify-start mb-5">
              <button
                onClick={scrollToPricing}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue transition-colors"
              >
                Voir les tarifs
                <span className="text-xs">↓</span>
              </button>
            </div>

            {/* Reassurance line */}
            <p className="text-xs text-gray-400 text-center lg:text-left mb-8 leading-relaxed">
              🔒 Sans engagement — Version gratuite disponible — Conforme RGPD
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm flex-wrap">
              <div className="flex -space-x-1.5">
                {[
                  { i: "M", c: "#1A6FC4" },
                  { i: "S", c: "#2E9E5B" },
                  { i: "A", c: "#D8453F" },
                  { i: "L", c: "#E88500" },
                ].map(({ i, c }) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-[2.5px] border-sand flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: c }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-gray-500">
                <strong className="text-gray-900">500+</strong> utilisateurs protégés
              </span>
              <span className="text-yellow-400 font-bold">★ 4.8 / 5</span>
            </div>
          </div>

          {/* ── iPhone mockup ── */}
          <div className="relative shrink-0 order-1 lg:order-2">
            <IPhoneMockup>
              <HeroScreen />
            </IPhoneMockup>
            {/* Floating chips */}
            <div
              className="absolute -right-4 top-24 bg-danger text-white text-[11px] font-bold px-3.5 py-2 rounded-full whitespace-nowrap"
              style={{
                transform: "rotate(-3deg)",
                boxShadow: "0 6px 20px rgba(216,69,63,0.35)",
              }}
            >
              ⚠️ Arnaque détectée !
            </div>
            <div
              className="absolute -left-8 bottom-28 bg-white text-gray-800 text-[11px] font-semibold px-3 py-2 rounded-2xl border border-gray-100 whitespace-nowrap"
              style={{
                transform: "rotate(2deg)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              }}
            >
              ✅ Analysé en 2.1s
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
