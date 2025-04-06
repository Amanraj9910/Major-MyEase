import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from "./pages/Index";
import ProcessGenerator from "./pages/ProcessGenerator";
import DocumentCreator from "./pages/DocumentCreator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Experts from "./pages/Experts";
import LanguageDemo from "./pages/LanguageDemo";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Google Client ID - Replace with your actual Client ID
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1057675765990-2b6g1e6li8t5jm1gae7p5vuv3s2j9rq8.apps.googleusercontent.com';

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/process-generator" element={<ProcessGenerator />} />
                  <Route path="/document-creator" element={<DocumentCreator />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/experts" element={<Experts />} />
                  <Route path="/language-demo" element={<LanguageDemo />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
