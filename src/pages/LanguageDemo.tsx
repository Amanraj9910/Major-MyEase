import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslationExample from '@/components/TranslationExample';

const LanguageDemo: React.FC = () => {
  const { t } = useTranslation('common');
  const { currentLanguage, languages } = useLanguage();
  
  // Find current language details
  const currentLangObj = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <>
      <Helmet>
        <title>{t('language')} | MyEase</title>
        {/* Add hreflang attributes for SEO */}
        <link rel="alternate" hrefLang="en" href="https://myease.com/en/language-demo" />
        <link rel="alternate" hrefLang="hi" href="https://myease.com/hi/language-demo" />
        <link rel="alternate" hrefLang="mr" href="https://myease.com/mr/language-demo" />
        <link rel="alternate" hrefLang="bn" href="https://myease.com/bn/language-demo" />
        <link rel="alternate" hrefLang="gu" href="https://myease.com/gu/language-demo" />
        <link rel="alternate" hrefLang="ta" href="https://myease.com/ta/language-demo" />
        <link rel="alternate" hrefLang="te" href="https://myease.com/te/language-demo" />
        <link rel="alternate" hrefLang="kn" href="https://myease.com/kn/language-demo" />
        <link rel="alternate" hrefLang="ml" href="https://myease.com/ml/language-demo" />
        <link rel="alternate" hrefLang="pa" href="https://myease.com/pa/language-demo" />
        <link rel="alternate" hrefLang="as" href="https://myease.com/as/language-demo" />
        <link rel="alternate" hrefLang="or" href="https://myease.com/or/language-demo" />
        <link rel="alternate" hrefLang="ur" href="https://myease.com/ur/language-demo" />
        <meta name="description" content={t('site_description')} />
      </Helmet>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className={`text-4xl font-bold mb-4 lang-${currentLanguage}`}>
              {t('language')} Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              This page demonstrates multilingual support across Indian languages
            </p>
          </div>

          <div className="mb-10 p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">Current Language Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p><strong>Language Code:</strong> {currentLanguage}</p>
                <p><strong>Language Name:</strong> {currentLangObj.name}</p>
                <p><strong>Native Name:</strong> {currentLangObj.nativeName}</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p><strong>Direction:</strong> {document.dir}</p>
                <p><strong>HTML lang attribute:</strong> {document.documentElement.lang}</p>
                <p>
                  <strong>Font:</strong> {' '}
                  {currentLanguage === 'en' 
                    ? 'Noto Sans' 
                    : `Noto Sans ${currentLangObj.name}`}
                </p>
              </div>
            </div>
          </div>

          <TranslationExample />
        </div>
      </main>
    </>
  );
};

export default LanguageDemo;