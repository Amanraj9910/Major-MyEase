
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

const DocumentCreator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [searchTerm, setSearchTerm] = useState('');

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
        title: "Missing Information",
        description: `Please fill in the following fields: ${missingFields.join(', ')}`,
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
          title: "Document Generated",
          description: "Your document has been successfully generated."
        });
      })
      .catch(error => {
        console.error('Error generating document:', error);
        toast({
          title: "Generation Failed",
          description: "An error occurred while generating your document. Please try again.",
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
      title: "Copied",
      description: "Document copied to clipboard"
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
      title: "Downloaded",
      description: "Document downloaded successfully"
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
              Back to Home
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Document <span className="text-gradient">Creator</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-center mb-8">
              Generate legally formatted documents for various administrative and personal needs
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="templates" disabled={isGenerating}>
                  1. Select Template
                </TabsTrigger>
                <TabsTrigger value="form" disabled={!selectedTemplate || isGenerating}>
                  2. Fill Details
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={!generatedDocument || isGenerating}>
                  3. Preview & Download
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
