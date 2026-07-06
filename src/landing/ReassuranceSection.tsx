import { useLanguage } from "../hooks/useLanguage";

export function ReassuranceSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-y border-gray-100">
      {/* Stats */}
      <div className="max-w-6xl mx-auto px-5 py-14">
        <p className="text-center text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-10">
          {t.reassurance.contextLabel}
        </p>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {t.reassurance.stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="text-3xl sm:text-4xl font-black mb-2 leading-none"
                style={{ color: STAT_COLORS[i] }}
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
            {t.reassurance.trust.map((tr) => (
              <div key={tr.label} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="text-lg leading-none">{tr.icon}</span>
                <span>{tr.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STAT_COLORS = ["#D8453F", "#E88500", "#1A6FC4"];
