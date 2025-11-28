
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { en, hi } from '../locales/translations';

type Language = 'en' | 'hi';
type TranslationValue = string | string[];
type Translations = { [key: string]: TranslationValue };

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => TranslationValue;
}

const translations: { [key in Language]: Translations } = { en, hi };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'hi')) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  const t = useCallback((key: string): TranslationValue => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);

  const value = { language, setLanguage: handleSetLanguage, t };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
