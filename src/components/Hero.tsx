
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initScrollAnimations } from '@/lib/animations';

const Hero = () => {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-transparent -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-24 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-accent text-accent-foreground animate-fade-in">
            Simplifying Government Services
          </span>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 stroke-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Making Government Services 
            <span className="text-gradient block"> Effortlessly Accessible</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground/70 mb-8 md:mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The smart platform that simplifies complex government procedures,
            connects you with experts, and helps you navigate bureaucracy without the headache.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="rounded-full button-hover-effect" asChild>
              <Link to="/process-generator">
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full button-hover-effect" asChild>
              <Link to="/process-generator">
                Generate Process Guide
              </Link>
            </Button>
          </div>
          
          <div className="w-full max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl glass-panel">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover-scale">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Link 
            to="#features" 
            className="mt-12 flex flex-col items-center animate-float opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-sm font-medium mb-2">Discover Features</span>
            <ChevronDown className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
