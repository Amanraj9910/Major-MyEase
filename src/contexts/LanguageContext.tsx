import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

// Define the context type
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (code: string) => void;
  languages: typeof languages;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
  languages,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Change language handler
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  // Update state when i18n language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Font settings based on language
  useEffect(() => {
    // Apply different font settings for different scripts if needed
    const html = document.documentElement;
    
    // Reset any previously applied classes
    html.classList.remove(
      'lang-hi', 'lang-bn', 'lang-te', 'lang-ta', 
      'lang-gu', 'lang-kn', 'lang-ml', 'lang-pa', 
      'lang-mr', 'lang-as', 'lang-or', 'lang-ur'
    );
    
    // Add language-specific class
    if (currentLanguage !== 'en') {
      html.classList.add(`lang-${currentLanguage}`);
    }

    // Set HTML lang attribute for accessibility and SEO
    html.setAttribute('lang', currentLanguage);
    
    // Add direction attribute for RTL languages (like Urdu)
    if (currentLanguage === 'ur') {
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 