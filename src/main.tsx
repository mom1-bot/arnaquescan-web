import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
import { LanguageProvider } from "./hooks/useLanguage";
import "./index.css";
import App from "./App";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0 });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sentry.ErrorBoundary
      fallback={
        <div className="bg-sand min-h-screen flex items-center justify-center px-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900 mb-2">Une erreur est survenue</p>
            <p className="text-sm text-gray-500 mb-5">Rechargez la page pour continuer.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-blue text-white rounded-xl text-sm font-semibold hover:bg-blue/90 transition-colors"
            >
              Recharger
            </button>
          </div>
        </div>
      }
    >
      <HelmetProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </HelmetProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
