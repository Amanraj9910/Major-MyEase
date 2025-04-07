import React, { useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Import worker initialization - should run only on client
import '@/utils/pdfjs-init';

// Define styles using StyleSheet API
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica', // Default font
  },
  section: {
    marginBottom: 10,
  },
  contentText: {
    fontSize: 12,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap', // Ensure whitespace is respected
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold', // Use a bold variant if registered
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: 'grey',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 5,
  },
});

// Define the PDFDocument component (can be memoized for performance)
const PDFDocumentComponent = React.memo(({ documentTitle, documentText }: { documentTitle: string; documentText: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{documentTitle}</Text>
      </View>
      <View style={styles.section}>
        {/* Split text by lines to handle rendering potentially better */} 
        {documentText.split('\n').map((line, index) => (
          <Text key={index} style={styles.contentText}>{line || ' '}</Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text>This document was generated using MyEase Document Creator. For personal or informal use only.</Text>
      </View>
    </Page>
  </Document>
));

interface DocumentPdfPreviewProps {
  documentTitle: string;
  documentText: string;
}

const DocumentPdfPreview: React.FC<DocumentPdfPreviewProps> = ({ documentTitle, documentText }) => {
  // PDF document name for download
  const fileName = `${documentTitle.replace(/\s+/g, '-')}-${Date.now()}.pdf`;

  // Simple state to trigger repaint if needed after initial mount
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect(() => {
    // Use a small delay to ensure rendering environment is stable
    const timer = setTimeout(() => {
      setMounted(true);
      // Optionally force resize event if rendering issues persist
      // window.dispatchEvent(new Event('resize'));
    }, 150); // Increased delay slightly
    
    return () => clearTimeout(timer);
  }, []);

  // Prepare the document instance for the download link
  const pdfDocInstance = <PDFDocumentComponent documentTitle={documentTitle} documentText={documentText} />;

  return (
    <div className="flex flex-col space-y-4">
      <div className="h-[600px] border rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
        {mounted ? (
          <PDFViewer width="100%" height="100%" className="rounded-md" showToolbar={true}>
            {pdfDocInstance}
          </PDFViewer>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
             <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
             <p className="text-sm text-muted-foreground mt-2">Initializing PDF Viewer...</p>
           </div>
        )}
      </div>
      
      <div className="flex justify-center">
        <PDFDownloadLink 
          document={pdfDocInstance} 
          fileName={fileName}
          className="w-full md:w-auto"
        >
          {({ loading }) => (
            <Button disabled={loading} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              {loading ? 'Generating PDF...' : 'Download as PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders, improving smoothness
export default React.memo(DocumentPdfPreview); 