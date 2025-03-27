
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, RefreshCw } from 'lucide-react';

interface DocumentPreviewProps {
  documentText: string;
  onCopy: () => void;
  onDownload: () => void;
  onNewDocument: () => void;
}

const DocumentPreview = ({ documentText, onCopy, onDownload, onNewDocument }: DocumentPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Generated Document</CardTitle>
            <CardDescription>Review your document before downloading</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
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
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h3 className="text-amber-800 font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              Disclaimer
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              This document is generated as a template only and may not be legally binding in all jurisdictions. It is recommended to consult with a legal professional before using this document for official purposes.
            </p>
          </div>
          
          <Button onClick={onNewDocument}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Create New Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
