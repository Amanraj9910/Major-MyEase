import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProcessStepsProps {
  processData: {
    steps: {
      title: string;
      description: string;
      documents?: string[];
      timeframe?: string;
      fees?: string;
      tips?: string;
    }[];
    overview: string;
  };
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ processData }) => {
  const { t } = useTranslation('process'); // Use the 'process' namespace
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  // Added check for processData to prevent errors if it's null/undefined initially
  if (!processData) {
    return null; // Or return a loading indicator or placeholder
  }

  return (
    <div className="space-y-8">
      <div className="bg-muted p-6 rounded-lg">
        <h2 className={`text-2xl font-bold mb-3 ${langClass}`}>{processData.overview}</h2>
      </div>

      <div className="space-y-6">
        {processData.steps.map((step, index) => (
          <div key={index} className="bg-card border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {index + 1}
              </div>
              <div className="space-y-3 flex-1">
                <h3 className={`text-xl font-semibold ${langClass}`}>{step.title}</h3>
                <p className={`text-foreground/80 ${langClass}`}>{step.description}</p>

                {step.documents && step.documents.length > 0 && (
                  <div className="mt-4">
                    {/* Use translation key */}
                    <h4 className={`text-sm font-medium mb-2 ${langClass}`}>{t('required_documents')}:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {step.documents.map((doc, idx) => (
                        <li key={idx} className={`text-sm text-foreground/80 ${langClass}`}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {step.timeframe && (
                    <div className="bg-muted rounded-md p-3">
                      {/* Use translation key */}
                      <h4 className={`text-xs font-medium mb-1 ${langClass}`}>{t('timeframe')}</h4>
                      <p className={`text-sm ${langClass}`}>{step.timeframe}</p>
                    </div>
                  )}

                  {step.fees && (
                    <div className="bg-muted rounded-md p-3">
                      {/* Use translation key */}
                      <h4 className={`text-xs font-medium mb-1 ${langClass}`}>{t('fees')}</h4>
                      <p className={`text-sm ${langClass}`}>{step.fees}</p>
                    </div>
                  )}

                  {step.tips && (
                    <div className="bg-muted rounded-md p-3">
                      {/* Use translation key */}
                      <h4 className={`text-xs font-medium mb-1 ${langClass}`}>{t('tips')}</h4>
                      <p className={`text-sm ${langClass}`}>{step.tips}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
