import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-t from-accent/20 to-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
          Ready to Simplify Your Administrative Tasks?
        </h2>
        <p className="text-lg text-foreground/70 mb-10 max-w-xl mx-auto">
          Stop wrestling with confusing government forms and processes. Get started with MyEase today and experience the ease.
        </p>
        <Button size="lg" className="rounded-full button-hover-effect" asChild>
          <Link to="/signup">
            Sign Up for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction; 