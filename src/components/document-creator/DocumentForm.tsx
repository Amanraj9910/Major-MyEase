import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';
import { DocumentTemplate } from '@/types/documents';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface DocumentFormProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

const DocumentForm = ({ 
  template, 
  formData, 
  onInputChange, 
  onGenerate, 
  onBack, 
  isGenerating 
}: DocumentFormProps) => {
  const { t } = useTranslation(['common', 'documents']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={langClass}>{template.name}</CardTitle>
        <CardDescription className={langClass}>{t('documents:fill_details')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onGenerate(); }}>
          {template.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className={langClass}>
                {field.label}{field.required && <span className="text-red-500">*</span>}
              </Label>
              
              {field.type === 'text' && (
                <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                />
              )}
              
              {field.type === 'textarea' && (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  rows={3}
                />
              )}
              
              {field.type === 'select' && field.options && (
                <Select
                  value={formData[field.name] || ''}
                  onValueChange={(value) => onInputChange(field.name, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('documents:select_option')} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
          
          <div className="pt-4 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              {t('documents:back_to_templates')}
            </Button>
            <Button
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('documents:generating')}
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t('documents:generate_document')}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
