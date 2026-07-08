import type { AnalysisResult, MessageType } from "../types";

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
  if (!response.ok) {
    throw new Error("Erreur lors de l'analyse. Réessayez.");
  }

  return (await response.json()) as AnalysisResult;
}
