import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createElement } from "react";
import { DEFAULT_LANGUAGE, TRANSLATIONS, type Language, type Translations } from "../i18n/translations";

const STORAGE_KEY = "arnaquescan_lang";
const SUPPORTED_LANGUAGES: Language[] = ["fr", "en", "es", "nl", "de"];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(stored as Language) ? (stored as Language) : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: TRANSLATIONS[language] }),
    [language]
  );

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
