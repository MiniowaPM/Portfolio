import { createContext } from 'react';

export type Locale = 'en' | 'pl';

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);
