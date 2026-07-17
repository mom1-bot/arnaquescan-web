import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function SubscriptionSuccess() {
  return (
    <div className="bg-sand min-h-screen py-16">
      <Helmet>
        <title>Abonnement confirmé — ArnaqueScan</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-md mx-auto px-5 text-center">
        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-6"
          style={{ background: "#E4F5EB" }}
        >
          ✓
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Bienvenue dans ArnaqueScan Premium</h1>
        <p className="text-sm text-gray-500 mb-8">
          Votre paiement a été confirmé. Votre compte est mis à jour automatiquement
          — cela peut prendre quelques secondes.
        </p>
        <Link
          to="/analyser"
          className="inline-block px-6 py-3 bg-blue text-white rounded-xl text-sm font-semibold hover:bg-blue/90 transition-colors"
        >
          Commencer à analyser →
        </Link>
      </div>
    </div>
  );
}
