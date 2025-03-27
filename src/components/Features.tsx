
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, MessageSquare, FileText, Users, Lock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Smart Search',
      description: "Find any government service with our intelligent search that understands what you're looking for."
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: 'Voice Search',
      description: 'Simply speak to search for services, making it accessible to everyone, regardless of digital literacy.'
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'AI Assistant',
      description: '24/7 virtual assistance to answer your questions and guide you through complex procedures.'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Document Creator',
      description: 'Automatically generate properly formatted documents based on your information and requirements.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Expert Connect',
      description: 'Connect with vetted experts who can provide personalized assistance for complex cases.'
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: 'Secure Storage',
      description: 'Safely store your documents and personal information with bank-level encryption.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features to <span className="text-gradient">Simplify</span> Your Experience
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We've built tools that make navigating government services intuitive and accessible for everyone.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative bg-white rounded-xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
