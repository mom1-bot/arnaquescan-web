import type { AnalysisResult, MessageType } from "../types";

const JSON_FORMAT = `{"score":0-100,"verdict":"ARNAQUE|SUSPECT|LÉGITIME","niveau":"DANGER|ATTENTION|SÉCURISÉ","résumé":"short phrase","signaux":["s1","s2","s3"],"conseil":"what to do","unreadable":false}`;

function buildSystemPrompt(msgType: MessageType, isImage: boolean): string {
  const replyLang = "Reply in French.";

  if (isImage) {
    return `You are a scam and phishing detection expert specialized in visual content analysis. ${replyLang} Analyze both the visible text AND all visual/graphical elements. Detect fake ads, fraudulent messages, phishing screenshots. If image is unreadable respond with {"unreadable":true,...}. Reply ONLY in valid JSON without markdown. Format: ${JSON_FORMAT}`;
  }
  if (msgType === "lien") {
    return `You are a cybersecurity expert specialized in URL and domain reputation analysis. ${replyLang} Analyze the URL for: typosquatting, suspicious TLDs, URL shorteners, suspicious path keywords (/login /verify /account), HTTP instead of HTTPS, raw IP addresses, IDN/punycode, excessively obfuscated URLs. Reply ONLY in valid JSON without markdown. Format: ${JSON_FORMAT}`;
  }
  if (msgType === "phone") {
    return `You are a fraud detection expert specialized in phone number structural analysis. ${replyLang} Analyze for: premium-rate numbers (0899, 0892), VoIP numbers (09x), high-risk international prefixes (+225, +509, +237). Note you cannot verify real-time fraud — advise user to cross-check on signalement.numerique.gouv.fr. Reply ONLY in valid JSON without markdown. Format: ${JSON_FORMAT}`;
  }
  return `You are a scam and phishing detection expert. ${replyLang} Analyze this ${msgType} message for fraud indicators. Reply ONLY in valid JSON without markdown. Format: ${JSON_FORMAT}`;
}

export async function runAnalysis(opts: {
  msgType: MessageType;
  text: string;
  imageBase64?: string;
  imageMime?: string;
}): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string;
  if (!apiKey) throw new Error("Clé API manquante");

  const { msgType, text, imageBase64, imageMime } = opts;
  const isImage = !!imageBase64;

  let userContent: unknown;
  if (isImage) {
    userContent = [
      { type: "image", source: { type: "base64", media_type: imageMime ?? "image/jpeg", data: imageBase64 } },
      { type: "text", text: text.trim() ? `Type: ${msgType}. Contexte: ${text}` : `Type: ${msgType}. Analyse cette image.` },
    ];
  } else if (msgType === "lien") {
    userContent = `Analyse cette URL pour détecter une arnaque : ${text}`;
  } else if (msgType === "phone") {
    userContent = `Analyse ce numéro de téléphone pour détecter une fraude : ${text}`;
  } else {
    userContent = `Type de message: ${msgType}\n\n${text}`;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1200,
      system: buildSystemPrompt(msgType, isImage),
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message ?? `Erreur API ${response.status}`);
  }

  const data = await response.json() as { content: { text?: string }[] };
  const raw = data.content.map((c) => c.text ?? "").join("");
  const parsed: AnalysisResult = JSON.parse(raw.replace(/```json|```/g, "").trim());
  return parsed;
}
