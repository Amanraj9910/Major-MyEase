import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateSelector from '@/components/document-creator/TemplateSelector';
import DocumentForm from '@/components/document-creator/DocumentForm';
import DocumentPreview from '@/components/document-creator/DocumentPreview';
import { documentTemplates, generateDocument } from '@/services/documentService';
import { DocumentTemplate } from '@/types/documents';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet';

const DocumentCreator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation(['common', 'documents']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  const filteredTemplates = documentTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedDocument('');
    setActiveTab('form');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateDocument = () => {
    if (!selectedTemplate) return;
    
    // Basic validation
    const missingFields = selectedTemplate.fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label);
    
    if (missingFields.length > 0) {
      toast({
        title: t('documents:missing_information'),
        description: t('documents:please_fill_fields', { fields: missingFields.join(', ') }),
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    generateDocument(selectedTemplate, formData)
      .then(docText => {
        setGeneratedDocument(docText);
        setActiveTab('preview');
        
        toast({
          title: t('documents:document_generated'),
          description: t('documents:document_success')
        });
      })
      .catch(error => {
        console.error('Error generating document:', error);
        toast({
          title: t('documents:generation_failed'),
          description: t('documents:generation_error'),
          variant: "destructive"
        });
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const handleCopyDocument = () => {
    navigator.clipboard.writeText(generatedDocument);
    toast({
      title: t('documents:copied'),
      description: t('documents:copied_to_clipboard')
    });
  };

  const handleDownloadDocument = () => {
    const blob = new Blob([generatedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate?.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: t('documents:downloaded'),
      description: t('documents:download_success')
    });
  };

  const handleNewDocument = () => {
    setSelectedTemplate(null);
    setFormData({});
    setGeneratedDocument('');
    setActiveTab('templates');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('documents:document_creator')} | MyEase</title>
        <meta name="description" content={t('documents:meta_description')} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto"
        >
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common:back_to_home')}
            </Button>
            
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 text-center ${langClass}`}>
              {t('documents:document')} <span className="text-gradient">{t('documents:creator')}</span>
            </h1>
            <p className={`text-lg text-foreground/70 max-w-2xl mx-auto text-center mb-8 ${langClass}`}>
              {t('documents:page_description')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="templates" disabled={isGenerating} className={langClass}>
                  {t('documents:step_1_template')}
                </TabsTrigger>
                <TabsTrigger value="form" disabled={!selectedTemplate || isGenerating} className={langClass}>
                  {t('documents:step_2_details')}
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={!generatedDocument || isGenerating} className={langClass}>
                  {t('documents:step_3_preview')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates">
                <TemplateSelector 
                  templates={filteredTemplates}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onSelectTemplate={handleTemplateSelect}
                />
              </TabsContent>
              
              <TabsContent value="form">
                {selectedTemplate && (
                  <DocumentForm 
                    template={selectedTemplate}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onGenerate={handleGenerateDocument}
                    onBack={() => setActiveTab('templates')}
                    isGenerating={isGenerating}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="preview">
                {generatedDocument && (
                  <DocumentPreview 
                    documentText={generatedDocument}
                    onCopy={handleCopyDocument}
                    onDownload={handleDownloadDocument}
                    onNewDocument={handleNewDocument}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentCreator;
