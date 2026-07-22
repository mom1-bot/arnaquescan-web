import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";
import { verifyFirebaseToken } from "./_lib/firebaseAuth.js";
import { checkQuota, type QuotaResult } from "./_lib/quota.js";

// Set by Vercel when a Redis store (Upstash marketplace integration) is linked to this project.
const kv = new Redis({
  url: process.env.KV_REST_API_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? "",
});

// Keep these prompt strings in sync with ArnaqueScan/constants/translations.ts
// and ArnaqueScan/app/(tabs)/index.tsx (separate repo, no shared package).

const ANTHROPIC_MODEL = "claude-haiku-4-5";
const MAX_IMAGE_BASE64_LENGTH = 10_000_000; // ~7.3MB decoded

// Anonymous (no Firebase account) callers — e.g. the web app's free tier — are
// capped per IP via Redis (Upstash), matching the site's "3 free analyses"
// tier. Signed-in callers get the freemium funnel instead (see checkQuota in
// ./_lib/quota.ts): unlimited for a 7-day trial, then 3/month unless Premium.
const ANON_RATE_LIMIT_MAX = 3;
const ANON_RATE_LIMIT_WINDOW_SECONDS = 60 * 60 * 24;

type LangCode = "fr" | "en" | "es" | "nl" | "de";
type MsgType = "email" | "sms" | "whatsapp" | "lien" | "phone" | "qrcode";

const LANG_CODES: LangCode[] = ["fr", "en", "es", "nl", "de"];
const MSG_TYPES: MsgType[] = ["email", "sms", "whatsapp", "lien", "phone", "qrcode"];

const JSON_FORMAT = `{"score":0-100,"verdict":"ARNAQUE|SUSPECT|LÉGITIME","niveau":"DANGER|ATTENTION|SÉCURISÉ","résumé":"short phrase","signaux":["s1","s2","s3"],"conseil":"what to do","unreadable":false}`;

const REPLY_LANG: Record<LangCode, string> = {
  fr: "Réponds en français pour les champs résumé, signaux et conseil.",
  en: "Reply in English for the résumé, signaux and conseil fields.",
  es: "Responde en español para los campos résumé, signaux y conseil.",
  nl: "Antwoord in het Nederlands voor de velden résumé, signaux en conseil.",
  de: "Antworte auf Deutsch für die Felder résumé, signaux und conseil.",
};

const SIMPLE_REPLY_LANG: Record<LangCode, string> = {
  fr: "Reply in French. CRITICAL — In the 'conseil' field, use very simple everyday language for someone unfamiliar with technology. Never use 'phishing' (say 'arnaque par faux message'), 'typosquatting' (say 'faux site qui copie un vrai'), 'malware' (say 'virus informatique'), or any other technical jargon. Write 1-2 short, reassuring sentences maximum.",
  en: "Reply in English. CRITICAL — In the 'conseil' field, use very simple everyday language for someone unfamiliar with technology. Never use 'phishing' (say 'fake scam message'), 'typosquatting' (say 'fake website copying a real one'), 'malware' (say 'harmful software'), or any other technical jargon. Write 1-2 short, reassuring sentences maximum.",
  es: "Reply in Spanish. CRITICAL — In the 'conseil' field, use very simple everyday language for someone unfamiliar with technology. Never use 'phishing' (say 'mensaje engañoso para robar datos'), 'typosquatting' (say 'sitio falso que copia uno real'), 'malware' (say 'virus informático'), or any other technical jargon. Write 1-2 short, reassuring sentences maximum.",
  nl: "Reply in Dutch. CRITICAL — In the 'conseil' field, use very simple everyday language for someone unfamiliar with technology. Never use 'phishing' (say 'nep bericht om gegevens te stelen'), 'typosquatting' (say 'valse website die een echte kopieert'), 'malware' (say 'schadelijke software'), or any other technical jargon. Write 1-2 short, reassuring sentences maximum.",
  de: "Reply in German. CRITICAL — In the 'conseil' field, use very simple everyday language for someone unfamiliar with technology. Never use 'Phishing' (say 'Betrugnachricht zum Datendiebstahl'), 'Typosquatting' (say 'gefälschte Website, die eine echte kopiert'), 'Malware' (say 'schädliche Software'), or any other technical jargon. Write 1-2 short, reassuring sentences maximum.",
};

