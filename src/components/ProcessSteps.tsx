
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ProcessSteps = () => {
  const steps = [
    {
      number: '01',
      title: 'Define Your Need',
      description: 'Search for your specific government service or process using our smart search or voice command.',
      color: 'from-blue-500/20 to-blue-500/10'
    },
    {
      number: '02',
      title: 'Get Guided Steps',
      description: 'Receive clear, step-by-step instructions with all requirements and documents listed in simple language.',
      color: 'from-purple-500/20 to-purple-500/10'
    },
    {
      number: '03',
      title: 'Prepare Documents',
      description: 'Use our document creator to generate the forms and applications you need, pre-filled with your information.',
      color: 'from-teal-500/20 to-teal-500/10'
    },
    {
      number: '04',
      title: 'Expert Assistance',
      description: 'Connect with verified experts if you need personalized help with complex requirements or unique situations.',
      color: 'from-amber-500/20 to-amber-500/10'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">MyEase</span> Works
          </h2>
          <p className="text-lg text-foreground/70">
            Our seamless process takes you from confusion to clarity in just a few simple steps.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connected line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-120px)] bg-gradient-to-b from-primary/30 to-primary/5 hidden md:block" />
          
          <div className="space-y-12 md:space-y-24 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className={`bg-gradient-to-br ${step.color} p-1 rounded-2xl`}>
                    <div className="bg-white rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-primary">
                        {step.number}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`pt-6 md:pt-0 w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-1 md:pr-16 text-right' : 'md:pl-16'}`}>
                  <div className="relative">
                    {/* Connecting dot */}
                    <div className="absolute top-1/2 transform -translate-y-1/2 md:block hidden w-5 h-5 rounded-full bg-primary left-0 md:left-auto md:right-auto" style={{ [index % 2 !== 0 ? 'right' : 'left']: '-40px' }} />
                    
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-foreground/70 mb-4">{step.description}</p>
                    <div className={`flex ${index % 2 !== 0 ? 'justify-end' : 'justify-start'}`}>
                      <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-primary">
                        Learn more &rarr;
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
