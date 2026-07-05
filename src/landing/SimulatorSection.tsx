import { useState } from "react";

type State = "idle" | "loading" | "result";

export function SimulatorSection() {
  const [text, setText]   = useState("");
  const [state, setState] = useState<State>("idle");

  const run = () => {
    if (!text.trim()) return;
    setState("loading");
    setTimeout(() => setState("result"), 2000);
  };

  const reset = () => { setState("idle"); setText(""); };

  return (
    <section className="bg-white border-y border-gray-100 py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Démonstration</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Testez ArnaqueScan maintenant
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Collez un vrai message suspect — SMS, e-mail ou lien douteux — et voyez l'IA à l'œuvre.
          </p>
        </div>

        {/* Interactive card */}
        <div className="bg-gray-50 rounded-3xl border border-gray-100 p-6 sm:p-8">

          {/* ── Idle ── */}
          {state === "idle" && (
            <div className="animate-fade-in">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Collez ici un message suspect..."
                rows={5}
                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-800 resize-none focus:outline-none focus:border-blue/50 focus:ring-2 focus:ring-blue/10 placeholder-gray-400 transition-all mb-4"
              />
              <button
                onClick={run}
                disabled={!text.trim()}
                className="w-full py-4 bg-blue text-white rounded-xl font-bold text-sm hover:bg-blue/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                style={text.trim() ? { boxShadow: "0 6px 20px rgba(26,111,196,0.28)" } : {}}
              >
                Analyser →
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Simulation uniquement — aucun appel API, aucune donnée envoyée
              </p>
            </div>
          )}

          {/* ── Loading ── */}
          {state === "loading" && (
            <div className="flex flex-col items-center justify-center py-14 gap-5 animate-fade-in">
              {/* Double spinner */}
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
                <div className="absolute inset-0 rounded-full border-[3px] border-blue border-t-transparent animate-spin" />
                <div
                  className="absolute inset-[5px] rounded-full border-[2px] border-blue/25 border-b-transparent animate-spin"
                  style={{ animationDirection: "reverse", animationDuration: "0.55s" }}
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 mb-1">Analyse en cours…</p>
                <p className="text-sm text-gray-400">L'IA examine votre message en détail</p>
              </div>
            </div>
          )}

          {/* ── Result (teaser) ── */}
          {state === "result" && (
            <div className="relative animate-fade-in">

              {/* Blurred fake result */}
              <div
                className="pointer-events-none select-none"
                style={{ filter: "blur(5px)", opacity: 0.6 }}
                aria-hidden="true"
              >
                <div className="bg-red-50 border-2 border-danger rounded-2xl p-5 mb-3">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="shrink-0 text-center">
                      <div className="text-5xl font-black text-danger leading-none">84</div>
                      <div className="text-[10px] text-danger/60 mt-0.5">/100</div>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-[9px] font-black tracking-widest text-danger border border-danger/30 bg-red-100 rounded-full px-3 py-1 mb-2">
                        ARNAQUE · DANGER
                      </span>
                      <p className="text-sm text-gray-700 leading-snug">
                        Tentative de phishing — usurpation d'identité
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-red-100 pt-3 space-y-1.5">
                    <p className="text-xs text-gray-600">• Urgence artificielle pour pousser à l'action immédiate</p>
                    <p className="text-xs text-gray-600">• Lien suspect vers un domaine non officiel (typosquatting)</p>
                    <p className="text-xs text-gray-600">• Demande d'informations personnelles et bancaires</p>
                  </div>
                </div>
                <div className="bg-orange-50 border border-warning/30 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-600">
                    <strong className="text-warning">Conseil :</strong>{" "}
                    Ne cliquez sur aucun lien. Supprimez ce message et signalez-le sur signalement.numerique.gouv.fr.
                  </p>
                </div>
              </div>

              {/* Lock overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl px-5 py-6 text-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(249,250,251,0.2) 0%, rgba(249,250,251,0.9) 30%, #F9FAFB 100%)",
                }}
              >
                <div className="text-4xl mb-3">⚠️</div>
                <p className="text-lg font-black text-gray-900 mb-2 leading-snug">
                  Analyse en cours…
                </p>
                <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
                  Téléchargez l'app pour voir le verdict complet et protéger vos données.
                </p>
                {/* App Store CTA */}
                <a
                  href="https://apps.apple.com"
                  className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white pl-5 pr-6 py-3.5 rounded-2xl text-sm font-bold transition-colors mb-2"
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.22)" }}
                >
                  <span className="text-xl leading-none">📲</span>
                  <div className="text-left">
                    <div className="text-[9px] text-white/60 leading-none mb-0.5">Télécharger sur</div>
                    <div className="text-sm font-bold leading-none">App Store</div>
                  </div>
                </a>
                {/* Google Play (soon) */}
                <div className="flex items-center gap-2.5 text-gray-400 text-xs font-medium mt-1">
                  <span className="grayscale opacity-60 text-sm">🤖</span>
                  Bientôt sur Google Play
                </div>
                <button
                  onClick={reset}
                  className="mt-5 text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
                >
                  Recommencer
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
