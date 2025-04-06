import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Import i18n configuration
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from "./components/ThemeProvider"; // Import ThemeProvider

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider 
      attribute="class" // Add attribute="class"
      defaultTheme="system" 
      enableSystem // Add enableSystem
      storageKey="vite-ui-theme"
    >
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
