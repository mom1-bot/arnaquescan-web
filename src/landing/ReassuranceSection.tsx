const STATS = [
  {
    value: "37 millions",
    label: "de SMS frauduleux envoyés en France en 2024",
    color: "#D8453F",
  },
  {
    value: "1 Français sur 3",
    label: "ciblé par une tentative d'arnaque chaque année",
    color: "#E88500",
  },
  {
    value: "2,7 milliards €",
    label: "perdus aux arnaques en ligne par an en France",
    color: "#1A6FC4",
  },
];

const TRUST = [
  { icon: "🤖", label: "IA Anthropic (Claude)" },
  { icon: "🔒", label: "Chiffrement SSL/TLS"  },
  { icon: "✅", label: "Conforme RGPD"         },
  { icon: "🏅", label: "Marque INPI Cl. 9 & 42" },
];

export function ReassuranceSection() {
  return (
    <section className="bg-white border-y border-gray-100">
      {/* Stats */}
      <div className="max-w-6xl mx-auto px-5 py-14">
        <p className="text-center text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-10">
          Le contexte en France
        </p>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div
                className="text-3xl sm:text-4xl font-black mb-2 leading-none"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-gray-100 bg-gray-50 py-5">
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="text-lg leading-none">{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