const MSG_TEXT: Record<LangCode, (type: string, msg: string) => string> = {
  fr: (type, msg) => `Analyse ce message de type ${type} : "${msg}"`,
  en: (type, msg) => `Analyze this ${type} message: "${msg}"`,
  es: (type, msg) => `Analiza este mensaje de tipo ${type}: "${msg}"`,
  nl: (type, msg) => `Analyseer dit ${type}-bericht: "${msg}"`,
  de: (type, msg) => `Analysiere diese ${type}-Nachricht: "${msg}"`,
};

const MSG_URL: Record<LangCode, (url: string) => string> = {
  fr: (url) => `Analyse cette URL suspecte et évalue sa dangerosité : "${url}"`,
  en: (url) => `Analyze this suspicious URL and assess its danger level: "${url}"`,
  es: (url) => `Analiza esta URL sospechosa y evalúa su nivel de peligro: "${url}"`,
  nl: (url) => `Analyseer deze verdachte URL en beoordeel het gevaarsniveau: "${url}"`,
  de: (url) => `Analysiere diese verdächtige URL und bewerte ihr Gefahrenpotenzial: "${url}"`,
};

const MSG_PHONE: Record<LangCode, (phone: string) => string> = {
  fr: (phone) => `Analyse ce numéro de téléphone suspect : "${phone}"`,
  en: (phone) => `Analyze this suspicious phone number: "${phone}"`,
  es: (phone) => `Analiza este número de teléfono sospechoso: "${phone}"`,
  nl: (phone) => `Analyseer dit verdachte telefoonnummer: "${phone}"`,
  de: (phone) => `Analysiere diese verdächtige Telefonnummer: "${phone}"`,
};

const MSG_IMG: Record<LangCode, (type: string) => string> = {
  fr: (type) => `Analyse cette capture d'écran de type ${type}. Examine à la fois le texte visible ET tous les éléments graphiques (logos, mise en page, interface) pour détecter une arnaque.`,
  en: (type) => `Analyze this ${type} screenshot. Examine both the visible text AND all graphical elements (logos, layout, interface design) to detect a scam.`,
  es: (type) => `Analiza esta captura de pantalla de tipo ${type}. Examina tanto el texto visible COMO todos los elementos gráficos (logotipos, diseño, interfaz) para detectar una estafa.`,
  nl: (type) => `Analyseer deze ${type}-schermafbeelding. Onderzoek zowel de zichtbare tekst ALS alle grafische elementen (logo's, lay-out, interface) om oplichting te detecteren.`,
  de: (type) => `Analysiere diesen ${type}-Screenshot. Untersuche sowohl den sichtbaren Text ALS AUCH alle grafischen Elemente (Logos, Layout, Interface) auf Betrug.`,
};

const MSG_BOTH: Record<LangCode, (type: string, msg: string) => string> = {
  fr: (type, msg) => `Analyse ce message de type ${type} : "${msg}"\n\nAnalyse aussi la capture d'écran ci-jointe en examinant le texte ET les éléments visuels (logos, interface, mise en page).`,
  en: (type, msg) => `Analyze this ${type} message: "${msg}"\n\nAlso analyze the attached screenshot, examining both the text AND visual elements (logos, layout, interface design).`,
  es: (type, msg) => `Analiza este mensaje de tipo ${type}: "${msg}"\n\nAnaliza también la captura adjunta, examinando tanto el texto como los elementos visuales (logotipos, diseño, interfaz).`,
  nl: (type, msg) => `Analyseer dit ${type}-bericht: "${msg}"\n\nAnalyseer ook de bijgevoegde schermafbeelding, inclusief tekst én visuele elementen (logo's, lay-out, interface).`,
  de: (type, msg) => `Analysiere diese ${type}-Nachricht: "${msg}"\n\nAnalysiere auch den beigefügten Screenshot, einschließlich Text und visueller Elemente (Logos, Layout, Interface).`,
};

