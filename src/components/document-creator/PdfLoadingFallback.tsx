import React from 'react';

const PdfLoadingFallback: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[400px] bg-muted/20 rounded-md border">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-muted-foreground mt-2">Loading PDF Preview...</p>
    </div>
  );
};

export default PdfLoadingFallback; 