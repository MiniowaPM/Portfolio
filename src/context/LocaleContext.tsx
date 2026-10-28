import React, { useEffect, useState } from 'react';
import { LocaleContext, type Locale } from './localeContextDef';

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('portfolio_locale') as Locale | null;
    if (saved === 'en' || saved === 'pl') {
      return saved;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'en' ? 'pl' : 'en'));
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
