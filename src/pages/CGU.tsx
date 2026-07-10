import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function CGU() {
  return (
    <div className="bg-sand min-h-screen py-10">
      <Helmet>
        <title>Conditions Générales d'Utilisation — ArnaqueScan</title>
        <meta name="description" content="Conditions Générales d'Utilisation (CGU) de l'application et du site web ArnaqueScan." />
        <link rel="canonical" href="https://arnaquescan.fr/cgu" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Conditions Générales d'Utilisation</h1>
        <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : 10 juillet 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">1. Objet</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de
              l'application mobile et du site web ArnaqueScan (ci-après « le Service »), édités par Mohamed
              Tamih (Tamih Apps). En utilisant le Service, l'utilisateur accepte sans réserve les présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">2. Accès au service</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Le Service propose une offre gratuite, limitée à 3 analyses par mois, ainsi que des offres Premium
              donnant accès à des analyses illimitées et à des fonctionnalités additionnelles (historique,
              scanner QR code, export, support prioritaire, etc.). Les offres payantes sont détaillées sur la
              page{" "}
              <Link to="/abonnement" className="text-blue hover:underline">Abonnement</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">3. Responsabilité</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Les analyses produites par le Service reposent sur un traitement automatisé par intelligence
              artificielle et ont une valeur purement indicative. Elles ne constituent en aucun cas un avis
              juridique, une expertise professionnelle ou une garantie d'absence de fraude. L'utilisateur reste
              seul responsable des décisions prises sur la base des résultats fournis par le Service, et il lui
              est recommandé de faire preuve de prudence et, le cas échéant, de consulter les autorités
              compétentes en cas de doute sur une tentative d'arnaque.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">4. Données personnelles</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Le traitement des données personnelles collectées dans le cadre de l'utilisation du Service est
              effectué conformément au Règlement Général sur la Protection des Données (RGPD). L'utilisateur
              dispose d'un droit d'accès, de rectification, de suppression et d'opposition sur ses données,
              qu'il peut exercer en contactant{" "}
              <a href="mailto:officiel.compte0109@gmail.com" className="text-blue hover:underline">
                officiel.compte0109@gmail.com
              </a>. Pour plus de détails, consultez notre politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">5. Résiliation</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              L'utilisateur peut supprimer son compte à tout moment depuis son espace{" "}
              <Link to="/profil" className="text-blue hover:underline">Profil</Link>, entraînant la suppression
              de ses données associées conformément à la politique de confidentialité en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">6. Droit applicable</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou
              à leur exécution relève de la compétence des tribunaux français, sous réserve des dispositions
              légales impératives applicables aux consommateurs.
            </p>
          </section>

        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/mentions-legales" className="text-blue hover:underline font-medium">
            Consulter les mentions légales
          </Link>
        </p>
      </div>
    </div>
  );
}
