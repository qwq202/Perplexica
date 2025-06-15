'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          console.error(`Failed to load ${language}.json`);
          // Fallback to English if the language file is not found
          const enResponse = await fetch(`/locales/en.json`);
          const enData = await enResponse.json();
          setTranslations(enData);
          return;
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English on any error
        try {
            const enResponse = await fetch(`/locales/en.json`);
            const enData = await enResponse.json();
            setTranslations(enData);
        } catch (e) {
            console.error('Error loading fallback English translations:', e);
        }
      }
    };

    fetchTranslations();
  }, [language]);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = useCallback((key: string): string => {
    return translations[key] || key;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};