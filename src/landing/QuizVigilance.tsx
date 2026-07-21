import { useState } from "react";

type Answer = "scam" | "legit";

interface Question {
  sender: string;
  message: string;
  isScam: boolean;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    sender: "Ameli",
    message:
      "Ameli : Vous avez droit à un remboursement de 154,90€. Cliquez ici sous 48h pour le récupérer : ameli-remboursement.fr/x8k2",
    isScam: true,
    explanation:
      "C'est une arnaque : l'Assurance Maladie ne communique jamais par SMS avec un lien de remboursement, et n'utilise que le nom de domaine officiel ameli.fr.",
  },
  {
    sender: "Chronopost",
    message:
      "Chronopost : Votre colis est bloqué en douane. Réglez 2,99€ de taxes pour le débloquer : chronopost-livraison.info/t92",
    isScam: true,
    explanation:
      "C'est une arnaque : Chronopost ne demande jamais de paiement de taxes par SMS. Le lien mène vers un faux site qui vole vos données bancaires.",
  },
  {
    sender: "38004",
    message:
      "38004 : Votre colis n°6A12 34X678 sera livré aujourd'hui entre 14h et 16h. Suivi : colissimo.fr",
    isScam: false,
    explanation:
      "Message légitime : le 38004 est le numéro court officiel de Colissimo/La Poste. Pas de lien suspect, aucune demande de paiement.",
  },
];

export function QuizVigilance() {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState<Answer | null>(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);

  const question   = QUESTIONS[current];
  const isCorrect   = selected !== null && (selected === "scam") === question.isScam;
  const isLast      = current === QUESTIONS.length - 1;

  const handleAnswer = (answer: Answer) => {
    if (selected) return;
    setSelected(answer);
    if ((answer === "scam") === question.isScam) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const scoreMessage =
    score === 3
      ? "Excellent réflexe — vous repérez les arnaques comme un pro !"
      : score >= 1
      ? "Pas mal, mais un doute persiste. Une seconde paire d'yeux ne fait pas de mal."
      : "Attention, ces arnaques sont plus trompeuses qu'il n'y paraît.";

  return (
    <section id="quiz" className="bg-sand border-t border-gray-100 py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Mini-quiz</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Sauriez-vous repérer une arnaque ?
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            3 vrais SMS, à vous de deviner : arnaque ou message légitime ?
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">

          {!finished ? (
            <div key={current} className="animate-fade-in">
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-gray-400 tracking-wide">
                  Question {current + 1} / {QUESTIONS.length}
                </span>
                <div className="flex gap-1.5">
                  {QUESTIONS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-6 h-1.5 rounded-full ${
                        i < current ? "bg-blue" : i === current ? "bg-blue/50" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* SMS bubble */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center text-sm shrink-0">
                    📱
                  </span>
                  <span className="text-sm font-bold text-gray-900">{question.sender}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{question.message}</p>
              </div>

              {/* Answer buttons */}
              {!selected && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAnswer("scam")}
                    className="py-3.5 rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-700 hover:border-danger hover:text-danger transition-colors"
                  >
                    🚩 C'est une arnaque
                  </button>
                  <button
                    onClick={() => handleAnswer("legit")}
                    className="py-3.5 rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-700 hover:border-green hover:text-green transition-colors"
                  >
                    ✅ Message légitime
                  </button>
                </div>
              )}

              {/* Feedback */}
              {selected && (
                <div className="animate-fade-in">
                  <div
                    className={`rounded-xl px-4 py-3.5 mb-5 border-2 ${
                      isCorrect
                        ? "bg-green/10 border-green"
                        : "bg-red-50 border-danger"
                    }`}
                  >
                    <p
                      className={`text-sm font-black mb-1 ${
                        isCorrect ? "text-green" : "text-danger"
                      }`}
                    >
                      {isCorrect ? "✓ Bonne réponse" : "✗ Mauvaise réponse"}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{question.explanation}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-blue text-white rounded-xl font-bold text-sm hover:bg-blue/90 transition-all"
                    style={{ boxShadow: "0 6px 20px rgba(26,111,196,0.28)" }}
                  >
                    {isLast ? "Voir mon score →" : "Question suivante →"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Final score */
            <div className="text-center animate-fade-in">
              <div className="text-5xl font-black text-blue mb-2">{score}/3</div>
              <p className="text-gray-700 font-semibold mb-1">{scoreMessage}</p>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Les arnaqueurs se perfectionnent chaque jour. ArnaqueScan analyse vos SMS, e-mails et QR
                codes suspects en quelques secondes pour vous éviter d'avoir à deviner.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
                <a
                  href="https://apps.apple.com/app/arnaquescan/id6786055299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
                >
                  <span className="text-[22px] leading-none">📲</span>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-300 font-normal leading-none mb-0.5">Télécharger sur l'</div>
                    <div className="text-sm font-semibold leading-none">App Store</div>
                  </div>
                </a>
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

              <button
                onClick={handleRestart}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
              >
                Refaire le quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
