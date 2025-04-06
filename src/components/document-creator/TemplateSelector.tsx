import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DocumentTemplate from './DocumentTemplate';
import { DocumentTemplate as DocumentTemplateType } from '@/types/documents';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface TemplateSelectorProps {
  templates: DocumentTemplateType[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectTemplate: (template: DocumentTemplateType) => void;
}

const TemplateSelector = ({ 
  templates, 
  searchTerm, 
  onSearchChange, 
  onSelectTemplate 
}: TemplateSelectorProps) => {
  const { t } = useTranslation(['common', 'documents']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  return (
    <div>
      <div className="mb-6">
        <Label htmlFor="searchTemplates" className={langClass}>{t('documents:search_templates')}</Label>
        <Input
          id="searchTemplates"
          placeholder={t('documents:search_placeholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.length > 0 ? (
          templates.map((template) => (
            <DocumentTemplate 
              key={template.id} 
              template={template} 
              onSelect={onSelectTemplate} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className={`text-lg font-medium mb-2 ${langClass}`}>{t('documents:no_templates_found')}</h3>
            <p className={`text-muted-foreground ${langClass}`}>
              {t('documents:adjust_search')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
