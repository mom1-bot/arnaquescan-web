import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../hooks/useLanguage";

export function FAQSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a,
      },
    })),
  };

  return (
    <section id="faq" className="bg-sand py-16 lg:py-24">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(FAQ_JSON_LD)}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">{t.faq.label}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {t.faq.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  isOpen ? "border-blue/30 shadow-sm shadow-blue/5" : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`font-semibold text-sm leading-snug ${isOpen ? "text-blue" : "text-gray-900"}`}>
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                      isOpen
                        ? "bg-blue border-blue text-white rotate-45"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            {t.faq.otherQuestion}{" "}
            <a href="mailto:contact@arnaquescan.fr" className="text-blue hover:underline font-medium">
              {t.faq.contactUs}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
