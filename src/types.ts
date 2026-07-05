export type MessageType = "sms" | "email" | "whatsapp" | "lien" | "phone";

export type Niveau = "DANGER" | "ATTENTION" | "SÉCURISÉ";
export type Verdict = "ARNAQUE" | "SUSPECT" | "LÉGITIME";

export type AnalysisResult = {
  score: number;
  verdict: Verdict;
  niveau: Niveau;
  résumé: string;
  signaux: string[];
  conseil: string;
  unreadable?: boolean;
};

export type HistoryEntry = {
  id: string;
  date: string;
  messageType: MessageType;
  textSnippet: string;
  hasImage: boolean;
  score: number;
  verdict: Verdict;
  niveau: Niveau;
  résumé: string;
  signaux: string[];
  conseil: string;
  userId: string;
};
