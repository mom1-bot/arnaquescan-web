import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <div className="bg-sand min-h-screen py-10">
      <Helmet>
        <title>Mentions légales — ArnaqueScan</title>
        <meta name="description" content="Mentions légales du site ArnaqueScan : éditeur, hébergement et propriété intellectuelle." />
        <link rel="canonical" href="https://arnaquescan.fr/mentions-legales" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Mentions légales</h1>
        <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : 10 juillet 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Éditeur du site</h2>
            <div className="text-sm text-gray-700 leading-relaxed space-y-1">
              <p><strong>Mohamed Tamih</strong> — Tamih Apps</p>
              <p>403 Chemin des Ribes, 13560 Sénas, France</p>
              <p>
                Email :{" "}
                <a href="mailto:officiel.compte0109@gmail.com" className="text-blue hover:underline">
                  officiel.compte0109@gmail.com
                </a>
              </p>
              <p>
                Site :{" "}
                <a href="https://arnaquescan.fr" className="text-blue hover:underline">
                  arnaquescan.fr
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Hébergement</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, San Francisco, USA.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Propriété intellectuelle</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              La marque « ArnaqueScan » est déposée auprès de l'Institut National de la Propriété Industrielle
              (INPI) dans les classes 9 et 42. Toute reproduction ou utilisation non autorisée de la marque,
              du logo ou des contenus du site est interdite sans accord préalable de l'éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Contact</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Pour toute question relative au site ou à son contenu, vous pouvez nous contacter à l'adresse{" "}
              <a href="mailto:officiel.compte0109@gmail.com" className="text-blue hover:underline">
                officiel.compte0109@gmail.com
              </a>.
            </p>
          </section>

        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/cgu" className="text-blue hover:underline font-medium">
            Consulter les Conditions Générales d'Utilisation
          </Link>
        </p>
      </div>
    </div>
  );
}
