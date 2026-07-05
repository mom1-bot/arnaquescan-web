import type { AnalysisResult } from "../types";

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

export function AnalysisResultCard({ result, onReset }: Props) {
  const colors = {
    DANGER:    { bg: "bg-red-50",    border: "border-danger",  text: "text-danger",  badge: "bg-red-100"    },
    ATTENTION: { bg: "bg-orange-50", border: "border-warning", text: "text-warning", badge: "bg-orange-100" },
    SÉCURISÉ:  { bg: "bg-green-50",  border: "border-green",   text: "text-green",   badge: "bg-green-100"  },
  }[result.niveau];

  const scoreColor =
    result.score >= 70 ? "text-danger" :
    result.score >= 40 ? "text-warning" :
    "text-green";

  return (
    <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 mt-6 animate-fade-in`}>
      {/* Top row */}
      <div className="flex items-start gap-5 mb-5">
        {/* Score */}
        <div className="text-center min-w-[72px]">
          <div className={`text-5xl font-black leading-none ${scoreColor}`}>{result.score}</div>
          <div className={`text-xs font-semibold opacity-60 mt-0.5 ${colors.text}`}>/ 100</div>
        </div>
        {/* Verdict + résumé */}
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border ${colors.border} ${colors.badge} ${colors.text} mb-2`}>
            {result.verdict}
          </span>
          <p className="text-gray-800 text-sm leading-relaxed">{result.résumé}</p>
        </div>
      </div>

      <hr className={`border-0 h-px ${colors.bg} opacity-60 mb-4`} style={{ background: "currentColor" }} />

      {/* Signaux */}
      <div className="mb-4">
        <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${colors.text}`}>Signaux détectés</p>
        <ul className="space-y-2">
          {result.signaux.map((sig, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                result.niveau === "DANGER" ? "bg-danger" :
                result.niveau === "ATTENTION" ? "bg-warning" : "bg-green"
              }`} />
              <span className="text-gray-700 text-sm leading-relaxed">{sig}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conseil */}
      <div className={`rounded-xl p-4 ${colors.badge} border ${colors.border} mb-5`}>
        <p className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${colors.text}`}>Conseil</p>
        <p className="text-gray-800 text-sm leading-relaxed">{result.conseil}</p>
      </div>

      <button
        onClick={onReset}
        className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors border border-gray-200 rounded-xl hover:border-gray-300"
      >
        Nouvelle analyse
      </button>
    </div>
  );
}
