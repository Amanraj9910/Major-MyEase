import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Search from '@/components/Search';
import Features from '@/components/Features';
import ProcessSteps from '@/components/ProcessSteps';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { initScrollAnimations, setupBlurLoad } from '@/lib/animations';

const Index = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    initScrollAnimations();
    setupBlurLoad();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Search />
        <Features />
        <ProcessSteps />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