function systemText(replyLangInstruction: string): string {
  return `You are a scam and phishing detection expert. ${replyLangInstruction} Reply ONLY in valid JSON without markdown. The "verdict" field must be one of: ARNAQUE, SUSPECT, LÉGITIME. The "niveau" field must be one of: DANGER, ATTENTION, SÉCURISÉ.
Format: ${JSON_FORMAT}`;
}

function systemUrl(replyLangInstruction: string): string {
  return `You are a cybersecurity expert specialized in URL and domain reputation analysis. ${replyLangInstruction}

Analyze the provided URL for these threat indicators:
- Typosquatting: does the domain closely mimic a known brand? (e.g. "paypa1.com", "amaz0n-secure.net", "g00gle.com", "netfl1x-account.com")
- Domain structure: excessive or misleading subdomains, suspicious TLDs (.xyz, .tk, .cc, .pw, .top, .click), hyphens used to impersonate legitimate domains, numeric characters replacing letters
- URL shorteners: presence of shortening services (bit.ly, tinyurl.com, t.co, ow.ly, rb.gy, etc.) that hide the real destination
- Suspicious path keywords: /login, /verify, /account, /secure, /update, /password, /confirm, /banking, /reward, /prize, /urgent, /claim appearing in the URL path
- Protocol: HTTP instead of HTTPS for pages handling sensitive data
- Raw IP address used instead of a domain name (e.g. http://185.23.1.4/login)
- Internationalized domain names (IDN/punycode) visually impersonating legitimate sites
- Excessively long, complex, or obfuscated URLs designed to hide the real domain
- @ symbol in the URL (redirects to what follows the @)

Reply ONLY in valid JSON without markdown. The "verdict" field must be one of: ARNAQUE, SUSPECT, LÉGITIME. The "niveau" field must be one of: DANGER, ATTENTION, SÉCURISÉ.
Format: ${JSON_FORMAT}`;
}

function systemImage(replyLangInstruction: string): string {
  return `You are a scam and phishing detection expert specialized in visual content analysis. ${replyLangInstruction} You MUST analyze BOTH the visible text AND all visual/graphical elements of the image.

STEP 1 — IDENTIFY CONTENT TYPE:
Determine what the image shows, then adapt your vocabulary in "résumé" accordingly:
- MESSAGE / SCREENSHOT (SMS, email, WhatsApp, notification, chat): use message-oriented language (e.g. "SMS frauduleux", "Phishing par email", "Fraudulent SMS detected")
- ADVERTISEMENT (display ad, banner, popup, promotional image, social media ad, flyer): use ad-oriented language (e.g. "Publicité frauduleuse", "Faux concours publicitaire", "Fraudulent advertisement detected")

STEP 2 — ANALYZE FOR FRAUD:

FOR ALL CONTENT:
- Brand logos: pixelation, wrong colors, distorted proportions, low-quality rendering, generic placeholder images substituting real logos
- Typography: mixed fonts, incorrect font weights, blurry text, grammatical errors typical of machine translation
- Color scheme: does it match the real company's official branding?
- Contact info visible: phone numbers, email addresses, URLs, sender IDs — check for spoofing
- Overall quality: legitimate content is crisp and consistent; fraud content often shows JPEG artifacts, mismatched elements, inconsistent padding

FOR MESSAGES / SCREENSHOTS:
- UI layout mimicking real bank apps, delivery services, payment platforms, or government institutions
- Inconsistent spacing, misaligned elements, non-standard button styles
- Pressure cues inside messages: countdown timers, "URGENT" banners, alarming icons
- Sender ID spoofing, abnormal short-code formatting

FOR ADVERTISEMENTS:
- Impossible promotions: "iPhone à 1€", "MacBook gratuit", "Gagnez 500€", discounts above 90% on luxury goods
- Fake prize or lottery: "Vous avez été sélectionné", "Félicitations, vous avez gagné !", "Réclamez votre cadeau"
- Fake interactive mechanics: spin wheel, scratch card, "cliquez pour révéler votre prix"
- Artificial urgency: countdown timers ("offre expire dans 00:03:27"), "Dernière chance !", "Il reste 1 exemplaire", "Offre limitée"
- Suspicious calls-to-action pressuring personal or banking data entry
- Impersonation of major brands (Amazon, Lidl, Carrefour, Apple, Samsung, Netflix, La Poste, CAF, Ameli) via stolen or low-quality logos
- Visual hallmarks of rogue ad networks: excessive drop shadows, clashing neon colors, amateurish layout, misused stock photos
- Fake survey rewards: "Répondez à 3 questions et gagnez un cadeau"
- Miracle health or financial claims: "Perdez 10 kg en 1 semaine", "Doublez votre investissement"
- "Sponsored" or "Publicité" labels used to mimic legitimate platform content while promoting scams

If the image is too blurry, dark, cropped, or low-resolution to analyze reliably, respond ONLY with: {"unreadable":true,"score":0,"verdict":"SUSPECT","niveau":"ATTENTION","résumé":"","signaux":[],"conseil":""}

Reply ONLY in valid JSON without markdown. The "verdict" field must be one of: ARNAQUE, SUSPECT, LÉGITIME. The "niveau" field must be one of: DANGER, ATTENTION, SÉCURISÉ.
Format: ${JSON_FORMAT}`;
}

