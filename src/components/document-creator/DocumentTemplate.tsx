import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentTemplate as DocumentTemplateType } from '@/types/documents';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface DocumentTemplateProps {
  template: DocumentTemplateType;
  onSelect: (template: DocumentTemplateType) => void;
}

const DocumentTemplate = ({ template, onSelect }: DocumentTemplateProps) => {
  const { t } = useTranslation(['common', 'documents']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelect(template)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={langClass}>{template.name}</CardTitle>
            <CardDescription className={langClass}>{template.description}</CardDescription>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {template.type}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm text-muted-foreground ${langClass}`}>
          {t('documents:fields_to_fill', { count: template.fields.length })}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          {t('documents:use_template')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentTemplate;
