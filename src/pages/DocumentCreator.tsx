import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { documentTemplates, generateDocumentText } from '@/services/documentService';
import { DocumentTemplate, DocumentField } from '@/types/documents';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Download, AlertCircle, FileText, Info, Filter, FileWarning, BookCheck, FileCheck, FileOutput, FileType, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Dynamically import jsPDF for client-side only
let jsPDF: any;
if (typeof window !== 'undefined') {
  import('jspdf').then(module => {
    jsPDF = module.default;
  });
}

// Lazy load the PDF components to improve initial load time
const DocumentPdfPreview = lazy(() => import('@/components/document-creator/DocumentPdfPreview'));
const PdfLoadingFallback = lazy(() => import('@/components/document-creator/PdfLoadingFallback'));

const DocumentCreator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'text' | 'pdf'>('text');
  const { t } = useTranslation(['common', 'documents']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;
  const { toast } = useToast();
  const [isBrowser, setIsBrowser] = useState(false);

  // Check if we're in the browser
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const selectedTemplate = useMemo(() => 
    documentTemplates.find(t => t.id === selectedTemplateId)
  , [selectedTemplateId]);

  // Reset form and generated document when template changes
  useEffect(() => {
    setFormData({});
    setGeneratedDocument('');
    if (selectedTemplate) {
      // Initialize form data with default values
      const initialData: Record<string, string> = {};
      selectedTemplate.fields.forEach(field => {
        initialData[field.name] = field.defaultValue || '';
      });
      setFormData(initialData);
    }
  }, [selectedTemplate]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    
    // Basic validation
    const missingRequiredFields = selectedTemplate.fields
      .filter(field => field.required && (!formData[field.name] || formData[field.name].trim() === ''))
      .map(field => field.label);
    
    if (missingRequiredFields.length > 0) {
      toast({
        title: "Missing required fields", 
        description: `Please fill in: ${missingRequiredFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const text = await generateDocumentText(selectedTemplate, formData);
      setGeneratedDocument(text);
      toast({ title: 'Document Generated', description: 'Preview updated below.' });
      // Switch to preview tab automatically
        setActiveTab('preview');
    } catch (error) {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
      setGeneratedDocument('Error generating document.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(generatedDocument)
        .then(() => toast({ title: 'Copied to Clipboard' }))
        .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
    }
  };

  const handleDownload = () => {
    if (!selectedTemplate || typeof document === 'undefined') return;
    
    const blob = new Blob([generatedDocument], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedTemplate.name.replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: 'Download Started', description: 'Document saved as a text file.' });
  };

  // Alternative method for PDF generation using jsPDF
  const handleDownloadPDF = () => {
    if (!selectedTemplate || !generatedDocument || !jsPDF || typeof window === 'undefined') {
      toast({ 
        title: 'PDF Generation Error', 
        description: 'PDF generation is only available in browser environments.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const doc = new jsPDF();
      const title = selectedTemplate.name;
      
      // Add title
      doc.setFontSize(16);
      doc.text(title, 105, 20, { align: 'center' });
      
      // Add content
      doc.setFontSize(12);
      
      // Split text to handle pagination
      const textLines = doc.splitTextToSize(generatedDocument, 180);
      doc.text(textLines, 15, 40);
      
      // Add footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text('This document was generated using MyEase Document Creator. For personal or informal use only.', 105, 280, { align: 'center' });
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
      }
      
      // Save the PDF
      doc.save(`${title.replace(/\s+/g, '-')}-${Date.now()}.pdf`);
      
      toast({ 
        title: 'PDF Download Started', 
        description: 'Document saved as a PDF file.'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    toast({
        title: 'PDF Generation Failed', 
        description: 'There was an error creating your PDF. Please try again.',
        variant: 'destructive'
    });
    }
  };

  const handleNewDocument = () => {
    setSelectedTemplateId(null);
    setFormData({});
    setGeneratedDocument('');
    setActiveTab('templates');
  };

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const types = documentTemplates.map(template => template.type);
    return ['All', ...new Set(types)];
  }, []);

  // Filter templates by search term and category
  const filteredTemplates = useMemo(() => {
    return documentTemplates.filter(template => {
      const matchesSearch = 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || categoryFilter === 'All' || template.type === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  // Compute progress step
  const getProgressStep = () => {
    if (activeTab === 'templates') return 1;
    if (activeTab === 'form') return 2;
    if (activeTab === 'preview') return 3;
    return 1;
  };
  
  const progressStep = getProgressStep();

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
            <p className={`text-lg text-foreground/70 max-w-2xl mx-auto text-center mb-4 ${langClass}`}>
              {t('documents:page_description')}
            </p>
            
            <Alert variant="warning" className="max-w-3xl mx-auto mb-8 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800">
              <FileWarning className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <AlertTitle className="text-orange-800 dark:text-orange-300 font-semibold text-base">Legal Disclaimer</AlertTitle>
              <AlertDescription className="text-orange-700 dark:text-orange-400 text-sm">
                <p className="font-medium mb-1">These documents are for personal or informal use only.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>They do not replace professionally drafted legal documents</li>
                  <li>May not be suitable for official purposes requiring government validation</li>
                  <li>No legal liability is assumed for the accuracy or completeness of these templates</li>
                  <li>For important legal matters, consult with a qualified legal professional</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          
          {/* Progress indicator */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="flex justify-between mb-2">
                <div className="text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${progressStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    1
                  </div>
                  <div className={`text-xs mt-1 ${progressStep >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    Select Template
                  </div>
                </div>
                <div className="text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${progressStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    2
                  </div>
                  <div className={`text-xs mt-1 ${progressStep >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    Fill Details
                  </div>
                </div>
                <div className="text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${progressStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    3
                  </div>
                  <div className={`text-xs mt-1 ${progressStep >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    Preview & Download
                  </div>
                </div>
              </div>
              <div className="absolute top-5 left-0 right-0 flex-1 mx-12">
                <div className="overflow-hidden h-1 flex">
                  <div className={`bg-primary h-full ${progressStep >= 2 ? 'w-1/2' : 'w-0'} transition-all duration-500`}></div>
                  <div className={`bg-primary h-full ${progressStep >= 3 ? 'w-1/2' : 'w-0'} transition-all duration-500`}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="templates" disabled={isLoading} className={langClass}>
                  {t('documents:step_1_template')}
                </TabsTrigger>
                <TabsTrigger value="form" disabled={!selectedTemplate || isLoading} className={langClass}>
                  {t('documents:step_2_details')}
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={!generatedDocument || isLoading} className={langClass}>
                  {t('documents:step_3_preview')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Select a Document Template</span>
                      <Badge variant="outline" className="ml-2">
                        {filteredTemplates.length} Templates
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Choose from our collection of document templates for various personal and business needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <Label htmlFor="search-templates" className="mb-2 block text-sm">
                          Search Templates
                        </Label>
                        <div className="relative">
                          <Input
                            id="search-templates"
                            placeholder="Search for templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                          <span className="absolute left-3 top-2.5 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="category-filter" className="mb-2 block text-sm">
                          Filter by Category
                        </Label>
                        <Select value={categoryFilter || 'All'} onValueChange={value => setCategoryFilter(value === 'All' ? null : value)}>
                          <SelectTrigger id="category-filter" className="w-[180px]">
                            <span className="flex items-center">
                              <Filter className="mr-2 h-4 w-4" />
                              <SelectValue placeholder="All Categories" />
                            </span>
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTemplates.length > 0 ? (
                        <>
                          {/* College Documents Section */}
                          <div className="col-span-1 md:col-span-2 mt-2 mb-2">
                            <h3 className="text-lg font-semibold text-primary flex items-center mb-2">
                              <GraduationCap className="mr-2 h-5 w-5" />
                              College Documents
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredTemplates
                                .filter(template => template.type === 'College')
                                .map(template => (
                                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow border-muted hover:border-primary/50"
                                    onClick={() => {
                                      setSelectedTemplateId(template.id);
                                      setActiveTab('form');
                                    }}>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-base flex justify-between items-start">
                                        <span className="flex items-center">
                                          <FileCheck className="mr-2 h-4 w-4 text-primary" />
                                          {template.name}
                                        </span>
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                          College
                                        </Badge>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                      <p className="text-sm text-muted-foreground">{template.description}</p>
                                    </CardContent>
                                  </Card>
                                ))}
                            </div>
                          </div>

                          {/* Other Documents Section */}
                          <div className="col-span-1 md:col-span-2 mt-4 mb-2">
                            <h3 className="text-lg font-semibold text-primary flex items-center mb-2">
                              <FileText className="mr-2 h-5 w-5" />
                              Other Documents
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredTemplates
                                .filter(template => template.type !== 'College')
                                .map(template => (
                                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow border-muted hover:border-primary/50"
                                    onClick={() => {
                                      setSelectedTemplateId(template.id);
                                      setActiveTab('form');
                                    }}>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-base flex justify-between items-start">
                                        <span className="flex items-center">
                                          <FileCheck className="mr-2 h-4 w-4 text-primary" />
                                          {template.name}
                                        </span>
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                          {template.type}
                                        </Badge>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                      <p className="text-sm text-muted-foreground">{template.description}</p>
                                    </CardContent>
                                  </Card>
                                ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2 p-8 text-center">
                          <FileWarning className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No templates found</h3>
                          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="form">
                {selectedTemplate && (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            <FileCheck className="mr-2 h-5 w-5 text-primary" />
                            {selectedTemplate.name}
                          </CardTitle>
                          <CardDescription>{selectedTemplate.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{selectedTemplate.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2">
                          {selectedTemplate.fields.map(field => (
                            <div key={field.name} className="grid gap-1.5">
                              <Label htmlFor={field.name}>
                                {field.label} {field.required && <span className="text-destructive">*</span>}
                              </Label>
                              {field.type === 'textarea' ? (
                                <Textarea
                                  id={field.name}
                                  value={formData[field.name] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  placeholder={field.placeholder}
                                  required={field.required}
                                  rows={4}
                                  className="resize-none"
                                />
                              ) : field.type === 'select' ? (
                                <Select
                                  value={formData[field.name] || ''}
                                  onValueChange={(val) => handleInputChange(field.name, val)}
                                  required={field.required}
                                >
                                  <SelectTrigger id={field.name}>
                                    <SelectValue placeholder={field.placeholder || 'Select an option'} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map(option => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : field.type === 'date' ? (
                                <Input
                                  id={field.name}
                                  type="date"
                                  value={formData[field.name] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  required={field.required}
                                />
                              ) : field.type === 'number' ? (
                                <Input
                                  id={field.name}
                                  type="number"
                                  value={formData[field.name] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  placeholder={field.placeholder}
                                  required={field.required}
                                />
                              ) : (
                                <Input
                                  id={field.name}
                                  type="text"
                                  value={formData[field.name] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  placeholder={field.placeholder}
                                  required={field.required}
                                />
                              )}
                              {field.placeholder && !field.required && (
                                <p className="text-xs text-muted-foreground">Optional</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </form>
                    </CardContent>
                    {selectedTemplate.disclaimer && (
                      <CardFooter className="flex-col items-start">
                        <Alert variant="default" className="w-full bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
                          <BookCheck className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          <AlertTitle className="text-yellow-800 dark:text-yellow-300 font-semibold">Template-Specific Information</AlertTitle>
                          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                            {selectedTemplate.disclaimer}
                          </AlertDescription>
                        </Alert>
                      </CardFooter>
                    )}
                    <CardFooter className="flex justify-between pt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('templates')}
                      >
                        Back to Templates
                      </Button>
                      <Button 
                        onClick={handleGenerate}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Generating...' : 'Generate Document'}
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="preview">
                {generatedDocument && selectedTemplate && (
                  <Card>
                    <CardHeader>
                      <div>
                        <CardTitle className="flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          {selectedTemplate?.name} Preview
                        </CardTitle>
                        <CardDescription>
                          Review your generated document below. You can copy the text or download as PDF.
                        </CardDescription>
                      </div>
                      {/* Preview Mode Toggle */}
                      <div className="flex border rounded-md overflow-hidden w-fit mt-2">
                        <Button
                          variant={previewMode === 'text' ? 'default' : 'ghost'}
                          size="sm"
                          className="rounded-none"
                          onClick={() => setPreviewMode('text')}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Text View
                        </Button>
                        {isBrowser && (
                          <Button
                            variant={previewMode === 'pdf' ? 'default' : 'ghost'}
                            size="sm"
                            className="rounded-none"
                            onClick={() => setPreviewMode('pdf')}
                          >
                            <FileType className="mr-2 h-4 w-4" />
                            PDF View
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {previewMode === 'text' ? (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-md border border-gray-200 dark:border-gray-700 min-h-[400px] font-mono text-sm overflow-auto">
                          <div className="max-w-3xl mx-auto">
                            <h2 className="text-xl font-bold mb-6 text-center">{selectedTemplate.name}</h2>
                            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                              {generatedDocument}
                            </pre>
                          </div>
                        </div>
                      ) : isBrowser ? (
                        <div className="min-h-[400px]">
                          <Suspense fallback={<PdfLoadingFallback />}>
                            <DocumentPdfPreview 
                              documentTitle={selectedTemplate.name} 
                    documentText={generatedDocument}
                            />
                          </Suspense>
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-md border border-gray-200 dark:border-gray-700 min-h-[400px] flex items-center justify-center">
                          <p className="text-muted-foreground">PDF preview is only available in browser environments.</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                      <Alert variant="info" className="w-full sm:w-auto bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-sm text-blue-700 dark:text-blue-400">
                          Remember to review carefully before using. This document may need proper signing to be valid.
                        </AlertDescription>
                      </Alert>
                      <div className="flex gap-3 w-full sm:w-auto">
                        {previewMode === 'text' && isBrowser && (
                          <>
                            <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleCopyToClipboard}>
                              <Copy className="mr-2 h-4 w-4" /> Copy Text
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleDownload}>
                              <Download className="mr-2 h-4 w-4" /> Download Text
                            </Button>
                            <Button className="flex-1 sm:flex-none" onClick={handleDownloadPDF}>
                              <FileType className="mr-2 h-4 w-4" /> Download PDF
                            </Button>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                )}
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={handleNewDocument}>
                    Create Another Document
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Document Usage FAQ */}
          <div className="max-w-3xl mx-auto mt-12 px-4">
            <h2 className="text-xl font-semibold mb-4">Document Usage Guidelines</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-base mb-1">What can I use these documents for?</h3>
                    <p className="text-sm text-muted-foreground">
                      These documents are designed for personal use, informal agreements, and routine paperwork. They can help you draft basic letters, agreements, and forms quickly.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-base mb-1">What purposes require professional documents instead?</h3>
                    <p className="text-sm text-muted-foreground">
                      For legal matters, high-value transactions, official government submissions, court filings, and situations with significant legal implications, consult a qualified professional.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-base mb-1">How can I make these documents more official?</h3>
                    <p className="text-sm text-muted-foreground">
                      For greater validity, consider getting documents notarized, having witnesses sign them, using official letterhead, and keeping signed copies for all parties involved.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentCreator;
