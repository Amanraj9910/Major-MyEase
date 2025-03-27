
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DocumentTemplate from './DocumentTemplate';
import { DocumentTemplate as DocumentTemplateType } from '@/types/documents';

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
  return (
    <div>
      <div className="mb-6">
        <Label htmlFor="searchTemplates">Search Templates</Label>
        <Input
          id="searchTemplates"
          placeholder="Search by name, description or type..."
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
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
