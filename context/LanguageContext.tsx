
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import ptTranslations from '../locales/pt.js';
import enTranslations from '../locales/en.js';

type Language = 'pt' | 'en';

// Helper type for nested object access
type NestedStrings = { [key: string]: string | NestedStrings };

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const translations: { [key in Language]: NestedStrings } = {
    pt: ptTranslations,
    en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('pt');

    const t = useMemo(() => (key: string): string => {
        const keys = key.split('.');
        let result: string | NestedStrings | undefined = translations[language];
        
        for (const k of keys) {
            if (typeof result === 'object' && result !== null) {
                result = result[k];
            } else {
                result = undefined;
                break;
            }
        }
        
        // Fallback to Portuguese if key not found in current language
        if (result === undefined && language !== 'pt') {
             let fallbackResult: string | NestedStrings | undefined = translations.pt;
             for (const k of keys) {
                if (typeof fallbackResult === 'object' && fallbackResult !== null) {
                    fallbackResult = fallbackResult[k];
                } else {
                    fallbackResult = undefined;
                    break;
                }
            }
            if (typeof fallbackResult === 'string') {
                return fallbackResult;
            }
        }

        return typeof result === 'string' ? result : key;
    }, [language]);

    const value = {
        language,
        setLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
