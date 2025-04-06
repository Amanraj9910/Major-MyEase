import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface DocumentPreviewProps {
  documentText: string;
  onCopy: () => void;
  onDownload: () => void;
  onNewDocument: () => void;
}

const DocumentPreview = ({ documentText, onCopy, onDownload, onNewDocument }: DocumentPreviewProps) => {
  const { t } = useTranslation(['common', 'documents']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={langClass}>{t('documents:generated_document')}</CardTitle>
            <CardDescription className={langClass}>{t('documents:review_document')}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onCopy}>
              <Copy className="mr-2 h-4 w-4" />
              {t('documents:copy')}
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              {t('documents:download')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {documentText}
          </pre>
        </div>
        
        <div className="mt-6 flex flex-col gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 dark:bg-amber-950/30 dark:border-amber-800/50">
            <h3 className={`text-amber-800 font-medium flex items-center gap-2 dark:text-amber-300 ${langClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              {t('documents:disclaimer')}
            </h3>
            <p className={`text-sm text-amber-700 mt-1 dark:text-amber-200/80 ${langClass}`}>
              {t('documents:disclaimer_text')}
            </p>
          </div>
          
          <Button onClick={onNewDocument}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('documents:create_new_document')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
