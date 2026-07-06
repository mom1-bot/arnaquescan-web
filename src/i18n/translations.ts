export type Language = "fr" | "en" | "es" | "nl" | "de";

export interface LanguageOption {
  code: Language;
  flag: string;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "nl", flag: "🇳🇱", label: "NL" },
  { code: "de", flag: "🇩🇪", label: "DE" },
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
};
