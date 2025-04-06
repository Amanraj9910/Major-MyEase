import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const TranslationExample: React.FC = () => {
  const { t } = useTranslation(['common', 'home']);
  const { currentLanguage } = useLanguage();

  // Helper to add the current language class to elements
  const langClass = `lang-${currentLanguage}`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className={`text-4xl font-bold mb-6 ${langClass}`}>
        {t('common:welcome')}
      </h1>
      
      <p className={`text-lg mb-8 ${langClass}`}>
        {t('common:site_description')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className={langClass}>{t('home:feature_1_title')}</CardTitle>
            <CardDescription className={langClass}>{t('home:feature_1_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-accent rounded-md flex items-center justify-center">
              <span className="text-accent-foreground">1</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{t('common:learn_more')}</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className={langClass}>{t('home:feature_2_title')}</CardTitle>
            <CardDescription className={langClass}>{t('home:feature_2_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-accent rounded-md flex items-center justify-center">
              <span className="text-accent-foreground">2</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{t('common:learn_more')}</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className={langClass}>{t('home:feature_3_title')}</CardTitle>
            <CardDescription className={langClass}>{t('home:feature_3_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-accent rounded-md flex items-center justify-center">
              <span className="text-accent-foreground">3</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{t('common:learn_more')}</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-muted p-8 rounded-lg text-center">
        <h2 className={`text-2xl font-bold mb-4 ${langClass}`}>{t('home:section_cta_title')}</h2>
        <p className={`mb-6 ${langClass}`}>{t('home:section_cta_description')}</p>
        <Button size="lg">{t('home:section_cta_button')}</Button>
      </div>
      
      <div className="mt-12 p-4 border rounded-md bg-card">
        <h3 className="text-xl font-medium mb-4">Current Language: {currentLanguage}</h3>
        <p className="text-muted-foreground">
          This example demonstrates how content dynamically updates based on the selected language.
          Try changing the language using the language switcher in the navbar.
        </p>
      </div>
    </div>
  );
};

export default TranslationExample; 