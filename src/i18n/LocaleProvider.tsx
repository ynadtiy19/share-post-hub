import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { locales, localeHtmlLang, messages, type Locale } from "./messages";

const STORAGE_KEY = "qorange-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof messages)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) setLocale(stored);
  }, []);


  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = localeHtmlLang[locale];
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
