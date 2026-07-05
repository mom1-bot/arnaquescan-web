import { Helmet } from "react-helmet-async";
import { LandingNavbar }      from "../landing/LandingNavbar";
import { HeroSection }        from "../landing/HeroSection";
import { ReassuranceSection } from "../landing/ReassuranceSection";
import { SimulatorSection }   from "../landing/SimulatorSection";
import { FeaturesSection }    from "../landing/FeaturesSection";
import { HowItWorksSection }  from "../landing/HowItWorksSection";
import { PricingSection }     from "../landing/PricingSection";
import { FAQSection }         from "../landing/FAQSection";
import { LandingFooter }      from "../landing/LandingFooter";

export default function Home() {
  return (
    <div className="bg-sand">
      <Helmet>
        <title>ArnaqueScan — Détectez les arnaques par SMS, email et QR code | IA Anti-Phishing</title>
        <meta name="description" content="Protégez-vous des arnaques en temps réel. ArnaqueScan analyse vos SMS, emails, liens et QR codes grâce à l'IA Anthropic. Marque déposée INPI. Essai gratuit 7 jours." />
        <meta name="keywords" content="arnaque, phishing, SMS arnaque, détection arnaque, anti-phishing, QR code sécurité, IA sécurité" />
        <link rel="canonical" href="https://arnaquescan.fr/" />
        <meta property="og:title" content="ArnaqueScan — Détectez les arnaques par SMS, email et QR code" />
        <meta property="og:description" content="Protégez-vous des arnaques en temps réel. Analysez vos SMS, emails, liens et QR codes grâce à l'IA Anthropic." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arnaquescan.fr/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ArnaqueScan — Détectez les arnaques par SMS, email et QR code" />
        <meta name="twitter:description" content="Protégez-vous des arnaques en temps réel. Analysez vos SMS, emails, liens et QR codes grâce à l'IA Anthropic." />
      </Helmet>
      <LandingNavbar />
      <HeroSection />
      <ReassuranceSection />
      <SimulatorSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <LandingFooter />
    </div>
  );
}
