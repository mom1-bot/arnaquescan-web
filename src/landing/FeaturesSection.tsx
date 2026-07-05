import { IPhoneMockup } from "./IPhoneMockup";

/* ─── Screen 1: Analyse instantanée ──────────────────────────── */
function AnalysisScreen() {
  return (
    <div style={{ padding: "8px 10px", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M16 2L4 7V18C4 24.5 9.5 29.5 16 31C22.5 29.5 28 24.5 28 18V7L16 2Z" fill="#1A6FC4"/>
          <path d="M10.5 16.5L14 20L21.5 12.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 10, fontWeight: 800, color: "#1a1a1a" }}>Analyse</span>
      </div>
      {/* Step 1 — input */}
      <div style={{ fontSize: 7.5, fontWeight: 700, color: "#aaa", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>
        Message suspect
      </div>
      <div style={{
        background: "#fff", border: "1.5px solid #1A6FC420", borderRadius: 9,
        padding: "7px 9px", marginBottom: 7, fontSize: 7.5, color: "#444", lineHeight: 1.55,
      }}>
        "Félicitations ! Vous avez été sélectionné pour recevoir un iPhone 15 gratuit. Cliquez ici : bit.ly/xyz123"
      </div>
      {/* Analyze button */}
      <div style={{
        background: "linear-gradient(135deg, #1A6FC4, #1254A0)",
        borderRadius: 9, padding: "8px", textAlign: "center",
        fontSize: 9, fontWeight: 800, color: "#fff", marginBottom: 9,
        boxShadow: "0 4px 12px rgba(26,111,196,0.35)",
      }}>🔍 ANALYSER →</div>
      {/* Step 2 — result */}
      <div style={{
        background: "#D8453F18", border: "1.5px solid #D8453F", borderRadius: 11, padding: "9px 10px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 6 }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#D8453F", lineHeight: 1 }}>96</div>
            <div style={{ fontSize: 6, color: "#D8453F", opacity: 0.7 }}>/100</div>
          </div>
          <div>
            <div style={{ fontSize: 7, fontWeight: 900, letterSpacing: 1, color: "#D8453F", marginBottom: 2 }}>ARNAQUE · DANGER</div>
            <div style={{ fontSize: 7.5, color: "#555", lineHeight: 1.4 }}>Faux concours iPhone frauduleux</div>
          </div>
        </div>
        <div style={{ fontSize: 6.8, color: "#555", lineHeight: 1.6 }}>
          • Lien raccourci (bit.ly) masquant l'URL<br />
          • Promesse irréaliste (iPhone gratuit)<br />
          • Invitation à cliquer immédiatement
        </div>
      </div>
    </div>
  );
}

/* ─── Screen 2: Scanner QR ────────────────────────────────────── */
function QRScreen() {
  return (
    <div style={{ height: "100%", position: "relative", background: "#0c1018" }}>
      {/* Camera gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, #1a2a1f 0%, #0c1018 70%)",
      }} />
      {/* Top label */}
      <div style={{
        position: "absolute", top: 12, left: 0, right: 0,
        textAlign: "center", color: "rgba(255,255,255,0.7)",
        fontSize: 8.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
      }}>
        Scanner QR code
      </div>
      {/* Viewfinder */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -55%)",
        width: 130, height: 130,
      }}>
        {/* Corner brackets */}
        {[
          { top: 0,    left:  0,    borderTop:    "2.5px solid #2E9E5B", borderLeft:   "2.5px solid #2E9E5B" },
          { top: 0,    right: 0,    borderTop:    "2.5px solid #2E9E5B", borderRight:  "2.5px solid #2E9E5B" },
          { bottom: 0, left:  0,    borderBottom: "2.5px solid #2E9E5B", borderLeft:   "2.5px solid #2E9E5B" },
          { bottom: 0, right: 0,    borderBottom: "2.5px solid #2E9E5B", borderRight:  "2.5px solid #2E9E5B" },
        ].map((style, i) => (
          <div key={i} style={{ position: "absolute", width: 22, height: 22, ...style }} />
        ))}
        {/* Fake QR code dots */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2.5,
          width: 70,
        }}>
          {[1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,0,1,1, 0,0,0,1,0,0,0, 1,1,0,0,1,1,1, 1,0,1,0,0,0,1, 1,1,1,0,1,1,1].map((v, i) => (
            <div key={i} style={{
              width: 6, height: 6,
              background: v ? "rgba(255,255,255,0.72)" : "transparent",
              borderRadius: 1.5,
            }} />
          ))}
        </div>
        {/* Scan line */}
        <div style={{
          position: "absolute", top: "42%", left: 8, right: 8, height: 1.5,
          background: "linear-gradient(90deg, transparent, #2E9E5B, #2E9E5B, transparent)",
          opacity: 0.9,
        }} />
      </div>
      {/* Bottom label */}
      <div style={{
        position: "absolute", bottom: "18%", left: 0, right: 0,
        textAlign: "center",
        fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontWeight: 500,
      }}>
        Pointez sur un QR code suspect
      </div>
      {/* Green indicator */}
      <div style={{
        position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2E9E5B", boxShadow: "0 0 0 2px rgba(46,158,91,0.3)" }} />
        <span style={{ fontSize: 7, color: "rgba(46,158,91,0.9)", fontWeight: 600 }}>Prêt</span>
      </div>
    </div>
  );
}

/* ─── Screen 3: Mode senior ───────────────────────────────────── */
function SeniorScreen() {
  return (
    <div style={{ padding: "10px 12px", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M16 2L4 7V18C4 24.5 9.5 29.5 16 31C22.5 29.5 28 24.5 28 18V7L16 2Z" fill="#1A6FC4"/>
          <path d="M10.5 16.5L14 20L21.5 12.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#1a1a1a" }}>ArnaqueScan</span>
        <div style={{ marginLeft: "auto", background: "#1A6FC410", borderRadius: 20, padding: "2px 7px" }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: "#1A6FC4" }}>🔎 SIMPLIFIÉ</span>
        </div>
      </div>
      {/* Big type grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 9 }}>
        {[
          { icon: "📱", label: "SMS",   active: true  },
          { icon: "📧", label: "Email", active: false },
        ].map((item) => (
          <div key={item.label} style={{
            background: item.active ? "#1A6FC4" : "#fff",
            border: `1.5px solid ${item.active ? "#1A6FC4" : "#e8e4dc"}`,
            borderRadius: 12, padding: "10px 0",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{item.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 800, color: item.active ? "#fff" : "#666" }}>{item.label}</div>
          </div>
        ))}
      </div>
      {/* Big text area */}
      <div style={{
        background: "#fff", border: "2px solid #e8e4dc",
        borderRadius: 12, padding: "10px", marginBottom: 9,
        fontSize: 9, color: "#bbb", minHeight: 56, lineHeight: 1.5,
      }}>
        Collez votre message ici…
      </div>
      {/* Big analyze button */}
      <div style={{
        background: "linear-gradient(135deg, #1A6FC4, #1254A0)",
        borderRadius: 12, padding: "11px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(26,111,196,0.35)",
      }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: "#fff", letterSpacing: 0.5 }}>
          ANALYSER
        </div>
      </div>
    </div>
  );
}

/* ─── Feature rows data ───────────────────────────────────────── */
const FEATURES = [
  {
    icon: "🔍",
    tag:  "Analyse instantanée",
    h2:   "Collez le message suspect, l'IA analyse en quelques secondes",
    desc: "ArnaqueScan utilise Claude (Anthropic) pour détecter les tentatives de phishing, les faux concours, les usurpations d'identité et les arnaques aux virements.",
    bullets: [
      "SMS, e-mails, messages WhatsApp",
      "Score de risque de 0 à 100",
      "Signaux détaillés et conseil personnalisé",
    ],
    screen:  <AnalysisScreen />,
    reverse: false,
    bg:      "bg-sand",
  },
  {
    icon: "▦",
    tag:  "Scanner QR code",
    h2:   "Scannez les QR codes suspects — fausses amendes, faux paiements",
    desc: "Les arnaqueurs utilisent de plus en plus les QR codes pour piéger leurs victimes. Scannez avant de scanner : vérifiez l'URL cachée derrière chaque QR code.",
    bullets: [
      "Détection des QR codes de phishing",
      "Analyse de l'URL cachée derrière le code",
      "Alertes : fausses amendes, faux parking, phishing bancaire",
    ],
    screen:  <QRScreen />,
    reverse: true,
    bg:      "bg-white",
  },
  {
    icon: "👴",
    tag:  "Mode senior",
    h2:   "Interface simplifiée pour tous, même les moins technophiles",
    desc: "Les seniors sont les premières cibles des arnaqueurs. Le mode senior d'ArnaqueScan simplifie l'interface : grands boutons, texte agrandi, résultats en langage clair.",
    bullets: [
      "Police agrandie et boutons XXL",
      "Résultats en langage simple (pas de jargon)",
      "Idéal pour les personnes âgées et les aidants",
      "Partage familial — protégez aussi vos proches à distance",
    ],
    screen:  <SeniorScreen />,
    reverse: false,
    bg:      "bg-sand",
  },
];

export function FeaturesSection() {
  return (
    <section id="fonctionnalites">
      {FEATURES.map((f, idx) => (
        <div key={idx} className={`${f.bg} py-16 lg:py-20`}>
          <div className="max-w-6xl mx-auto px-5">
            <div
              className={`flex flex-col items-center gap-12 lg:gap-16 ${
                f.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* iPhone */}
              <div className="shrink-0">
                <IPhoneMockup>
                  {f.screen}
                </IPhoneMockup>
              </div>

              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue/10 text-blue rounded-full px-4 py-1.5 mb-5">
                  <span className="text-lg leading-none">{f.icon}</span>
                  <span className="text-xs font-bold tracking-wide">{f.tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug mb-4">
                  {f.h2}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                  {f.desc}
                </p>
                <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                        <span className="text-green text-[10px] font-black">✓</span>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
