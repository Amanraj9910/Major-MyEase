import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TaskInput from '@/components/TaskInput';
import ProcessDisplay from '@/components/ProcessDisplay';
import { getProcessSteps } from '@/services/geminiService';

const ProcessGenerator: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState('');
  const [processData, setProcessData] = useState<{
    steps: {
      title: string;
      description: string;
      documents?: string[];
      timeframe?: string;
      fees?: string;
      tips?: string;
    }[];
    overview: string;
  } | null>(null);

  useEffect(() => {
    // Check for query parameters
    const queryParams = new URLSearchParams(location.search);
    const taskParam = queryParams.get('task');
    
    if (taskParam) {
      setTask(taskParam);
      handleTaskSubmit(taskParam);
    }
  }, [location.search]);

  const handleTaskSubmit = async (taskInput: string) => {
    setIsLoading(true);
    try {
      console.log('Submitting task:', taskInput);
      const data = await getProcessSteps(taskInput);
      console.log('Received process data:', data);
      setTask(taskInput);
      setProcessData(data);
      
      // Update URL with the search query if not already there
      const queryParams = new URLSearchParams(location.search);
      if (queryParams.get('task') !== taskInput) {
        navigate(`/process-generator?task=${encodeURIComponent(taskInput)}`, { replace: true });
      }
      
      // Scroll to results after a short delay
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error fetching process steps:', error);
      toast({
        title: "Error",
        description: "Failed to generate process steps. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && task) {
      navigator.share({
        title: `MyEase: ${task} Process Guide`,
        text: `Check out this step-by-step guide for ${task} on MyEase`,
        url: window.location.href,
      })
      .then(() => toast({ title: "Shared successfully" }))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Share API
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto"
        >
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Step-by-Step <span className="text-gradient">Process</span> Generator
            </h1>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto text-center mb-8 dark:text-foreground/80">
              Enter any administrative procedure or government service to get a detailed step-by-step guide.
            </p>
            
            <TaskInput onSubmit={handleTaskSubmit} isLoading={isLoading} initialValue={task} />
          </div>
          
          {processData && (
            <motion.div 
              id="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              
              <ProcessDisplay 
                taskName={task}
                overview={processData.overview}
                steps={processData.steps}
              />
            </motion.div>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProcessGenerator;
