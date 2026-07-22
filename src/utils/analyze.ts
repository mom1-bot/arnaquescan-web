import type { AnalysisResult, MessageType } from "../types";

export class QuotaExceededError extends Error {
  used: number;
  limit: number;
  resetsAt: string | null;

  constructor(used: number, limit: number, resetsAt: string | null) {
    super("quota_exceeded");
    this.name = "QuotaExceededError";
    this.used = used;
    this.limit = limit;
    this.resetsAt = resetsAt;
  }
}

export async function runAnalysis(opts: {
  msgType: MessageType;
  text: string;
  imageBase64?: string;
  imageMime?: string;
  idToken?: string;
}): Promise<AnalysisResult> {
  const { msgType, text, imageBase64, imageMime, idToken } = opts;

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    },
    body: JSON.stringify({
      msgType,
      message: text,
      image: imageBase64 ? { base64: imageBase64, mimeType: imageMime ?? "image/jpeg" } : null,
      lang: "fr",
      isSimple: false,
    }),
  });

  if (response.status === 429) {
    throw new Error("Vous avez atteint la limite d'analyses gratuites pour le moment. Réessayez plus tard ou créez un compte.");
  }
  if (response.status === 401) {
    throw new Error("Votre session a expiré. Reconnectez-vous et réessayez.");
  }
  if (response.status === 403) {
    const body = (await response.json().catch(() => null)) as
      | { code?: string; used?: number; limit?: number; resetsAt?: string }
      | null;
    if (body?.code === "quota_exceeded") {
      throw new QuotaExceededError(body.used ?? 0, body.limit ?? 3, body.resetsAt ?? null);
    }
    throw new Error("Erreur lors de l'analyse. Réessayez.");
  }
  if (!response.ok) {
    throw new Error("Erreur lors de l'analyse. Réessayez.");
  }

  return (await response.json()) as AnalysisResult;
}
