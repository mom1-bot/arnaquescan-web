import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { runAnalysis } from "../utils/analyze";
import { saveAnalysis } from "../utils/firestoreHistory";
import { AnalysisResultCard } from "../components/AnalysisResult";
import type { AnalysisResult, MessageType } from "../types";

const MSG_TYPES: { id: MessageType; label: string; icon: string }[] = [
  { id: "sms",      label: "SMS",      icon: "📱" },
  { id: "email",    label: "Email",    icon: "📧" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "lien",     label: "Lien/URL", icon: "🔗" },
  { id: "phone",    label: "Numéro",   icon: "📞" },
];

const FREE_LIMIT = 3;
const FREE_KEY   = "arnaquescan_free_count";

function getFreeCount(): number {
  return parseInt(localStorage.getItem(FREE_KEY) ?? "0", 10);
}
function incrementFreeCount(): number {
  const n = getFreeCount() + 1;
  localStorage.setItem(FREE_KEY, String(n));
  return n;
}

export default function Analyze() {
  const { user } = useAuth();
  const [msgType, setMsgType]     = useState<MessageType>("sms");
  const [text, setText]           = useState("");
  const [image, setImage]         = useState<{ base64: string; mime: string; preview: string } | null>(null);
  const [result, setResult]       = useState<AnalysisResult | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [showLimit, setShowLimit] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const freeCount = getFreeCount();
  const canAnalyze = user || freeCount < FREE_LIMIT;

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const [header, base64] = dataUrl.split(",");
      const mime = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
      setImage({ base64, mime, preview: dataUrl });
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }, []);

  const analyze = async () => {
    if (!text.trim() && !image) return;
    if (!canAnalyze) { setShowLimit(true); return; }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const idToken = user ? await user.getIdToken() : undefined;
      const analysis = await runAnalysis({
        msgType,
        text,
        imageBase64: image?.base64,
        imageMime:   image?.mime,
        idToken,
      });

      if (analysis.unreadable) {
        setError("L'image est illisible ou trop floue pour être analysée.");
        return;
      }

      setResult(analysis);

      if (!user) incrementFreeCount();

      if (user) {
        // Best-effort: a history-save failure shouldn't surface as an error
        // over an analysis that already succeeded and is showing on screen.
        try {
          await saveAnalysis({
            userId:      user.uid,
            messageType: msgType,
            textSnippet: text.slice(0, 120),
            hasImage:    !!image,
            score:       analysis.score,
            verdict:     analysis.verdict,
            niveau:      analysis.niveau,
            résumé:      analysis.résumé,
            signaux:     analysis.signaux,
            conseil:     analysis.conseil,
          });
        } catch (saveErr) {
          console.error("saveAnalysis failed:", saveErr);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setText("");
    setImage(null);
  };

  const remainingFree = Math.max(0, FREE_LIMIT - getFreeCount());

  return (
    <div className="bg-sand min-h-screen py-10">
      <Helmet>
        <title>Analyser un message — ArnaqueScan</title>
        <meta name="description" content="Analysez gratuitement vos SMS, emails, liens et QR codes suspects grâce à l'IA Anthropic. Détection instantanée des arnaques et phishing." />
        <link rel="canonical" href="https://arnaquescan.fr/analyser" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Analyser un contenu</h1>
          <p className="text-sm text-gray-500">
            {user
              ? "Analyses illimitées avec votre compte."
              : `${remainingFree} analyse${remainingFree !== 1 ? "s" : ""} gratuite${remainingFree !== 1 ? "s" : ""} restante${remainingFree !== 1 ? "s" : ""} — `
            }
            {!user && <Link to="/auth?mode=register" className="text-blue hover:underline font-medium">Créer un compte pour plus</Link>}
          </p>
        </div>

        {!result ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            {/* Type selector */}
            <div className="mb-5">
              <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-2">Type de contenu</label>
              <div className="flex flex-wrap gap-2">
                {MSG_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setMsgType(t.id); setResult(null); }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                      msgType === t.id
                        ? "bg-blue/10 border-blue text-blue font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-blue/30 hover:text-blue"
                    }`}
                  >
                    <span>{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text input */}
            <div className="mb-4">
              <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-2">Contenu à analyser</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  image ? "Contexte optionnel (ex: reçu par email)" :
                  msgType === "lien"  ? "https://exemple.com/lien-suspect" :
                  msgType === "phone" ? "+33 6 12 34 56 78" :
                  `Collez votre ${msgType} ici...`
                }
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:border-blue/50 focus:ring-2 focus:ring-blue/10 placeholder-gray-400 transition-all"
              />
            </div>

            {/* Image drop zone */}
            {msgType !== "lien" && msgType !== "phone" && (
              <div
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`border-2 border-dashed rounded-xl p-4 text-center mb-5 transition-all cursor-pointer ${
                  image ? "border-blue/40 bg-blue/5" : "border-gray-200 hover:border-blue/30"
                }`}
                onClick={() => !image && fileRef.current?.click()}
              >
                {image ? (
                  <div className="relative">
                    <img src={image.preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setImage(null); setResult(null); }}
                      className="absolute top-1 right-1 w-7 h-7 bg-danger text-white rounded-full text-xs font-bold hover:bg-danger/90"
                    >✕</button>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl mb-1">📷</div>
                    <p className="text-sm text-gray-500">Glissez une image ou <span className="text-blue font-medium">cliquez pour choisir</span></p>
                    <p className="text-xs text-gray-400 mt-0.5">Capture d'écran, pub suspecte, QR code…</p>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-danger/30 rounded-xl px-4 py-3 mb-4 text-sm text-danger flex gap-2 items-start">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Free limit warning */}
            {showLimit && (
              <div className="bg-orange-50 border border-warning/40 rounded-xl px-4 py-3 mb-4 text-sm text-gray-700">
                Vous avez utilisé vos 3 analyses gratuites.{" "}
                <Link to="/auth?mode=register" className="text-blue font-semibold hover:underline">Créez un compte gratuit</Link> pour continuer.
              </div>
            )}

            {/* Analyze button */}
            <button
              onClick={analyze}
              disabled={loading || (!text.trim() && !image) || showLimit}
              className="w-full py-3.5 bg-blue text-white rounded-xl font-bold text-base hover:bg-blue/90 transition-colors shadow-lg shadow-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyse en cours…
                </span>
              ) : "Analyser →"}
            </button>

          </div>
        ) : (
          <AnalysisResultCard result={result} onReset={reset} />
        )}

        {/* Upsell nudge */}
        {!user && !result && (
          <div className="mt-5 text-center">
            <p className="text-xs text-gray-400">
              Sauvegardez votre historique avec un compte gratuit.{" "}
              <Link to="/auth?mode=register" className="text-blue font-medium hover:underline">S'inscrire →</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