function systemPhone(replyLangInstruction: string): string {
  return `You are a fraud detection expert specialized in phone number structural analysis. ${replyLangInstruction}

Analyze the provided phone number for these fraud risk indicators:

PREMIUM-RATE & SURTAXED NUMBERS (France):
- 0899, 0898, 089x: very high-cost surtaxed numbers, illegal for unsolicited calls
- 0892, 0891, 0890: surtaxed audiotel numbers
- 0900 range: premium-rate voice services frequently abused

VOIP & VIRTUAL NUMBERS (high scam usage):
- French 09x range: IP telephony numbers, easy to acquire anonymously, heavily used by fraudsters
- 070/071/076/077/078: VoIP numbers frequently spoofed to simulate local presence

INTERNATIONAL PATTERNS:
- +225 (Ivory Coast), +509 (Haiti), +237 (Cameroon), +243 (DRC): high-risk regions for advance-fee and romance scams
- +44 7xxx (UK mobile): commonly used to impersonate French institutions from abroad
- +1 (US/Canada): used in romance, investment, and tech-support scams
- +676 (Tonga), +672, +800x: "please call back" high-cost number scams
- +870, +881, +882: satellite numbers, very high cost, used in callback fraud
- Mismatch between claimed origin and number's actual country code

STRUCTURAL ANOMALIES:
- Wrong digit count for the claimed country format
- Invalid prefix for the stated numbering plan
- Caller ID spoofing indicators (local format inconsistency with international prefix)

IMPORTANT: You CANNOT verify in real-time whether this specific number is actively being used for fraud. Your analysis is purely structural and statistical. You MUST explicitly state this limitation in the "conseil" field, advising the user to cross-check on dedicated lookup sites (e.g. signalement.numerique.gouv.fr for France) before drawing conclusions.

Reply ONLY in valid JSON without markdown. The "verdict" field must be one of: ARNAQUE, SUSPECT, LÉGITIME. The "niveau" field must be one of: DANGER, ATTENTION, SÉCURISÉ.
Format: ${JSON_FORMAT}`;
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = value?.split(",")[0]?.trim();
  return first || "unknown";
}

/** Returns true if the anonymous caller is still under the rate limit. */
async function checkAnonRateLimit(ip: string): Promise<boolean> {
  const key = `ratelimit:analyze:${ip}`;
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, ANON_RATE_LIMIT_WINDOW_SECONDS);
  }
  return count <= ANON_RATE_LIMIT_MAX;
}

