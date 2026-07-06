import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n/translations";
import { useLanguage } from "../hooks/useLanguage";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Choisir la langue"
        aria-expanded={open}
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 pl-2.5 pr-2 py-2 rounded-xl text-sm font-semibold transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <span className={`text-[10px] text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 min-w-[130px] z-50">
          {LANGUAGES.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code);
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2 text-sm font-medium text-left transition-colors ${
                code === language ? "text-blue bg-blue/5" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-base leading-none">{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
