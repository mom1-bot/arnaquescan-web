import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loadUserHistory, deleteAnalysis } from "../utils/firestoreHistory";
import type { HistoryEntry } from "../types";

const NIVEAU_CONFIG = {
  DANGER:    { dot: "bg-danger",  badge: "bg-red-100 text-danger border-danger/30"     },
  ATTENTION: { dot: "bg-warning", badge: "bg-orange-100 text-warning border-warning/30" },
  SÉCURISÉ:  { dot: "bg-green",   badge: "bg-green-100 text-green border-green/30"     },
};

const TYPE_ICON: Record<string, string> = {
  sms: "📱", email: "📧", whatsapp: "💬", lien: "🔗", phone: "📞", qrcode: "▦",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function History() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadUserHistory(user.uid)
      .then(setEntries)
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id: string) => {
    await deleteAnalysis(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-sand min-h-screen py-10">
      <Helmet>
        <title>Historique des analyses — ArnaqueScan</title>
        <meta name="description" content="Consultez l'historique de vos analyses de messages suspects. Retrouvez tous vos verdicts et conseils de sécurité." />
        <link rel="canonical" href="https://arnaquescan.fr/historique" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 mb-1">Historique</h1>
            <p className="text-sm text-gray-500">{entries.length} analyse{entries.length !== 1 ? "s" : ""} sauvegardée{entries.length !== 1 ? "s" : ""}</p>
          </div>
          <Link to="/analyser" className="px-4 py-2 bg-blue text-white rounded-xl text-sm font-semibold hover:bg-blue/90 transition-colors">
            + Nouvelle analyse
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-700 font-semibold mb-1">Aucune analyse pour l'instant</p>
            <p className="text-sm text-gray-400 mb-5">Vos analyses apparaîtront ici une fois sauvegardées.</p>
            <Link to="/analyser" className="px-6 py-2.5 bg-blue text-white rounded-xl text-sm font-semibold hover:bg-blue/90 transition-colors">
              Commencer une analyse
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const cfg = NIVEAU_CONFIG[entry.niveau];
              const isOpen = expanded === entry.id;
              return (
                <div key={entry.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                  {/* Row */}
                  <button
                    className="w-full text-left px-5 py-4 flex items-center gap-3"
                    onClick={() => setExpanded(isOpen ? null : entry.id)}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                    <span className="text-base">{TYPE_ICON[entry.messageType] ?? "?"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {entry.textSnippet || (entry.hasImage ? "[Image]" : "—")}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        {entry.score}/100
                      </span>
                      <span className="text-gray-300 text-sm">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 border-t border-gray-50">
                      <div className="pt-4 space-y-3">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Verdict</p>
                          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                            {entry.verdict} — {entry.niveau}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Résumé</p>
                          <p className="text-sm text-gray-700">{entry.résumé}</p>
                        </div>
                        {entry.signaux.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Signaux</p>
                            <ul className="space-y-1">
                              {entry.signaux.map((s, i) => (
                                <li key={i} className="text-sm text-gray-600 flex gap-2 items-start">
                                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Conseil</p>
                          <p className="text-sm text-gray-700">{entry.conseil}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-xs text-danger/70 hover:text-danger transition-colors mt-1"
                        >
                          Supprimer cette entrée
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
