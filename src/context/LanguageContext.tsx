import React, { createContext, useCallback, useMemo, useState } from 'react';
import TRANSLATIONS, { type LanguageType } from '../config/translations';
import getFromLocal from '../utils/localStoregeUtils/getFromLocal';
import saveToLocal from '../utils/localStoregeUtils/saveToLocal';

interface LanguageContextProps {
  languages: LanguageType[];
  currentLanguage: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
  getTranslation: (key: string) => string;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = 'theweather-lang';
const LANGUAGES: LanguageType[] = Object.keys(TRANSLATIONS) as LanguageType[];

export const LanguageContext = createContext<LanguageContextProps>({
  languages: LANGUAGES,
  currentLanguage: LANGUAGES[0],
  changeLanguage: () => {},
  getTranslation: (key: string) => key,
});

function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(
    () => getFromLocal(LOCAL_STORAGE_KEY) || LANGUAGES[0]
  );

  const changeLanguage = useCallback((lang: LanguageType) => {
    saveToLocal(LOCAL_STORAGE_KEY, lang);
    setCurrentLanguage(lang);
  }, []);

  const getTranslation = useCallback(
    (key: string): string => {
      const textTranslated = TRANSLATIONS[currentLanguage]?.[key] || key;
      // Lists (__days, __months, ...) cannot be translated.
      if (typeof textTranslated === 'string') {
        return textTranslated;
      }
      return key;
    },
    [currentLanguage]
  );

  const value = useMemo(
    () => ({
      languages: LANGUAGES,
      currentLanguage,
      changeLanguage,
      getTranslation,
    }),
    [currentLanguage, changeLanguage, getTranslation]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
