// Only import and configure if running in browser environment
let GlobalWorkerOptions: any = {};

if (typeof window !== 'undefined' && 'Worker' in window) {
  import('pdfjs-dist').then(module => {
    GlobalWorkerOptions = module.GlobalWorkerOptions;
    GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;
  }).catch(err => {
    console.error('Error loading PDF.js worker:', err);
  });
}

export default GlobalWorkerOptions; 