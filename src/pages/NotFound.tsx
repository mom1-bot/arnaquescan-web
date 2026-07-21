import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-sand min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Helmet>
        <title>Page introuvable — ArnaqueScan</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center max-w-sm">
        <div className="text-6xl font-black text-blue mb-4">404</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Page introuvable</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Cette page n'existe pas ou a été déplacée. Vérifiez l'adresse ou retournez à l'accueil.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue text-white rounded-xl font-bold text-sm hover:bg-blue/90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
