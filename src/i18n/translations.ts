export type Language =
  | "fr" | "en" | "es" | "nl" | "de"
  | "ar" | "it" | "ja" | "ko" | "pl"
  | "pt" | "ro" | "ru" | "th" | "tr"
  | "vi" | "id" | "zh-CN" | "zh-TW";

export interface LanguageOption {
  code: Language;
  flag: string;
  label: string;
}

export const RTL_LANGUAGES: Language[] = ["ar"];

export const LANGUAGES: LanguageOption[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "nl", flag: "🇳🇱", label: "NL" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "pt", flag: "🇵🇹", label: "Português" },
  { code: "ro", flag: "🇷🇴", label: "Română" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "th", flag: "🇹🇭", label: "ไทย" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt" },
  { code: "id", flag: "🇮🇩", label: "Bahasa Indonesia" },
  { code: "zh-CN", flag: "🇨🇳", label: "简体中文" },
  { code: "zh-TW", flag: "🇹🇼", label: "繁體中文" },
];

export const DEFAULT_LANGUAGE: Language = "fr";

export interface Translations {
  nav: {
    features: string;
    pricing: string;
    faq: string;
    login: string;
    appStoreSoon: string;
    androidSoon: string;
    googlePlaySoon: string;
  };
  hero: {
    badge: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    subtitle: string;
    soonOn: string;
    appStore: string;
    googlePlay: string;
    pricingLink: string;
    reassurance: string;
    socialProofUsers: string;
  };
  reassurance: {
    contextLabel: string;
    stats: { value: string; label: string }[];
    trust: { icon: string; label: string }[];
  };
  faq: {
    label: string;
    title: string;
    items: { q: string; a: string }[];
    otherQuestion: string;
    contactUs: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    nav: {
      features: "Fonctionnalités",
      pricing: "Tarifs",
      faq: "FAQ",
      login: "Se connecter",
      appStoreSoon: "Bientôt sur l'App Store",
      androidSoon: "Android bientôt",
      googlePlaySoon: "Bientôt sur Google Play",
    },
    hero: {
      badge: "Bientôt disponible sur App Store · Marque déposée INPI",
      titlePre: "Protégez vos proches et vos données contre",
      titleHighlight: "les arnaques",
      titlePost: "en un clic.",
      subtitle:
        "ArnaqueScan détecte les SMS frauduleux, les e-mails de phishing et les sites suspects en temps réel grâce à l'IA.",
      soonOn: "Bientôt sur",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Voir les tarifs",
      reassurance: "Sans engagement — Version gratuite disponible — Conforme RGPD",
      socialProofUsers: "utilisateurs protégés",
    },
    reassurance: {
      contextLabel: "Le contexte en France",
      stats: [
        { value: "37 millions", label: "de SMS frauduleux envoyés en France en 2024" },
        { value: "1 personne sur 3", label: "ciblé par une tentative d'arnaque chaque année" },
        { value: "2,7 milliards €", label: "perdus aux arnaques en ligne par an en France" },
      ],
      trust: [
        { icon: "🤖", label: "IA Anthropic (Claude)" },
        { icon: "🔒", label: "Chiffrement SSL/TLS" },
        { icon: "✅", label: "Conforme RGPD" },
        { icon: "🏅", label: "Marque INPI Cl. 9 & 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Questions fréquentes",
      otherQuestion: "Une autre question ?",
      contactUs: "Contactez-nous",
      items: [
        {
          q: "Comment mes données sont-elles protégées ?",
          a: "Vos données sont chiffrées en transit via HTTPS/TLS et ne sont jamais stockées sur nos serveurs au-delà de la durée de l'analyse. ArnaqueScan est conforme au RGPD : aucune donnée personnelle n'est partagée avec des tiers. Chaque analyse est traitée de manière anonymisée et sécurisée.",
        },
        {
          q: "Comment l'IA détecte-t-elle les arnaques ?",
          a: "ArnaqueScan utilise Claude d'Anthropic — l'un des modèles d'IA les plus avancés au monde — pour analyser chaque message selon plus de 30 critères : structure et ton du message, urgence artificielle, fautes de grammaire typiques de la traduction automatique, URLs suspectes (typosquatting, domaines douteux, raccourcisseurs), numéros surtaxés, demandes inhabituelles d'informations personnelles ou bancaires, usurpation d'identité de marques connues, etc. L'analyse est contextuelle : l'IA comprend le sens du message, pas uniquement des mots-clés.",
        },
        {
          q: "Puis-je annuler mon abonnement facilement ?",
          a: "Oui, absolument. L'abonnement Premium est géré entièrement par l'App Store d'Apple. Vous pouvez l'annuler à tout moment depuis Réglages → [votre prénom] → Abonnements → ArnaqueScan. Aucune pénalité, aucun délai. Vous conservez l'accès Premium jusqu'à la fin de la période déjà payée.",
        },
        {
          q: "L'app fonctionne-t-elle sur Android ?",
          a: "ArnaqueScan sera bientôt disponible sur iOS et Android (iPhone et iPad, iOS 17+). Inscrivez-vous sur notre site pour être notifié dès la sortie. En attendant, vous pouvez utiliser la version web à l'adresse arnaquescan.vercel.app depuis n'importe quel navigateur.",
        },
        {
          q: "Pourquoi la marque est-elle déposée à l'INPI ?",
          a: "La marque ArnaqueScan est officiellement déposée à l'INPI (Institut National de la Propriété Industrielle) sous les classes 9 (logiciels, applications mobiles) et 42 (services informatiques, cybersécurité, SaaS). Ce dépôt protège la marque contre les imitateurs et garantit que vous utilisez l'application authentique. Dans un domaine où des faux outils anti-arnaque circulent pour piéger les utilisateurs, ce certificat officiel est un gage concret de sérieux et de légitimité.",
        },
      ],
    },
  },
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      login: "Log in",
      appStoreSoon: "Coming soon to the App Store",
      androidSoon: "Android coming soon",
      googlePlaySoon: "Coming soon on Google Play",
    },
    hero: {
      badge: "Coming soon to the App Store · Trademark registered with INPI",
      titlePre: "Protect your loved ones and your data from",
      titleHighlight: "scams",
      titlePost: "in one click.",
      subtitle:
        "ArnaqueScan detects fraudulent SMS, phishing emails and suspicious websites in real time using AI.",
      soonOn: "Coming soon on",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "See pricing",
      reassurance: "No commitment — Free version available — GDPR compliant",
      socialProofUsers: "protected users",
    },
    reassurance: {
      contextLabel: "The situation in France",
      stats: [
        { value: "37 million", label: "fraudulent SMS sent in France in 2024" },
        { value: "1 in 3 people", label: "targeted by a scam attempt every year" },
        { value: "€2.7 billion", label: "lost to online scams every year in France" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic AI (Claude)" },
        { icon: "🔒", label: "SSL/TLS encryption" },
        { icon: "✅", label: "GDPR compliant" },
        { icon: "🏅", label: "INPI trademark Cl. 9 & 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked questions",
      otherQuestion: "Have another question?",
      contactUs: "Contact us",
      items: [
        {
          q: "How is my data protected?",
          a: "Your data is encrypted in transit via HTTPS/TLS and is never stored on our servers beyond the duration of the analysis. ArnaqueScan is GDPR compliant: no personal data is shared with third parties. Every analysis is processed anonymously and securely.",
        },
        {
          q: "How does the AI detect scams?",
          a: "ArnaqueScan uses Anthropic's Claude — one of the most advanced AI models in the world — to analyze each message against more than 30 criteria: message structure and tone, artificial urgency, grammar mistakes typical of machine translation, suspicious URLs (typosquatting, dubious domains, shorteners), premium-rate numbers, unusual requests for personal or banking information, impersonation of well-known brands, and more. The analysis is contextual: the AI understands the meaning of the message, not just keywords.",
        },
        {
          q: "Can I cancel my subscription easily?",
          a: "Yes, absolutely. The Premium subscription is managed entirely through Apple's App Store. You can cancel it at any time from Settings → [your name] → Subscriptions → ArnaqueScan. No penalty, no waiting period. You keep Premium access until the end of the period you've already paid for.",
        },
        {
          q: "Does the app work on Android?",
          a: "ArnaqueScan will soon be available on iOS and Android (iPhone and iPad, iOS 17+). Sign up on our website to be notified at launch. In the meantime, you can use the web version at arnaquescan.vercel.app from any browser.",
        },
        {
          q: "Why is the trademark registered with the INPI?",
          a: "The ArnaqueScan trademark is officially registered with the INPI (French National Institute of Industrial Property) under classes 9 (software, mobile apps) and 42 (IT services, cybersecurity, SaaS). This registration protects the brand against imitators and guarantees you're using the authentic application. In a field where fake anti-scam tools circulate to trap users, this official certificate is a concrete guarantee of seriousness and legitimacy.",
        },
      ],
    },
  },
  es: {
    nav: {
      features: "Funciones",
      pricing: "Precios",
      faq: "FAQ",
      login: "Iniciar sesión",
      appStoreSoon: "Próximamente en App Store",
      androidSoon: "Android próximamente",
      googlePlaySoon: "Próximamente en Google Play",
    },
    hero: {
      badge: "Próximamente en App Store · Marca registrada en el INPI",
      titlePre: "Protege a tus seres queridos y tus datos frente a",
      titleHighlight: "las estafas",
      titlePost: "en un clic.",
      subtitle:
        "ArnaqueScan detecta SMS fraudulentos, correos de phishing y sitios web sospechosos en tiempo real gracias a la IA.",
      soonOn: "Próximamente en",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Ver precios",
      reassurance: "Sin permanencia — Versión gratuita disponible — Conforme al RGPD",
      socialProofUsers: "usuarios protegidos",
    },
    reassurance: {
      contextLabel: "El contexto en Francia",
      stats: [
        { value: "37 millones", label: "de SMS fraudulentos enviados en Francia en 2024" },
        { value: "1 de cada 3 personas", label: "víctima de un intento de estafa cada año" },
        { value: "2700 millones €", label: "perdidos en estafas online al año en Francia" },
      ],
      trust: [
        { icon: "🤖", label: "IA Anthropic (Claude)" },
        { icon: "🔒", label: "Cifrado SSL/TLS" },
        { icon: "✅", label: "Conforme al RGPD" },
        { icon: "🏅", label: "Marca INPI Cl. 9 y 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Preguntas frecuentes",
      otherQuestion: "¿Tienes otra pregunta?",
      contactUs: "Contáctanos",
      items: [
        {
          q: "¿Cómo se protegen mis datos?",
          a: "Tus datos se cifran en tránsito mediante HTTPS/TLS y nunca se almacenan en nuestros servidores más allá de la duración del análisis. ArnaqueScan cumple con el RGPD: ningún dato personal se comparte con terceros. Cada análisis se procesa de forma anónima y segura.",
        },
        {
          q: "¿Cómo detecta la IA las estafas?",
          a: "ArnaqueScan utiliza Claude de Anthropic —uno de los modelos de IA más avanzados del mundo— para analizar cada mensaje según más de 30 criterios: estructura y tono del mensaje, urgencia artificial, errores gramaticales típicos de la traducción automática, URLs sospechosas (typosquatting, dominios dudosos, acortadores), números de tarificación especial, solicitudes inusuales de datos personales o bancarios, suplantación de marcas conocidas, etc. El análisis es contextual: la IA comprende el significado del mensaje, no solo palabras clave.",
        },
        {
          q: "¿Puedo cancelar mi suscripción fácilmente?",
          a: "Sí, por supuesto. La suscripción Premium se gestiona íntegramente desde la App Store de Apple. Puedes cancelarla en cualquier momento desde Ajustes → [tu nombre] → Suscripciones → ArnaqueScan. Sin penalización, sin plazos. Conservas el acceso Premium hasta el final del período ya pagado.",
        },
        {
          q: "¿Funciona la app en Android?",
          a: "ArnaqueScan estará disponible próximamente en iOS y Android (iPhone y iPad, iOS 17+). Regístrate en nuestro sitio para recibir una notificación en el lanzamiento. Mientras tanto, puedes usar la versión web en arnaquescan.vercel.app desde cualquier navegador.",
        },
        {
          q: "¿Por qué la marca está registrada en el INPI?",
          a: "La marca ArnaqueScan está registrada oficialmente en el INPI (Instituto Nacional de la Propiedad Industrial francés) en las clases 9 (software, aplicaciones móviles) y 42 (servicios informáticos, ciberseguridad, SaaS). Este registro protege la marca frente a imitadores y garantiza que estás usando la aplicación auténtica. En un sector donde circulan falsas herramientas anti-estafa para engañar a los usuarios, este certificado oficial es una garantía concreta de seriedad y legitimidad.",
        },
      ],
    },
  },
  nl: {
    nav: {
      features: "Functies",
      pricing: "Prijzen",
      faq: "FAQ",
      login: "Inloggen",
      appStoreSoon: "Binnenkort op de App Store",
      androidSoon: "Android binnenkort",
      googlePlaySoon: "Binnenkort op Google Play",
    },
    hero: {
      badge: "Binnenkort beschikbaar op de App Store · Merk geregistreerd bij INPI",
      titlePre: "Bescherm je dierbaren en je gegevens tegen",
      titleHighlight: "oplichting",
      titlePost: "met één klik.",
      subtitle:
        "ArnaqueScan detecteert frauduleuze sms'jes, phishing-e-mails en verdachte websites in realtime dankzij AI.",
      soonOn: "Binnenkort op",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Bekijk prijzen",
      reassurance: "Geen verplichtingen — Gratis versie beschikbaar — AVG-conform",
      socialProofUsers: "beschermde gebruikers",
    },
    reassurance: {
      contextLabel: "De situatie in Frankrijk",
      stats: [
        { value: "37 miljoen", label: "frauduleuze sms'jes verstuurd in Frankrijk in 2024" },
        { value: "1 op de 3 mensen", label: "jaarlijks doelwit van een oplichtingspoging" },
        { value: "2,7 miljard €", label: "verloren aan online oplichting per jaar in Frankrijk" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic AI (Claude)" },
        { icon: "🔒", label: "SSL/TLS-versleuteling" },
        { icon: "✅", label: "AVG-conform" },
        { icon: "🏅", label: "INPI-merk Kl. 9 & 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Veelgestelde vragen",
      otherQuestion: "Nog een andere vraag?",
      contactUs: "Neem contact op",
      items: [
        {
          q: "Hoe worden mijn gegevens beschermd?",
          a: "Je gegevens worden versleuteld verzonden via HTTPS/TLS en nooit langer op onze servers bewaard dan nodig voor de analyse. ArnaqueScan voldoet aan de AVG: er worden geen persoonsgegevens gedeeld met derden. Elke analyse wordt anoniem en veilig verwerkt.",
        },
        {
          q: "Hoe detecteert de AI oplichting?",
          a: "ArnaqueScan gebruikt Claude van Anthropic — een van de meest geavanceerde AI-modellen ter wereld — om elk bericht te analyseren aan de hand van meer dan 30 criteria: structuur en toon van het bericht, kunstmatige urgentie, grammaticale fouten die typisch zijn voor automatische vertaling, verdachte URL's (typosquatting, dubieuze domeinen, verkorte links), betaalnummers, ongebruikelijke verzoeken om persoonlijke of bancaire gegevens, imitatie van bekende merken, enzovoort. De analyse is contextueel: de AI begrijpt de betekenis van het bericht, niet enkel trefwoorden.",
        },
        {
          q: "Kan ik mijn abonnement gemakkelijk opzeggen?",
          a: "Ja, absoluut. Het Premium-abonnement wordt volledig beheerd via de App Store van Apple. Je kunt het op elk moment opzeggen via Instellingen → [je naam] → Abonnementen → ArnaqueScan. Geen boete, geen wachttijd. Je behoudt Premium-toegang tot het einde van de reeds betaalde periode.",
        },
        {
          q: "Werkt de app op Android?",
          a: "ArnaqueScan komt binnenkort beschikbaar voor iOS en Android (iPhone en iPad, iOS 17+). Meld je aan op onze website om op de hoogte te blijven van de lancering. In de tussentijd kun je de webversie gebruiken op arnaquescan.vercel.app, vanuit elke browser.",
        },
        {
          q: "Waarom is het merk geregistreerd bij het INPI?",
          a: "Het merk ArnaqueScan is officieel geregistreerd bij het INPI (Frans Nationaal Instituut voor Industriële Eigendom) onder de klassen 9 (software, mobiele applicaties) en 42 (IT-diensten, cybersecurity, SaaS). Deze registratie beschermt het merk tegen namaak en garandeert dat je de authentieke applicatie gebruikt. In een sector waar valse anti-oplichtingstools circuleren om gebruikers te misleiden, is dit officiële certificaat een concrete garantie van betrouwbaarheid en legitimiteit.",
        },
      ],
    },
  },
  de: {
    nav: {
      features: "Funktionen",
      pricing: "Preise",
      faq: "FAQ",
      login: "Anmelden",
      appStoreSoon: "Bald im App Store",
      androidSoon: "Android bald verfügbar",
      googlePlaySoon: "Bald bei Google Play",
    },
    hero: {
      badge: "Bald im App Store verfügbar · Marke beim INPI eingetragen",
      titlePre: "Schützen Sie Ihre Liebsten und Ihre Daten vor",
      titleHighlight: "Betrug",
      titlePost: "mit einem Klick.",
      subtitle:
        "ArnaqueScan erkennt betrügerische SMS, Phishing-E-Mails und verdächtige Websites in Echtzeit dank KI.",
      soonOn: "Bald auf",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Preise ansehen",
      reassurance: "Unverbindlich — Kostenlose Version verfügbar — DSGVO-konform",
      socialProofUsers: "geschützte Nutzer",
    },
    reassurance: {
      contextLabel: "Die Situation in Frankreich",
      stats: [
        { value: "37 Millionen", label: "betrügerische SMS in Frankreich im Jahr 2024 versendet" },
        { value: "1 von 3 Personen", label: "jährlich Ziel eines Betrugsversuchs" },
        { value: "2,7 Milliarden €", label: "jährlich durch Online-Betrug verloren in Frankreich" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic-KI (Claude)" },
        { icon: "🔒", label: "SSL/TLS-Verschlüsselung" },
        { icon: "✅", label: "DSGVO-konform" },
        { icon: "🏅", label: "INPI-Marke Kl. 9 & 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Häufig gestellte Fragen",
      otherQuestion: "Noch eine Frage?",
      contactUs: "Kontaktieren Sie uns",
      items: [
        {
          q: "Wie werden meine Daten geschützt?",
          a: "Ihre Daten werden bei der Übertragung über HTTPS/TLS verschlüsselt und niemals länger als für die Analyse nötig auf unseren Servern gespeichert. ArnaqueScan ist DSGVO-konform: Es werden keine personenbezogenen Daten an Dritte weitergegeben. Jede Analyse wird anonymisiert und sicher verarbeitet.",
        },
        {
          q: "Wie erkennt die KI Betrugsversuche?",
          a: "ArnaqueScan verwendet Claude von Anthropic — eines der fortschrittlichsten KI-Modelle der Welt —, um jede Nachricht anhand von über 30 Kriterien zu analysieren: Aufbau und Ton der Nachricht, künstliche Dringlichkeit, für maschinelle Übersetzung typische Grammatikfehler, verdächtige URLs (Typosquatting, zweifelhafte Domains, Kürzungsdienste), Mehrwertnummern, ungewöhnliche Anfragen nach persönlichen oder Bankdaten, Identitätsdiebstahl bekannter Marken und mehr. Die Analyse ist kontextbezogen: Die KI versteht die Bedeutung der Nachricht, nicht nur Schlüsselwörter.",
        },
        {
          q: "Kann ich mein Abo problemlos kündigen?",
          a: "Ja, absolut. Das Premium-Abo wird vollständig über den App Store von Apple verwaltet. Sie können es jederzeit unter Einstellungen → [Ihr Name] → Abos → ArnaqueScan kündigen. Keine Strafgebühr, keine Wartezeit. Sie behalten den Premium-Zugang bis zum Ende des bereits bezahlten Zeitraums.",
        },
        {
          q: "Funktioniert die App auf Android?",
          a: "ArnaqueScan wird bald für iOS und Android verfügbar sein (iPhone und iPad, iOS 17+). Melden Sie sich auf unserer Website an, um bei der Veröffentlichung benachrichtigt zu werden. In der Zwischenzeit können Sie die Webversion unter arnaquescan.vercel.app in jedem Browser nutzen.",
        },
        {
          q: "Warum ist die Marke beim INPI eingetragen?",
          a: "Die Marke ArnaqueScan ist offiziell beim INPI (Französisches Nationalinstitut für gewerblichen Rechtsschutz) in den Klassen 9 (Software, mobile Anwendungen) und 42 (IT-Dienstleistungen, Cybersicherheit, SaaS) eingetragen. Diese Eintragung schützt die Marke vor Nachahmern und garantiert, dass Sie die authentische Anwendung verwenden. In einem Bereich, in dem gefälschte Anti-Betrugs-Tools im Umlauf sind, um Nutzer zu täuschen, ist dieses offizielle Zertifikat ein konkreter Beleg für Seriosität und Legitimität.",
        },
      ],
    },
  },
  ar: {
    nav: {
      features: "الميزات",
      pricing: "الأسعار",
      faq: "الأسئلة الشائعة",
      login: "تسجيل الدخول",
      appStoreSoon: "قريبًا على App Store",
      androidSoon: "قريبًا على أندرويد",
      googlePlaySoon: "قريبًا على Google Play",
    },
    hero: {
      badge: "قريبًا على App Store · علامة تجارية مسجّلة لدى INPI",
      titlePre: "احمِ أحباءك وبياناتك من",
      titleHighlight: "عمليات الاحتيال",
      titlePost: "بنقرة واحدة.",
      subtitle:
        "يكتشف ArnaqueScan الرسائل النصية الاحتيالية ورسائل التصيّد الإلكتروني والمواقع المشبوهة في الوقت الفعلي بفضل الذكاء الاصطناعي.",
      soonOn: "قريبًا على",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "عرض الأسعار",
      reassurance: "بدون التزام — نسخة مجانية متاحة — متوافق مع اللائحة العامة لحماية البيانات (RGPD)",
      socialProofUsers: "مستخدم محمي",
    },
    reassurance: {
      contextLabel: "الوضع في فرنسا",
      stats: [
        { value: "37 مليون", label: "رسالة نصية احتيالية أُرسلت في فرنسا عام 2024" },
        { value: "1 من كل 3 أشخاص", label: "يستهدفهم محاولة احتيال كل عام" },
        { value: "2.7 مليار يورو", label: "خسائر سنوية بسبب الاحتيال عبر الإنترنت في فرنسا" },
      ],
      trust: [
        { icon: "🤖", label: "ذكاء اصطناعي من Anthropic (Claude)" },
        { icon: "🔒", label: "تشفير SSL/TLS" },
        { icon: "✅", label: "متوافق مع RGPD" },
        { icon: "🏅", label: "علامة INPI الفئتان 9 و42" },
      ],
    },
    faq: {
      label: "الأسئلة الشائعة",
      title: "الأسئلة المتكررة",
      otherQuestion: "هل لديك سؤال آخر؟",
      contactUs: "اتصل بنا",
      items: [
        {
          q: "كيف تتم حماية بياناتي؟",
          a: "يتم تشفير بياناتك أثناء النقل عبر HTTPS/TLS ولا تُخزَّن أبدًا على خوادمنا بعد انتهاء مدة التحليل. يمتثل ArnaqueScan للائحة العامة لحماية البيانات (RGPD): لا تتم مشاركة أي بيانات شخصية مع أطراف ثالثة. تتم معالجة كل تحليل بشكل مجهول وآمن.",
        },
        {
          q: "كيف يكتشف الذكاء الاصطناعي عمليات الاحتيال؟",
          a: "يستخدم ArnaqueScan نموذج Claude من Anthropic — أحد أكثر نماذج الذكاء الاصطناعي تقدمًا في العالم — لتحليل كل رسالة وفق أكثر من 30 معيارًا: بنية الرسالة ونبرتها، الاستعجال المصطنع، الأخطاء النحوية النموذجية للترجمة الآلية، الروابط المشبوهة (التلاعب بالأسماء، النطاقات المشكوك فيها، مختصرات الروابط)، الأرقام ذات التعرفة المرتفعة، الطلبات غير المعتادة للمعلومات الشخصية أو المصرفية، انتحال هوية علامات تجارية معروفة، وغير ذلك. التحليل سياقي: يفهم الذكاء الاصطناعي معنى الرسالة، وليس فقط الكلمات المفتاحية.",
        },
        {
          q: "هل يمكنني إلغاء اشتراكي بسهولة؟",
          a: "نعم، بالتأكيد. تتم إدارة اشتراك Premium بالكامل عبر متجر App Store من Apple. يمكنك إلغاؤه في أي وقت من الإعدادات ← [اسمك] ← الاشتراكات ← ArnaqueScan. بدون غرامة وبدون مهلة انتظار. تحتفظ بإمكانية الوصول إلى Premium حتى نهاية الفترة التي دفعت مقابلها بالفعل.",
        },
        {
          q: "هل يعمل التطبيق على أندرويد؟",
          a: "سيتوفر ArnaqueScan قريبًا على iOS وأندرويد (آيفون وآيباد، iOS 17 فما فوق). سجّل على موقعنا لتصلك إشعار عند الإطلاق. في غضون ذلك، يمكنك استخدام النسخة الإلكترونية على arnaquescan.vercel.app من أي متصفح.",
        },
        {
          q: "لماذا العلامة التجارية مسجّلة لدى INPI؟",
          a: "علامة ArnaqueScan التجارية مسجّلة رسميًا لدى INPI (المعهد الوطني الفرنسي للملكية الصناعية) ضمن الفئتين 9 (البرمجيات، تطبيقات الهاتف المحمول) و42 (خدمات تكنولوجيا المعلومات، الأمن السيبراني، البرمجيات كخدمة SaaS). يحمي هذا التسجيل العلامة التجارية من المقلّدين ويضمن لك استخدام التطبيق الأصلي. في مجال تنتشر فيه أدوات مزيّفة لمكافحة الاحتيال لخداع المستخدمين، تُعد هذه الشهادة الرسمية ضمانًا ملموسًا للجدية والمصداقية.",
        },
      ],
    },
  },
  it: {
    nav: {
      features: "Funzionalità",
      pricing: "Prezzi",
      faq: "FAQ",
      login: "Accedi",
      appStoreSoon: "Presto su App Store",
      androidSoon: "Android in arrivo",
      googlePlaySoon: "Presto su Google Play",
    },
    hero: {
      badge: "Presto su App Store · Marchio registrato presso l'INPI",
      titlePre: "Proteggi i tuoi cari e i tuoi dati da",
      titleHighlight: "le truffe",
      titlePost: "in un clic.",
      subtitle:
        "ArnaqueScan rileva SMS fraudolenti, e-mail di phishing e siti sospetti in tempo reale grazie all'IA.",
      soonOn: "Presto su",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Vedi i prezzi",
      reassurance: "Nessun impegno — Versione gratuita disponibile — Conforme al GDPR",
      socialProofUsers: "utenti protetti",
    },
    reassurance: {
      contextLabel: "La situazione in Francia",
      stats: [
        { value: "37 milioni", label: "di SMS fraudolenti inviati in Francia nel 2024" },
        { value: "1 persona su 3", label: "presa di mira da un tentativo di truffa ogni anno" },
        { value: "2,7 miliardi €", label: "persi a causa delle truffe online ogni anno in Francia" },
      ],
      trust: [
        { icon: "🤖", label: "IA Anthropic (Claude)" },
        { icon: "🔒", label: "Crittografia SSL/TLS" },
        { icon: "✅", label: "Conforme al GDPR" },
        { icon: "🏅", label: "Marchio INPI Cl. 9 e 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Domande frequenti",
      otherQuestion: "Hai un'altra domanda?",
      contactUs: "Contattaci",
      items: [
        {
          q: "Come vengono protetti i miei dati?",
          a: "I tuoi dati vengono crittografati durante la trasmissione tramite HTTPS/TLS e non vengono mai conservati sui nostri server oltre la durata dell'analisi. ArnaqueScan è conforme al GDPR: nessun dato personale viene condiviso con terze parti. Ogni analisi viene elaborata in modo anonimo e sicuro.",
        },
        {
          q: "Come fa l'IA a rilevare le truffe?",
          a: "ArnaqueScan utilizza Claude di Anthropic — uno dei modelli di IA più avanzati al mondo — per analizzare ogni messaggio in base a oltre 30 criteri: struttura e tono del messaggio, urgenza artificiale, errori grammaticali tipici della traduzione automatica, URL sospetti (typosquatting, domini dubbi, accorciatori di link), numeri a tariffa maggiorata, richieste insolite di informazioni personali o bancarie, usurpazione d'identità di marchi noti e altro ancora. L'analisi è contestuale: l'IA comprende il significato del messaggio, non solo le parole chiave.",
        },
        {
          q: "Posso annullare facilmente il mio abbonamento?",
          a: "Sì, assolutamente. L'abbonamento Premium è gestito interamente tramite l'App Store di Apple. Puoi annullarlo in qualsiasi momento da Impostazioni → [il tuo nome] → Abbonamenti → ArnaqueScan. Nessuna penale, nessun periodo di attesa. Mantieni l'accesso Premium fino alla fine del periodo già pagato.",
        },
        {
          q: "L'app funziona su Android?",
          a: "ArnaqueScan sarà presto disponibile su iOS e Android (iPhone e iPad, iOS 17+). Iscriviti sul nostro sito per essere avvisato al lancio. Nel frattempo, puoi utilizzare la versione web su arnaquescan.vercel.app da qualsiasi browser.",
        },
        {
          q: "Perché il marchio è registrato presso l'INPI?",
          a: "Il marchio ArnaqueScan è ufficialmente registrato presso l'INPI (Istituto Nazionale Francese della Proprietà Industriale) nelle classi 9 (software, applicazioni mobili) e 42 (servizi informatici, cybersicurezza, SaaS). Questa registrazione protegge il marchio dagli imitatori e garantisce che tu stia utilizzando l'applicazione autentica. In un settore in cui circolano falsi strumenti anti-truffa per ingannare gli utenti, questo certificato ufficiale è una garanzia concreta di serietà e legittimità.",
        },
      ],
    },
  },
  ja: {
    nav: {
      features: "機能",
      pricing: "料金",
      faq: "よくある質問",
      login: "ログイン",
      appStoreSoon: "App Storeで近日公開",
      androidSoon: "Android版は近日公開",
      googlePlaySoon: "Google Playで近日公開",
    },
    hero: {
      badge: "App Storeで近日公開・INPI商標登録済み",
      titlePre: "大切な人とあなたのデータを",
      titleHighlight: "詐欺",
      titlePost: "からワンクリックで守る。",
      subtitle:
        "ArnaqueScanはAIを活用し、詐欺SMS、フィッシングメール、不審なウェブサイトをリアルタイムで検出します。",
      soonOn: "近日公開：",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "料金を見る",
      reassurance: "契約期間の縛りなし — 無料版あり — GDPR準拠",
      socialProofUsers: "人が保護されています",
    },
    reassurance: {
      contextLabel: "フランスの現状",
      stats: [
        { value: "3,700万件", label: "2024年にフランスで送信された詐欺SMS" },
        { value: "3人に1人", label: "が毎年詐欺の標的にされています" },
        { value: "27億ユーロ", label: "がフランスで毎年オンライン詐欺により失われています" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic AI（Claude）" },
        { icon: "🔒", label: "SSL/TLS暗号化" },
        { icon: "✅", label: "GDPR準拠" },
        { icon: "🏅", label: "INPI商標 第9類・第42類" },
      ],
    },
    faq: {
      label: "よくある質問",
      title: "よくある質問",
      otherQuestion: "ほかにご質問はありますか？",
      contactUs: "お問い合わせ",
      items: [
        {
          q: "私のデータはどのように保護されますか？",
          a: "お客様のデータはHTTPS/TLSで転送時に暗号化され、分析にかかる時間を超えて弊社サーバーに保存されることはありません。ArnaqueScanはGDPRに準拠しており、個人データが第三者と共有されることは一切ありません。すべての分析は匿名かつ安全に処理されます。",
        },
        {
          q: "AIはどのように詐欺を検出するのですか？",
          a: "ArnaqueScanは、世界で最も高度なAIモデルの一つであるAnthropic社のClaudeを使用し、30以上の基準に基づいて各メッセージを分析します。メッセージの構成やトーン、人為的な緊急性、機械翻訳特有の文法ミス、不審なURL（タイポスクワッティング、疑わしいドメイン、短縮URL）、有料番号、個人情報や銀行情報の異例な要求、有名ブランドのなりすましなどです。分析は文脈に基づいて行われ、AIはキーワードだけでなくメッセージの意味を理解します。",
        },
        {
          q: "サブスクリプションは簡単に解約できますか？",
          a: "はい、もちろんです。Premiumサブスクリプションはすべて Apple の App Store で管理されています。設定 → [お名前] → サブスクリプション → ArnaqueScan からいつでも解約できます。違約金や待機期間は一切ありません。すでに支払った期間の終了まで、Premium機能をご利用いただけます。",
        },
        {
          q: "アプリはAndroidでも使えますか？",
          a: "ArnaqueScanはまもなくiOSとAndroid（iPhoneおよびiPad、iOS 17以降）でご利用いただけるようになります。リリース時に通知を受け取るには、当社サイトでご登録ください。それまでの間は、arnaquescan.vercel.app のWeb版をあらゆるブラウザからご利用いただけます。",
        },
        {
          q: "なぜ商標がINPIに登録されているのですか？",
          a: "ArnaqueScanの商標は、フランス国立工業所有権機関（INPI）に第9類（ソフトウェア、モバイルアプリ）および第42類（IT関連サービス、サイバーセキュリティ、SaaS）として正式に登録されています。この登録により、模倣品からブランドを保護し、お客様が正規のアプリケーションを利用していることを保証します。ユーザーを騙すための偽の詐欺対策ツールが出回る分野において、この公式証明書は信頼性と正当性の具体的な証となります。",
        },
      ],
    },
  },
  ko: {
    nav: {
      features: "기능",
      pricing: "요금제",
      faq: "자주 묻는 질문",
      login: "로그인",
      appStoreSoon: "App Store 출시 예정",
      androidSoon: "Android 버전 출시 예정",
      googlePlaySoon: "Google Play 출시 예정",
    },
    hero: {
      badge: "App Store 출시 예정 · INPI 상표 등록 완료",
      titlePre: "소중한 사람과 데이터를",
      titleHighlight: "사기",
      titlePost: "로부터 한 번의 클릭으로 보호하세요.",
      subtitle:
        "ArnaqueScan은 AI를 통해 사기 문자, 피싱 이메일, 의심스러운 웹사이트를 실시간으로 감지합니다.",
      soonOn: "출시 예정:",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "요금제 보기",
      reassurance: "약정 없음 — 무료 버전 제공 — GDPR 준수",
      socialProofUsers: "명이 보호받고 있습니다",
    },
    reassurance: {
      contextLabel: "프랑스의 현황",
      stats: [
        { value: "3,700만 건", label: "2024년 프랑스에서 발송된 사기 문자 메시지" },
        { value: "3명 중 1명", label: "매년 사기 시도의 표적이 됩니다" },
        { value: "27억 유로", label: "매년 프랑스에서 온라인 사기로 인한 손실액" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic AI (Claude)" },
        { icon: "🔒", label: "SSL/TLS 암호화" },
        { icon: "✅", label: "GDPR 준수" },
        { icon: "🏅", label: "INPI 상표 제9류 및 제42류" },
      ],
    },
    faq: {
      label: "자주 묻는 질문",
      title: "자주 묻는 질문",
      otherQuestion: "다른 질문이 있으신가요?",
      contactUs: "문의하기",
      items: [
        {
          q: "제 데이터는 어떻게 보호되나요?",
          a: "귀하의 데이터는 HTTPS/TLS를 통해 전송 중 암호화되며, 분석이 끝난 후에는 당사 서버에 저장되지 않습니다. ArnaqueScan은 GDPR을 준수하며 어떠한 개인 데이터도 제3자와 공유하지 않습니다. 모든 분석은 익명으로 안전하게 처리됩니다.",
        },
        {
          q: "AI는 어떻게 사기를 탐지하나요?",
          a: "ArnaqueScan은 세계에서 가장 발전된 AI 모델 중 하나인 Anthropic의 Claude를 사용하여 각 메시지를 30가지 이상의 기준으로 분석합니다: 메시지의 구조와 어조, 인위적인 긴급성, 기계 번역 특유의 문법 오류, 의심스러운 URL(타이포스쿼팅, 의심스러운 도메인, 단축 URL), 고가의 전화번호, 개인정보나 금융정보에 대한 이례적인 요청, 유명 브랜드 사칭 등입니다. 분석은 맥락을 기반으로 하며, AI는 단순 키워드가 아니라 메시지의 의미를 이해합니다.",
        },
        {
          q: "구독을 쉽게 취소할 수 있나요?",
          a: "네, 물론입니다. Premium 구독은 Apple App Store를 통해 전적으로 관리됩니다. 설정 → [본인 이름] → 구독 → ArnaqueScan에서 언제든지 취소할 수 있습니다. 위약금이나 대기 기간이 없습니다. 이미 결제한 기간이 끝날 때까지 Premium 이용 권한이 유지됩니다.",
        },
        {
          q: "앱이 Android에서도 작동하나요?",
          a: "ArnaqueScan은 곧 iOS와 Android(iPhone 및 iPad, iOS 17 이상)에서 이용 가능해집니다. 출시 시 알림을 받으려면 저희 웹사이트에 가입하세요. 그때까지는 어떤 브라우저에서든 arnaquescan.vercel.app에서 웹 버전을 이용하실 수 있습니다.",
        },
        {
          q: "상표가 왜 INPI에 등록되어 있나요?",
          a: "ArnaqueScan 상표는 프랑스 국립 산업재산권 연구소(INPI)에 제9류(소프트웨어, 모바일 애플리케이션) 및 제42류(IT 서비스, 사이버 보안, SaaS)로 공식 등록되어 있습니다. 이 등록은 모방품으로부터 브랜드를 보호하고 정품 애플리케이션을 사용하고 있음을 보장합니다. 사용자를 속이기 위한 가짜 사기 방지 도구가 유통되는 분야에서, 이 공식 인증서는 신뢰성과 정당성에 대한 구체적인 보증입니다.",
        },
      ],
    },
  },
  pl: {
    nav: {
      features: "Funkcje",
      pricing: "Cennik",
      faq: "FAQ",
      login: "Zaloguj się",
      appStoreSoon: "Wkrótce w App Store",
      androidSoon: "Wkrótce na Androida",
      googlePlaySoon: "Wkrótce w Google Play",
    },
    hero: {
      badge: "Wkrótce w App Store · Znak towarowy zarejestrowany w INPI",
      titlePre: "Chroń swoich bliskich i swoje dane przed",
      titleHighlight: "oszustwami",
      titlePost: "za jednym kliknięciem.",
      subtitle:
        "ArnaqueScan wykrywa oszukańcze SMS-y, e-maile phishingowe i podejrzane strony internetowe w czasie rzeczywistym dzięki sztucznej inteligencji.",
      soonOn: "Wkrótce w",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Zobacz cennik",
      reassurance: "Bez zobowiązań — Dostępna wersja darmowa — Zgodność z RODO",
      socialProofUsers: "chronionych użytkowników",
    },
    reassurance: {
      contextLabel: "Sytuacja we Francji",
      stats: [
        { value: "37 milionów", label: "oszukańczych SMS-ów wysłanych we Francji w 2024 roku" },
        { value: "1 na 3 osoby", label: "jest co roku celem próby oszustwa" },
        { value: "2,7 miliarda €", label: "strat rocznie z powodu oszustw internetowych we Francji" },
      ],
      trust: [
        { icon: "🤖", label: "AI Anthropic (Claude)" },
        { icon: "🔒", label: "Szyfrowanie SSL/TLS" },
        { icon: "✅", label: "Zgodność z RODO" },
        { icon: "🏅", label: "Znak towarowy INPI kl. 9 i 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Najczęściej zadawane pytania",
      otherQuestion: "Masz inne pytanie?",
      contactUs: "Skontaktuj się z nami",
      items: [
        {
          q: "Jak chronione są moje dane?",
          a: "Twoje dane są szyfrowane podczas przesyłania za pomocą HTTPS/TLS i nigdy nie są przechowywane na naszych serwerach dłużej niż trwa analiza. ArnaqueScan jest zgodny z RODO: żadne dane osobowe nie są udostępniane osobom trzecim. Każda analiza jest przetwarzana anonimowo i bezpiecznie.",
        },
        {
          q: "Jak sztuczna inteligencja wykrywa oszustwa?",
          a: "ArnaqueScan wykorzystuje Claude firmy Anthropic — jeden z najbardziej zaawansowanych modeli AI na świecie — do analizy każdej wiadomości według ponad 30 kryteriów: struktura i ton wiadomości, sztucznie wywołana pilność, błędy gramatyczne typowe dla tłumaczenia maszynowego, podejrzane adresy URL (typosquatting, wątpliwe domeny, skracacze linków), numery o podwyższonej opłacie, nietypowe prośby o dane osobowe lub bankowe, podszywanie się pod znane marki i inne. Analiza jest kontekstowa: AI rozumie sens wiadomości, a nie tylko słowa kluczowe.",
        },
        {
          q: "Czy mogę łatwo anulować subskrypcję?",
          a: "Tak, oczywiście. Subskrypcja Premium jest w całości zarządzana przez App Store firmy Apple. Możesz ją anulować w dowolnym momencie w Ustawienia → [Twoje imię] → Subskrypcje → ArnaqueScan. Bez kar i bez okresu oczekiwania. Zachowujesz dostęp Premium do końca już opłaconego okresu.",
        },
        {
          q: "Czy aplikacja działa na Androidzie?",
          a: "ArnaqueScan będzie wkrótce dostępny na iOS i Androidzie (iPhone i iPad, iOS 17+). Zarejestruj się na naszej stronie, aby otrzymać powiadomienie w dniu premiery. W międzyczasie możesz korzystać z wersji internetowej pod adresem arnaquescan.vercel.app z dowolnej przeglądarki.",
        },
        {
          q: "Dlaczego znak towarowy jest zarejestrowany w INPI?",
          a: "Znak towarowy ArnaqueScan jest oficjalnie zarejestrowany w INPI (Francuskim Narodowym Instytucie Własności Przemysłowej) w klasach 9 (oprogramowanie, aplikacje mobilne) i 42 (usługi informatyczne, cyberbezpieczeństwo, SaaS). Ta rejestracja chroni markę przed naśladowcami i gwarantuje, że korzystasz z autentycznej aplikacji. W dziedzinie, w której krążą fałszywe narzędzia antyoszustwowe mające na celu oszukanie użytkowników, ten oficjalny certyfikat stanowi konkretną gwarancję rzetelności i legalności.",
        },
      ],
    },
  },
  pt: {
    nav: {
      features: "Funcionalidades",
      pricing: "Preços",
      faq: "FAQ",
      login: "Iniciar sessão",
      appStoreSoon: "Brevemente na App Store",
      androidSoon: "Android brevemente",
      googlePlaySoon: "Brevemente no Google Play",
    },
    hero: {
      badge: "Brevemente na App Store · Marca registada no INPI",
      titlePre: "Proteja os seus entes queridos e os seus dados contra",
      titleHighlight: "os burlões",
      titlePost: "com um clique.",
      subtitle:
        "O ArnaqueScan deteta SMS fraudulentos, e-mails de phishing e sites suspeitos em tempo real graças à IA.",
      soonOn: "Brevemente no",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Ver preços",
      reassurance: "Sem compromisso — Versão gratuita disponível — Conforme com o RGPD",
      socialProofUsers: "utilizadores protegidos",
    },
    reassurance: {
      contextLabel: "O contexto em França",
      stats: [
        { value: "37 milhões", label: "de SMS fraudulentos enviados em França em 2024" },
        { value: "1 em cada 3 pessoas", label: "alvo de uma tentativa de burla todos os anos" },
        { value: "2,7 mil milhões €", label: "perdidos em burlas online por ano em França" },
      ],
      trust: [
        { icon: "🤖", label: "IA Anthropic (Claude)" },
        { icon: "🔒", label: "Encriptação SSL/TLS" },
        { icon: "✅", label: "Conforme com o RGPD" },
        { icon: "🏅", label: "Marca INPI Cl. 9 e 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Perguntas frequentes",
      otherQuestion: "Tem outra pergunta?",
      contactUs: "Contacte-nos",
      items: [
        {
          q: "Como são protegidos os meus dados?",
          a: "Os seus dados são encriptados durante a transmissão via HTTPS/TLS e nunca são armazenados nos nossos servidores para além da duração da análise. O ArnaqueScan está em conformidade com o RGPD: nenhum dado pessoal é partilhado com terceiros. Cada análise é processada de forma anónima e segura.",
        },
        {
          q: "Como é que a IA deteta as burlas?",
          a: "O ArnaqueScan utiliza o Claude da Anthropic — um dos modelos de IA mais avançados do mundo — para analisar cada mensagem segundo mais de 30 critérios: estrutura e tom da mensagem, urgência artificial, erros gramaticais típicos de tradução automática, URLs suspeitos (typosquatting, domínios duvidosos, encurtadores), números de tarifa majorada, pedidos invulgares de informações pessoais ou bancárias, usurpação de identidade de marcas conhecidas, entre outros. A análise é contextual: a IA compreende o significado da mensagem, não apenas palavras-chave.",
        },
        {
          q: "Posso cancelar a minha subscrição facilmente?",
          a: "Sim, absolutamente. A subscrição Premium é gerida inteiramente através da App Store da Apple. Pode cancelá-la a qualquer momento em Definições → [o seu nome] → Subscrições → ArnaqueScan. Sem penalização, sem período de espera. Mantém o acesso Premium até ao final do período já pago.",
        },
        {
          q: "A aplicação funciona no Android?",
          a: "O ArnaqueScan estará brevemente disponível no iOS e no Android (iPhone e iPad, iOS 17+). Inscreva-se no nosso site para ser notificado no lançamento. Entretanto, pode utilizar a versão web em arnaquescan.vercel.app a partir de qualquer navegador.",
        },
        {
          q: "Porque é que a marca está registada no INPI?",
          a: "A marca ArnaqueScan está oficialmente registada no INPI (Instituto Nacional Francês da Propriedade Industrial) nas classes 9 (software, aplicações móveis) e 42 (serviços informáticos, cibersegurança, SaaS). Este registo protege a marca contra imitadores e garante que está a utilizar a aplicação autêntica. Num setor onde circulam falsas ferramentas antiburla para enganar os utilizadores, este certificado oficial é uma garantia concreta de seriedade e legitimidade.",
        },
      ],
    },
  },
  ro: {
    nav: {
      features: "Funcționalități",
      pricing: "Prețuri",
      faq: "Întrebări frecvente",
      login: "Conectare",
      appStoreSoon: "În curând pe App Store",
      androidSoon: "Android în curând",
      googlePlaySoon: "În curând pe Google Play",
    },
    hero: {
      badge: "În curând pe App Store · Marcă înregistrată la INPI",
      titlePre: "Protejează-ți persoanele dragi și datele împotriva",
      titleHighlight: "escrocheriilor",
      titlePost: "cu un singur clic.",
      subtitle:
        "ArnaqueScan detectează SMS-urile frauduloase, e-mailurile de phishing și site-urile suspecte în timp real datorită inteligenței artificiale.",
      soonOn: "În curând pe",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Vezi prețurile",
      reassurance: "Fără angajament — Versiune gratuită disponibilă — Conform GDPR",
      socialProofUsers: "utilizatori protejați",
    },
    reassurance: {
      contextLabel: "Situația din Franța",
      stats: [
        { value: "37 de milioane", label: "de SMS-uri frauduloase trimise în Franța în 2024" },
        { value: "1 din 3 persoane", label: "vizate de o tentativă de escrocherie în fiecare an" },
        { value: "2,7 miliarde €", label: "pierduți din cauza escrocheriilor online în fiecare an în Franța" },
      ],
      trust: [
        { icon: "🤖", label: "IA Anthropic (Claude)" },
        { icon: "🔒", label: "Criptare SSL/TLS" },
        { icon: "✅", label: "Conform GDPR" },
        { icon: "🏅", label: "Marcă INPI Cl. 9 și 42" },
      ],
    },
    faq: {
      label: "Întrebări frecvente",
      title: "Întrebări frecvente",
      otherQuestion: "Ai o altă întrebare?",
      contactUs: "Contactează-ne",
      items: [
        {
          q: "Cum îmi sunt protejate datele?",
          a: "Datele tale sunt criptate în timpul transmiterii prin HTTPS/TLS și nu sunt niciodată stocate pe serverele noastre dincolo de durata analizei. ArnaqueScan respectă GDPR: nu sunt partajate date cu caracter personal cu terți. Fiecare analiză este procesată anonim și în siguranță.",
        },
        {
          q: "Cum detectează IA escrocheriile?",
          a: "ArnaqueScan utilizează Claude de la Anthropic — unul dintre cele mai avansate modele de inteligență artificială din lume — pentru a analiza fiecare mesaj în funcție de peste 30 de criterii: structura și tonul mesajului, urgența artificială, greșeli gramaticale tipice traducerii automate, URL-uri suspecte (typosquatting, domenii dubioase, scurtatoare de linkuri), numere cu tarif special, cereri neobișnuite de informații personale sau bancare, uzurparea identității unor mărci cunoscute și altele. Analiza este contextuală: IA înțelege sensul mesajului, nu doar cuvintele-cheie.",
        },
        {
          q: "Îmi pot anula abonamentul cu ușurință?",
          a: "Da, absolut. Abonamentul Premium este gestionat în întregime prin App Store de la Apple. Îl poți anula oricând din Setări → [numele tău] → Abonamente → ArnaqueScan. Fără penalizări, fără perioadă de așteptare. Păstrezi accesul Premium până la sfârșitul perioadei deja plătite.",
        },
        {
          q: "Aplicația funcționează pe Android?",
          a: "ArnaqueScan va fi disponibil în curând pe iOS și Android (iPhone și iPad, iOS 17+). Înscrie-te pe site-ul nostru pentru a fi notificat la lansare. Între timp, poți folosi versiunea web la arnaquescan.vercel.app din orice browser.",
        },
        {
          q: "De ce este marca înregistrată la INPI?",
          a: "Marca ArnaqueScan este înregistrată oficial la INPI (Institutul Național Francez pentru Proprietate Industrială) la clasele 9 (software, aplicații mobile) și 42 (servicii informatice, securitate cibernetică, SaaS). Această înregistrare protejează marca împotriva imitatorilor și garantează că folosești aplicația autentică. Într-un domeniu în care circulă instrumente false anti-escrocherie pentru a păcăli utilizatorii, acest certificat oficial este o garanție concretă de seriozitate și legitimitate.",
        },
      ],
    },
  },
  ru: {
    nav: {
      features: "Возможности",
      pricing: "Тарифы",
      faq: "Частые вопросы",
      login: "Войти",
      appStoreSoon: "Скоро в App Store",
      androidSoon: "Android скоро",
      googlePlaySoon: "Скоро в Google Play",
    },
    hero: {
      badge: "Скоро в App Store · Товарный знак зарегистрирован в INPI",
      titlePre: "Защитите своих близких и свои данные от",
      titleHighlight: "мошенничества",
      titlePost: "одним нажатием.",
      subtitle:
        "ArnaqueScan обнаруживает мошеннические SMS, фишинговые письма и подозрительные сайты в режиме реального времени благодаря ИИ.",
      soonOn: "Скоро в",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Смотреть тарифы",
      reassurance: "Без обязательств — Доступна бесплатная версия — Соответствует GDPR",
      socialProofUsers: "защищённых пользователей",
    },
    reassurance: {
      contextLabel: "Ситуация во Франции",
      stats: [
        { value: "37 миллионов", label: "мошеннических SMS отправлено во Франции в 2024 году" },
        { value: "1 из 3 человек", label: "ежегодно становится целью попытки мошенничества" },
        { value: "2,7 миллиарда €", label: "теряется из-за онлайн-мошенничества ежегодно во Франции" },
      ],
      trust: [
        { icon: "🤖", label: "ИИ Anthropic (Claude)" },
        { icon: "🔒", label: "Шифрование SSL/TLS" },
        { icon: "✅", label: "Соответствует GDPR" },
        { icon: "🏅", label: "Товарный знак INPI кл. 9 и 42" },
      ],
    },
    faq: {
      label: "Частые вопросы",
      title: "Часто задаваемые вопросы",
      otherQuestion: "Остались вопросы?",
      contactUs: "Свяжитесь с нами",
      items: [
        {
          q: "Как защищены мои данные?",
          a: "Ваши данные шифруются при передаче через HTTPS/TLS и никогда не хранятся на наших серверах дольше, чем длится анализ. ArnaqueScan соответствует требованиям GDPR: никакие персональные данные не передаются третьим лицам. Каждый анализ обрабатывается анонимно и безопасно.",
        },
        {
          q: "Как ИИ обнаруживает мошенничество?",
          a: "ArnaqueScan использует Claude от Anthropic — одну из самых передовых моделей ИИ в мире — для анализа каждого сообщения более чем по 30 критериям: структура и тон сообщения, искусственная срочность, грамматические ошибки, характерные для машинного перевода, подозрительные URL-адреса (тайпсквоттинг, сомнительные домены, сокращатели ссылок), номера с повышенным тарифом, необычные запросы личных или банковских данных, выдача себя за известные бренды и многое другое. Анализ является контекстным: ИИ понимает смысл сообщения, а не только ключевые слова.",
        },
        {
          q: "Могу ли я легко отменить подписку?",
          a: "Да, конечно. Подписка Premium полностью управляется через App Store Apple. Вы можете отменить её в любой момент в разделе Настройки → [ваше имя] → Подписки → ArnaqueScan. Без штрафов и периода ожидания. Доступ к Premium сохраняется до конца уже оплаченного периода.",
        },
        {
          q: "Работает ли приложение на Android?",
          a: "ArnaqueScan скоро будет доступен на iOS и Android (iPhone и iPad, iOS 17+). Зарегистрируйтесь на нашем сайте, чтобы получить уведомление о запуске. А пока вы можете использовать веб-версию на arnaquescan.vercel.app в любом браузере.",
        },
        {
          q: "Почему товарный знак зарегистрирован в INPI?",
          a: "Товарный знак ArnaqueScan официально зарегистрирован в INPI (Национальном институте промышленной собственности Франции) по классам 9 (программное обеспечение, мобильные приложения) и 42 (ИТ-услуги, кибербезопасность, SaaS). Эта регистрация защищает бренд от подделок и гарантирует, что вы используете подлинное приложение. В сфере, где распространены поддельные антимошеннические инструменты для обмана пользователей, этот официальный сертификат служит конкретной гарантией серьёзности и легитимности.",
        },
      ],
    },
  },
  th: {
    nav: {
      features: "ฟีเจอร์",
      pricing: "ราคา",
      faq: "คำถามที่พบบ่อย",
      login: "เข้าสู่ระบบ",
      appStoreSoon: "เร็ว ๆ นี้บน App Store",
      androidSoon: "Android เร็ว ๆ นี้",
      googlePlaySoon: "เร็ว ๆ นี้บน Google Play",
    },
    hero: {
      badge: "เร็ว ๆ นี้บน App Store · เครื่องหมายการค้าจดทะเบียนกับ INPI",
      titlePre: "ปกป้องคนที่คุณรักและข้อมูลของคุณจาก",
      titleHighlight: "การหลอกลวง",
      titlePost: "ได้ในคลิกเดียว",
      subtitle:
        "ArnaqueScan ตรวจจับ SMS หลอกลวง อีเมลฟิชชิง และเว็บไซต์ที่น่าสงสัยแบบเรียลไทม์ด้วย AI",
      soonOn: "เร็ว ๆ นี้บน",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "ดูราคา",
      reassurance: "ไม่มีข้อผูกมัด — มีเวอร์ชันฟรี — สอดคล้องกับ GDPR",
      socialProofUsers: "ผู้ใช้ที่ได้รับการปกป้อง",
    },
    reassurance: {
      contextLabel: "สถานการณ์ในฝรั่งเศส",
      stats: [
        { value: "37 ล้าน", label: "SMS หลอกลวงที่ถูกส่งในฝรั่งเศสในปี 2024" },
        { value: "1 ใน 3 คน", label: "ตกเป็นเป้าหมายของการหลอกลวงทุกปี" },
        { value: "2.7 พันล้านยูโร", label: "สูญเสียจากการหลอกลวงออนไลน์ในแต่ละปีในฝรั่งเศส" },
      ],
      trust: [
        { icon: "🤖", label: "AI จาก Anthropic (Claude)" },
        { icon: "🔒", label: "การเข้ารหัส SSL/TLS" },
        { icon: "✅", label: "สอดคล้องกับ GDPR" },
        { icon: "🏅", label: "เครื่องหมายการค้า INPI จำพวกที่ 9 และ 42" },
      ],
    },
    faq: {
      label: "คำถามที่พบบ่อย",
      title: "คำถามที่พบบ่อย",
      otherQuestion: "มีคำถามอื่นอีกไหม?",
      contactUs: "ติดต่อเรา",
      items: [
        {
          q: "ข้อมูลของฉันได้รับการปกป้องอย่างไร?",
          a: "ข้อมูลของคุณจะถูกเข้ารหัสระหว่างการส่งผ่าน HTTPS/TLS และจะไม่ถูกจัดเก็บไว้บนเซิร์ฟเวอร์ของเราเกินระยะเวลาที่ใช้ในการวิเคราะห์ ArnaqueScan สอดคล้องกับ GDPR: ไม่มีการแชร์ข้อมูลส่วนบุคคลกับบุคคลที่สาม การวิเคราะห์ทุกครั้งจะถูกประมวลผลแบบไม่ระบุตัวตนและปลอดภัย",
        },
        {
          q: "AI ตรวจจับการหลอกลวงได้อย่างไร?",
          a: "ArnaqueScan ใช้ Claude จาก Anthropic ซึ่งเป็นหนึ่งในโมเดล AI ที่ล้ำหน้าที่สุดในโลก เพื่อวิเคราะห์ข้อความแต่ละข้อความตามเกณฑ์กว่า 30 ข้อ ได้แก่ โครงสร้างและน้ำเสียงของข้อความ ความเร่งด่วนที่สร้างขึ้นเทียม ข้อผิดพลาดทางไวยากรณ์ที่เป็นลักษณะเฉพาะของการแปลด้วยเครื่อง URL ที่น่าสงสัย (การสะกดชื่อโดเมนเลียนแบบ โดเมนที่น่าสงสัย ตัวย่อลิงก์) หมายเลขโทรศัพท์อัตราพิเศษ การขอข้อมูลส่วนบุคคลหรือข้อมูลธนาคารที่ผิดปกติ การแอบอ้างเป็นแบรนด์ที่มีชื่อเสียง และอื่น ๆ การวิเคราะห์อิงบริบท: AI เข้าใจความหมายของข้อความ ไม่ใช่แค่คำสำคัญเท่านั้น",
        },
        {
          q: "ฉันสามารถยกเลิกการสมัครสมาชิกได้ง่ายไหม?",
          a: "ได้แน่นอน การสมัครสมาชิก Premium ถูกจัดการทั้งหมดผ่าน App Store ของ Apple คุณสามารถยกเลิกได้ทุกเมื่อจาก การตั้งค่า → [ชื่อของคุณ] → การสมัครสมาชิก → ArnaqueScan ไม่มีค่าปรับ ไม่มีระยะเวลารอ คุณจะยังคงใช้สิทธิ์ Premium ได้จนกว่าจะสิ้นสุดรอบระยะเวลาที่ชำระเงินไปแล้ว",
        },
        {
          q: "แอปใช้งานได้บน Android ไหม?",
          a: "ArnaqueScan จะพร้อมให้บริการบน iOS และ Android เร็ว ๆ นี้ (iPhone และ iPad, iOS 17 ขึ้นไป) สมัครรับการแจ้งเตือนบนเว็บไซต์ของเราเพื่อรับทราบเมื่อเปิดตัว ในระหว่างนี้ คุณสามารถใช้เวอร์ชันเว็บได้ที่ arnaquescan.vercel.app จากเบราว์เซอร์ใดก็ได้",
        },
        {
          q: "ทำไมเครื่องหมายการค้าจึงจดทะเบียนกับ INPI?",
          a: "เครื่องหมายการค้า ArnaqueScan ได้จดทะเบียนอย่างเป็นทางการกับ INPI (สถาบันทรัพย์สินทางอุตสาหกรรมแห่งชาติของฝรั่งเศส) ในจำพวกที่ 9 (ซอฟต์แวร์ แอปพลิเคชันมือถือ) และจำพวกที่ 42 (บริการไอที ความปลอดภัยไซเบอร์ SaaS) การจดทะเบียนนี้ปกป้องแบรนด์จากผู้เลียนแบบ และรับประกันว่าคุณกำลังใช้แอปพลิเคชันของแท้ ในวงการที่มีเครื่องมือป้องกันการหลอกลวงปลอมแพร่ระบาดเพื่อหลอกลวงผู้ใช้ ใบรับรองอย่างเป็นทางการนี้เป็นหลักประกันที่เป็นรูปธรรมถึงความน่าเชื่อถือและความชอบธรรม",
        },
      ],
    },
  },
  tr: {
    nav: {
      features: "Özellikler",
      pricing: "Fiyatlandırma",
      faq: "SSS",
      login: "Giriş yap",
      appStoreSoon: "Yakında App Store'da",
      androidSoon: "Android yakında",
      googlePlaySoon: "Yakında Google Play'de",
    },
    hero: {
      badge: "Yakında App Store'da · INPI'de tescilli marka",
      titlePre: "Sevdiklerinizi ve verilerinizi",
      titleHighlight: "dolandırıcılıktan",
      titlePost: "tek tıkla koruyun.",
      subtitle:
        "ArnaqueScan, yapay zeka sayesinde sahte SMS'leri, kimlik avı e-postalarını ve şüpheli web sitelerini gerçek zamanlı olarak tespit eder.",
      soonOn: "Yakında",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Fiyatları gör",
      reassurance: "Taahhüt yok — Ücretsiz sürüm mevcut — GDPR uyumlu",
      socialProofUsers: "korunan kullanıcı",
    },
    reassurance: {
      contextLabel: "Fransa'daki durum",
      stats: [
        { value: "37 milyon", label: "2024 yılında Fransa'da gönderilen sahte SMS" },
        { value: "3 kişiden 1'i", label: "her yıl bir dolandırıcılık girişiminin hedefi oluyor" },
        { value: "2,7 milyar €", label: "Fransa'da her yıl çevrimiçi dolandırıcılıklara kaybediliyor" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic yapay zekası (Claude)" },
        { icon: "🔒", label: "SSL/TLS şifreleme" },
        { icon: "✅", label: "GDPR uyumlu" },
        { icon: "🏅", label: "INPI markası Sınıf 9 ve 42" },
      ],
    },
    faq: {
      label: "SSS",
      title: "Sıkça sorulan sorular",
      otherQuestion: "Başka bir sorunuz mu var?",
      contactUs: "Bize ulaşın",
      items: [
        {
          q: "Verilerim nasıl korunuyor?",
          a: "Verileriniz HTTPS/TLS üzerinden aktarım sırasında şifrelenir ve analiz süresinin ötesinde asla sunucularımızda saklanmaz. ArnaqueScan GDPR'a uyumludur: Hiçbir kişisel veri üçüncü taraflarla paylaşılmaz. Her analiz anonim ve güvenli bir şekilde işlenir.",
        },
        {
          q: "Yapay zeka dolandırıcılığı nasıl tespit ediyor?",
          a: "ArnaqueScan, dünyanın en gelişmiş yapay zeka modellerinden biri olan Anthropic'in Claude'unu kullanarak her mesajı 30'dan fazla kritere göre analiz eder: mesajın yapısı ve tonu, yapay aciliyet, makine çevirisine özgü dil bilgisi hataları, şüpheli URL'ler (yazım benzeri taklit alan adları, şüpheli alan adları, kısaltıcılar), yüksek tarifeli numaralar, kişisel veya bankacılık bilgileri için alışılmadık talepler, tanınmış markaların taklit edilmesi ve daha fazlası. Analiz bağlamsaldır: yapay zeka yalnızca anahtar kelimeleri değil, mesajın anlamını da anlar.",
        },
        {
          q: "Aboneliğimi kolayca iptal edebilir miyim?",
          a: "Evet, kesinlikle. Premium abonelik tamamen Apple'ın App Store'u üzerinden yönetilir. Ayarlar → [adınız] → Abonelikler → ArnaqueScan yolundan istediğiniz zaman iptal edebilirsiniz. Ceza yok, bekleme süresi yok. Zaten ödediğiniz dönemin sonuna kadar Premium erişiminizi korursunuz.",
        },
        {
          q: "Uygulama Android'de çalışıyor mu?",
          a: "ArnaqueScan yakında iOS ve Android'de (iPhone ve iPad, iOS 17+) kullanıma sunulacak. Lansmanda bilgilendirilmek için web sitemizden kaydolun. Bu arada, herhangi bir tarayıcıdan arnaquescan.vercel.app adresindeki web sürümünü kullanabilirsiniz.",
        },
        {
          q: "Marka neden INPI'de tescilli?",
          a: "ArnaqueScan markası, Fransız Ulusal Sınai Mülkiyet Enstitüsü (INPI) nezdinde 9. sınıf (yazılım, mobil uygulamalar) ve 42. sınıf (bilişim hizmetleri, siber güvenlik, SaaS) kapsamında resmi olarak tescillidir. Bu tescil, markayı taklitçilere karşı korur ve gerçek uygulamayı kullandığınızı garanti eder. Kullanıcıları kandırmak için sahte dolandırıcılık önleme araçlarının dolaştığı bir alanda, bu resmi belge ciddiyet ve meşruiyetin somut bir garantisidir.",
        },
      ],
    },
  },
  vi: {
    nav: {
      features: "Tính năng",
      pricing: "Bảng giá",
      faq: "Câu hỏi thường gặp",
      login: "Đăng nhập",
      appStoreSoon: "Sắp có trên App Store",
      androidSoon: "Sắp có trên Android",
      googlePlaySoon: "Sắp có trên Google Play",
    },
    hero: {
      badge: "Sắp có trên App Store · Nhãn hiệu đã đăng ký tại INPI",
      titlePre: "Bảo vệ người thân và dữ liệu của bạn khỏi",
      titleHighlight: "lừa đảo",
      titlePost: "chỉ với một cú nhấp chuột.",
      subtitle:
        "ArnaqueScan phát hiện SMS lừa đảo, email lừa đảo (phishing) và các trang web đáng ngờ theo thời gian thực nhờ AI.",
      soonOn: "Sắp có trên",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Xem bảng giá",
      reassurance: "Không ràng buộc — Có phiên bản miễn phí — Tuân thủ GDPR",
      socialProofUsers: "người dùng được bảo vệ",
    },
    reassurance: {
      contextLabel: "Bối cảnh tại Pháp",
      stats: [
        { value: "37 triệu", label: "tin nhắn SMS lừa đảo được gửi tại Pháp trong năm 2024" },
        { value: "1 trong 3 người", label: "là mục tiêu của một vụ lừa đảo mỗi năm" },
        { value: "2,7 tỷ €", label: "bị mất do lừa đảo trực tuyến mỗi năm tại Pháp" },
      ],
      trust: [
        { icon: "🤖", label: "AI Anthropic (Claude)" },
        { icon: "🔒", label: "Mã hóa SSL/TLS" },
        { icon: "✅", label: "Tuân thủ GDPR" },
        { icon: "🏅", label: "Nhãn hiệu INPI nhóm 9 & 42" },
      ],
    },
    faq: {
      label: "Câu hỏi thường gặp",
      title: "Câu hỏi thường gặp",
      otherQuestion: "Bạn có câu hỏi khác?",
      contactUs: "Liên hệ với chúng tôi",
      items: [
        {
          q: "Dữ liệu của tôi được bảo vệ như thế nào?",
          a: "Dữ liệu của bạn được mã hóa trong quá trình truyền qua HTTPS/TLS và không bao giờ được lưu trữ trên máy chủ của chúng tôi lâu hơn thời gian phân tích. ArnaqueScan tuân thủ GDPR: không có dữ liệu cá nhân nào được chia sẻ với bên thứ ba. Mỗi phân tích được xử lý một cách ẩn danh và an toàn.",
        },
        {
          q: "AI phát hiện lừa đảo như thế nào?",
          a: "ArnaqueScan sử dụng Claude của Anthropic — một trong những mô hình AI tiên tiến nhất thế giới — để phân tích từng tin nhắn dựa trên hơn 30 tiêu chí: cấu trúc và giọng điệu của tin nhắn, sự khẩn cấp giả tạo, lỗi ngữ pháp điển hình của dịch máy, URL đáng ngờ (giả mạo tên miền, tên miền đáng ngờ, dịch vụ rút gọn liên kết), số điện thoại tính phí cao, các yêu cầu bất thường về thông tin cá nhân hoặc ngân hàng, mạo danh các thương hiệu nổi tiếng, và nhiều hơn nữa. Việc phân tích dựa trên ngữ cảnh: AI hiểu ý nghĩa của tin nhắn, chứ không chỉ dựa vào từ khóa.",
        },
        {
          q: "Tôi có thể hủy đăng ký dễ dàng không?",
          a: "Có, chắc chắn rồi. Gói đăng ký Premium được quản lý hoàn toàn thông qua App Store của Apple. Bạn có thể hủy bất cứ lúc nào từ Cài đặt → [tên của bạn] → Đăng ký → ArnaqueScan. Không phạt, không thời gian chờ. Bạn vẫn giữ quyền truy cập Premium cho đến hết kỳ hạn đã thanh toán.",
        },
        {
          q: "Ứng dụng có hoạt động trên Android không?",
          a: "ArnaqueScan sẽ sớm có mặt trên iOS và Android (iPhone và iPad, iOS 17 trở lên). Đăng ký trên trang web của chúng tôi để được thông báo khi ra mắt. Trong thời gian chờ đợi, bạn có thể sử dụng phiên bản web tại arnaquescan.vercel.app từ bất kỳ trình duyệt nào.",
        },
        {
          q: "Tại sao nhãn hiệu lại được đăng ký tại INPI?",
          a: "Nhãn hiệu ArnaqueScan được đăng ký chính thức tại INPI (Viện Sở hữu Công nghiệp Quốc gia Pháp) thuộc các nhóm 9 (phần mềm, ứng dụng di động) và 42 (dịch vụ công nghệ thông tin, an ninh mạng, SaaS). Việc đăng ký này bảo vệ thương hiệu khỏi những kẻ làm giả và đảm bảo rằng bạn đang sử dụng ứng dụng chính hãng. Trong một lĩnh vực mà các công cụ chống lừa đảo giả mạo lưu hành để đánh lừa người dùng, chứng chỉ chính thức này là một bảo đảm cụ thể về sự nghiêm túc và tính hợp pháp.",
        },
      ],
    },
  },
  id: {
    nav: {
      features: "Fitur",
      pricing: "Harga",
      faq: "FAQ",
      login: "Masuk",
      appStoreSoon: "Segera hadir di App Store",
      androidSoon: "Android segera hadir",
      googlePlaySoon: "Segera hadir di Google Play",
    },
    hero: {
      badge: "Segera hadir di App Store · Merek terdaftar di INPI",
      titlePre: "Lindungi orang-orang terkasih dan data Anda dari",
      titleHighlight: "penipuan",
      titlePost: "hanya dengan satu klik.",
      subtitle:
        "ArnaqueScan mendeteksi SMS penipuan, email phishing, dan situs web yang mencurigakan secara real-time berkat AI.",
      soonOn: "Segera hadir di",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "Lihat harga",
      reassurance: "Tanpa kontrak — Tersedia versi gratis — Sesuai GDPR",
      socialProofUsers: "pengguna terlindungi",
    },
    reassurance: {
      contextLabel: "Situasi di Prancis",
      stats: [
        { value: "37 juta", label: "SMS penipuan dikirim di Prancis pada tahun 2024" },
        { value: "1 dari 3 orang", label: "menjadi sasaran upaya penipuan setiap tahun" },
        { value: "2,7 miliar €", label: "hilang akibat penipuan daring setiap tahun di Prancis" },
      ],
      trust: [
        { icon: "🤖", label: "AI Anthropic (Claude)" },
        { icon: "🔒", label: "Enkripsi SSL/TLS" },
        { icon: "✅", label: "Sesuai GDPR" },
        { icon: "🏅", label: "Merek INPI Kelas 9 & 42" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Pertanyaan yang sering diajukan",
      otherQuestion: "Punya pertanyaan lain?",
      contactUs: "Hubungi kami",
      items: [
        {
          q: "Bagaimana data saya dilindungi?",
          a: "Data Anda dienkripsi saat transmisi melalui HTTPS/TLS dan tidak pernah disimpan di server kami melebihi durasi analisis. ArnaqueScan sesuai dengan GDPR: tidak ada data pribadi yang dibagikan kepada pihak ketiga. Setiap analisis diproses secara anonim dan aman.",
        },
        {
          q: "Bagaimana AI mendeteksi penipuan?",
          a: "ArnaqueScan menggunakan Claude dari Anthropic — salah satu model AI paling canggih di dunia — untuk menganalisis setiap pesan berdasarkan lebih dari 30 kriteria: struktur dan nada pesan, urgensi buatan, kesalahan tata bahasa khas terjemahan mesin, URL mencurigakan (typosquatting, domain meragukan, pemendek tautan), nomor bertarif premium, permintaan yang tidak biasa untuk informasi pribadi atau perbankan, peniruan identitas merek terkenal, dan lainnya. Analisis ini bersifat kontekstual: AI memahami makna pesan, bukan hanya kata kunci.",
        },
        {
          q: "Apakah saya bisa membatalkan langganan dengan mudah?",
          a: "Ya, tentu saja. Langganan Premium sepenuhnya dikelola melalui App Store Apple. Anda dapat membatalkannya kapan saja dari Pengaturan → [nama Anda] → Langganan → ArnaqueScan. Tanpa denda, tanpa masa tunggu. Anda tetap memiliki akses Premium hingga akhir periode yang sudah dibayar.",
        },
        {
          q: "Apakah aplikasi ini berfungsi di Android?",
          a: "ArnaqueScan akan segera tersedia di iOS dan Android (iPhone dan iPad, iOS 17+). Daftar di situs web kami untuk mendapatkan pemberitahuan saat peluncuran. Sementara itu, Anda dapat menggunakan versi web di arnaquescan.vercel.app dari browser mana pun.",
        },
        {
          q: "Mengapa merek ini terdaftar di INPI?",
          a: "Merek ArnaqueScan resmi terdaftar di INPI (Institut Nasional Kekayaan Industri Prancis) di bawah kelas 9 (perangkat lunak, aplikasi seluler) dan 42 (layanan TI, keamanan siber, SaaS). Pendaftaran ini melindungi merek dari peniru dan menjamin bahwa Anda menggunakan aplikasi yang asli. Dalam bidang di mana alat anti-penipuan palsu beredar untuk menjebak pengguna, sertifikat resmi ini merupakan jaminan konkret atas keseriusan dan legitimasi.",
        },
      ],
    },
  },
  "zh-CN": {
    nav: {
      features: "功能",
      pricing: "价格",
      faq: "常见问题",
      login: "登录",
      appStoreSoon: "即将登陆 App Store",
      androidSoon: "安卓版即将推出",
      googlePlaySoon: "即将登陆 Google Play",
    },
    hero: {
      badge: "即将登陆 App Store · 已在法国工业产权局（INPI）注册商标",
      titlePre: "一键保护您的亲人和数据，远离",
      titleHighlight: "诈骗",
      titlePost: "。",
      subtitle:
        "ArnaqueScan 借助人工智能实时检测诈骗短信、钓鱼邮件和可疑网站。",
      soonOn: "即将登陆",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "查看价格",
      reassurance: "无需承诺 — 提供免费版本 — 符合 GDPR 规定",
      socialProofUsers: "位用户已获得保护",
    },
    reassurance: {
      contextLabel: "法国现状",
      stats: [
        { value: "3700 万条", label: "2024 年法国发送的诈骗短信数量" },
        { value: "三分之一的人", label: "每年遭受诈骗企图的目标" },
        { value: "27 亿欧元", label: "法国每年因网络诈骗造成的损失" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic AI（Claude）" },
        { icon: "🔒", label: "SSL/TLS 加密" },
        { icon: "✅", label: "符合 GDPR 规定" },
        { icon: "🏅", label: "INPI 商标 第 9 类和第 42 类" },
      ],
    },
    faq: {
      label: "常见问题",
      title: "常见问题",
      otherQuestion: "还有其他问题吗？",
      contactUs: "联系我们",
      items: [
        {
          q: "我的数据如何受到保护？",
          a: "您的数据在通过 HTTPS/TLS 传输时会被加密，分析完成后绝不会在我们的服务器上保留。ArnaqueScan 符合 GDPR 规定：不会与第三方共享任何个人数据。每次分析都以匿名和安全的方式进行处理。",
        },
        {
          q: "AI 如何检测诈骗？",
          a: "ArnaqueScan 使用 Anthropic 的 Claude —— 世界上最先进的人工智能模型之一 —— 根据 30 多项标准分析每条消息：消息的结构和语气、人为制造的紧迫感、机器翻译常见的语法错误、可疑网址（域名仿冒、可疑域名、短链接）、高资费号码、异常的个人或银行信息索取请求、冒充知名品牌等。这种分析是基于上下文的：AI 理解消息的含义，而不仅仅是关键词。",
        },
        {
          q: "我可以轻松取消订阅吗？",
          a: "当然可以。Premium 订阅完全通过 Apple App Store 管理。您可以随时通过「设置 → [您的姓名] → 订阅 → ArnaqueScan」取消订阅。无违约金，无等待期。您可以继续使用 Premium 功能，直至已付费周期结束。",
        },
        {
          q: "该应用支持安卓系统吗？",
          a: "ArnaqueScan 即将支持 iOS 和安卓系统（iPhone 和 iPad，iOS 17 及以上）。请在我们的网站上注册，以便在上线时收到通知。与此同时，您可以在任何浏览器中通过 arnaquescan.vercel.app 使用网页版。",
        },
        {
          q: "为什么商标要在 INPI 注册？",
          a: "ArnaqueScan 商标已正式在法国工业产权局（INPI）注册，涵盖第 9 类（软件、移动应用程序）和第 42 类（IT 服务、网络安全、SaaS）。此项注册可保护品牌免遭仿冒，并确保您使用的是正版应用程序。在虚假防诈骗工具泛滥、诱骗用户的领域，这份官方证书是严谨性和合法性的切实保证。",
        },
      ],
    },
  },
  "zh-TW": {
    nav: {
      features: "功能",
      pricing: "價格",
      faq: "常見問題",
      login: "登入",
      appStoreSoon: "即將登陸 App Store",
      androidSoon: "Android 版即將推出",
      googlePlaySoon: "即將登陸 Google Play",
    },
    hero: {
      badge: "即將登陸 App Store · 已於法國工業產權局（INPI）註冊商標",
      titlePre: "一鍵保護您的親人與資料，遠離",
      titleHighlight: "詐騙",
      titlePost: "。",
      subtitle:
        "ArnaqueScan 運用人工智慧即時偵測詐騙簡訊、釣魚郵件與可疑網站。",
      soonOn: "即將登陸",
      appStore: "App Store",
      googlePlay: "Google Play",
      pricingLink: "查看價格",
      reassurance: "無需承諾 — 提供免費版本 — 符合 GDPR 規範",
      socialProofUsers: "位用戶已受到保護",
    },
    reassurance: {
      contextLabel: "法國現況",
      stats: [
        { value: "3,700 萬則", label: "2024 年法國發送的詐騙簡訊數量" },
        { value: "三分之一的人", label: "每年成為詐騙企圖的目標" },
        { value: "27 億歐元", label: "法國每年因網路詐騙造成的損失" },
      ],
      trust: [
        { icon: "🤖", label: "Anthropic AI（Claude）" },
        { icon: "🔒", label: "SSL/TLS 加密" },
        { icon: "✅", label: "符合 GDPR 規範" },
        { icon: "🏅", label: "INPI 商標 第 9 類與第 42 類" },
      ],
    },
    faq: {
      label: "常見問題",
      title: "常見問題",
      otherQuestion: "還有其他問題嗎？",
      contactUs: "聯絡我們",
      items: [
        {
          q: "我的資料如何受到保護？",
          a: "您的資料在透過 HTTPS/TLS 傳輸時會被加密，分析完成後絕不會保留在我們的伺服器上。ArnaqueScan 符合 GDPR 規範：不會與第三方分享任何個人資料。每次分析都以匿名且安全的方式進行處理。",
        },
        {
          q: "AI 如何偵測詐騙？",
          a: "ArnaqueScan 使用 Anthropic 的 Claude —— 全球最先進的人工智慧模型之一 —— 根據超過 30 項標準分析每則訊息：訊息的結構與語氣、人為製造的急迫感、機器翻譯常見的文法錯誤、可疑網址（網域仿冒、可疑網域、短網址服務）、高資費號碼、異常的個人或銀行資料索取請求、冒充知名品牌等。此分析基於上下文：AI 理解訊息的含義，而不僅僅是關鍵字。",
        },
        {
          q: "我可以輕鬆取消訂閱嗎？",
          a: "當然可以。Premium 訂閱完全透過 Apple App Store 管理。您可以隨時透過「設定 → [您的姓名] → 訂閱 → ArnaqueScan」取消訂閱。無違約金，無等待期。您可以繼續使用 Premium 功能，直到已付費週期結束。",
        },
        {
          q: "該應用程式支援 Android 系統嗎？",
          a: "ArnaqueScan 即將支援 iOS 與 Android 系統（iPhone 與 iPad，iOS 17 及以上）。請在我們的網站上註冊，以便在上線時收到通知。與此同時，您可以在任何瀏覽器中透過 arnaquescan.vercel.app 使用網頁版。",
        },
        {
          q: "為什麼商標要在 INPI 註冊？",
          a: "ArnaqueScan 商標已正式於法國工業產權局（INPI）註冊，涵蓋第 9 類（軟體、行動應用程式）與第 42 類（IT 服務、網路安全、SaaS）。此項註冊可保護品牌免遭仿冒，並確保您使用的是正版應用程式。在假冒防詐騙工具氾濫、誘騙使用者的領域，這份官方證書是嚴謹性與合法性的具體保證。",
        },
      ],
    },
  },
};