type RequestBody = {
  msgType?: string;
  message?: string;
  image?: { base64?: string; mimeType?: string } | null;
  lang?: string;
  isSimple?: boolean;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: true, code: "method_not_allowed" });
    return;
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  // Populated only for signed-in callers whose request was allowed, so the
  // success response can surface remaining quota without a second round trip.
  let quotaInfo: { reason: string; used: number | null; limit: number | null; trialEndsAt: string | null } | null = null;

  if (bearerToken) {
    // A token was supplied: it must be valid. We don't silently fall back to
    // anonymous on a bad token — that would mask expired-session bugs as rate limits.
    let uid: string;
    try {
      uid = await verifyFirebaseToken(bearerToken);
    } catch {
      res.status(401).json({ error: true, code: "unauthorized" });
      return;
    }

    let quota: QuotaResult;
    try {
      quota = await checkQuota(uid);
    } catch (err) {
      console.error("[analyze] quota check failed:", err);
      res.status(503).json({ error: true, code: "service_unavailable" });
      return;
    }
    if (!quota.allowed) {
      res.status(403).json({
        error: true,
        code: "quota_exceeded",
        used: quota.used,
        limit: quota.limit,
        resetsAt: quota.resetsAt,
      });
      return;
    }
    quotaInfo = {
      reason: quota.reason,
      used: quota.reason === "under_quota" ? quota.used : null,
      limit: quota.reason === "under_quota" ? quota.limit : null,
      trialEndsAt: quota.reason === "trial" ? quota.trialEndsAt : null,
    };
  } else {
    // No account: anonymous free-tier usage, capped per IP.
    let underLimit: boolean;
    try {
      underLimit = await checkAnonRateLimit(clientIp(req));
    } catch {
      res.status(503).json({ error: true, code: "service_unavailable" });
      return;
    }
    if (!underLimit) {
      res.status(429).json({ error: true, code: "rate_limited" });
      return;
    }
  }

  const body = req.body as RequestBody;
  const lang = body.lang as LangCode;
  const msgType = body.msgType as MsgType;
  const message = typeof body.message === "string" ? body.message : "";
  const image = body.image ?? null;
  const isSimple = body.isSimple === true;

  if (!LANG_CODES.includes(lang) || !MSG_TYPES.includes(msgType)) {
    res.status(400).json({ error: true, code: "bad_request" });
    return;
  }
  if (!message.trim() && !image) {
    res.status(400).json({ error: true, code: "bad_request" });
    return;
  }
  if (image && (!image.base64 || !image.mimeType)) {
    res.status(400).json({ error: true, code: "bad_request" });
    return;
  }
  if (image && image.base64!.length > MAX_IMAGE_BASE64_LENGTH) {
    res.status(400).json({ error: true, code: "image_too_large" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: true, code: "server_error" });
    return;
  }

  const replyLangInstruction = isSimple ? SIMPLE_REPLY_LANG[lang] : REPLY_LANG[lang];
  const isUrl = msgType === "lien" && !image;
  const isPhone = msgType === "phone" && !image;

  let userContent: unknown;
  let system: string;

  if (image) {
    userContent = [
      { type: "image", source: { type: "base64", media_type: image.mimeType, data: image.base64 } },
      { type: "text", text: message.trim() ? MSG_BOTH[lang](msgType, message) : MSG_IMG[lang](msgType) },
    ];
    system = systemImage(replyLangInstruction);
  } else if (isUrl) {
    userContent = MSG_URL[lang](message);
    system = systemUrl(replyLangInstruction);
  } else if (isPhone) {
    userContent = MSG_PHONE[lang](message);
    system = systemPhone(replyLangInstruction);
  } else {
    userContent = MSG_TEXT[lang](msgType, message);
    system = systemText(replyLangInstruction);
  }

  let anthropicResponse: Response;
  try {
    anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1200,
        system,
        messages: [{ role: "user", content: userContent }],
      }),
    });
  } catch (err) {
    console.error("[analyze] Anthropic fetch failed:", err);
    res.status(502).json({ error: true, code: "upstream_error" });
    return;
  }

  if (!anthropicResponse.ok) {
    const errBody = await anthropicResponse.text().catch(() => "");
    console.error(`[analyze] Anthropic returned ${anthropicResponse.status}:`, errBody);
    res.status(502).json({ error: true, code: "upstream_error" });
    return;
  }

  try {
    const data = (await anthropicResponse.json()) as { content: { text?: string }[] };
    const raw = data.content.map((c) => c.text ?? "").join("");
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    res.status(200).json({ ...parsed, _quota: quotaInfo });
  } catch (err) {
    console.error("[analyze] Failed to parse Anthropic response:", err);
    res.status(502).json({ error: true, code: "upstream_error" });
  }
}
