
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  IndianRupee, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Landmark,
  Globe,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProcessStep {
  title: string;
  description: string;
  documents?: string[];
  timeframe?: string;
  fees?: string;
  tips?: string;
}

interface ProcessDisplayProps {
  taskName: string;
  overview: string;
  steps: ProcessStep[];
}

const ProcessDisplay: React.FC<ProcessDisplayProps> = ({ taskName, overview, steps }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'timeline'>('timeline');
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'offline'>('all');

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  // Categorize steps (this is mock logic - in a real app, this data would come from the backend)
  const onlineSteps = steps.filter((_, index) => index % 3 !== 0); // Just a way to create a subset
  const offlineSteps = steps.filter((_, index) => index % 3 === 0);

  // Determine which steps to display based on active tab
  const displaySteps = activeTab === 'all' 
    ? steps 
    : activeTab === 'online' 
      ? onlineSteps 
      : offlineSteps;

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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-border/60 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2">
          <Landmark className="h-7 w-7 text-primary" />
          {taskName}
        </h1>
        <p className="text-center text-muted-foreground mb-6">{overview}</p>
        
        <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value as 'all' | 'online' | 'offline')}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All Steps</TabsTrigger>
            <TabsTrigger value="online" className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              Online
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              Offline
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex justify-center space-x-2 mb-6">
          <Button 
            size="sm" 
            variant={viewMode === 'timeline' ? 'default' : 'outline'} 
            onClick={() => setViewMode('timeline')}
          >
            Timeline View
          </Button>
          <Button 
            size="sm" 
            variant={viewMode === 'card' ? 'default' : 'outline'} 
            onClick={() => setViewMode('card')}
          >
            Card View
          </Button>
        </div>

        {viewMode === 'timeline' ? (
          <motion.div 
            className="relative pl-8 border-l-2 border-primary/30 space-y-8 ml-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displaySteps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={itemVariants}
              >
                <div className="absolute -left-[2.5rem] mt-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                  {activeTab === 'all' ? steps.indexOf(step) + 1 : index + 1}
                </div>
                
                <div 
                  className={`${
                    activeTab === 'online' ? 'bg-blue-50 hover:bg-blue-100' : 
                    activeTab === 'offline' ? 'bg-amber-50 hover:bg-amber-100' :
                    offlineSteps.includes(step) ? 'bg-amber-50/70 hover:bg-amber-100/70' : 'bg-blue-50/70 hover:bg-blue-100/70'
                  } rounded-lg p-4 transition-colors cursor-pointer`} 
                  onClick={() => toggleStep(index)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      {offlineSteps.includes(step) ? (
                        <span className="inline-flex items-center text-xs font-medium mr-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          Offline
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-medium mr-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          <Globe className="h-3 w-3 mr-1" />
                          Online
                        </span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(index);
                    }}>
                      {expandedStep === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <motion.div 
                    initial={false}
                    animate={{ height: expandedStep === index ? 'auto' : 0, opacity: expandedStep === index ? 1 : 0 }}
                    className="overflow-hidden mt-2"
                  >
                    <p className="text-foreground/80 mb-3">{step.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      {step.documents && step.documents.length > 0 && (
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div>
                            <span className="font-medium">Required Documents:</span>
                            <ul className="list-disc list-inside ml-1 text-foreground/70">
                              {step.documents.map((doc, i) => (
                                <li key={i}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {step.timeframe && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span><span className="font-medium">Time Required:</span> {step.timeframe}</span>
                        </div>
                      )}
                      
                      {step.fees && (
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-green-500" />
                          <span><span className="font-medium">Fees:</span> {step.fees}</span>
                        </div>
                      )}
                      
                      {step.tips && (
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                          <span><span className="font-medium">Helpful Tip:</span> {step.tips}</span>
                        </div>
                      )}

                      <div className="pt-3 mt-2 border-t border-border/60">
                        <h4 className="font-medium mb-1">Where to Complete This Step:</h4>
                        {offlineSteps.includes(step) ? (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Visit in person:</p>
                              <p className="text-foreground/70">Local government office or designated service center</p>
                              <p className="text-xs text-muted-foreground mt-1">Operating hours: Monday-Friday, 9 AM - 5 PM</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2">
                            <Globe className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Complete online:</p>
                              <a href="#" className="text-primary hover:underline">Official portal link</a>
                              <p className="text-xs text-muted-foreground mt-1">Available 24/7 (Maintenance: Sundays 2-4 AM)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            
            {displaySteps.length > 0 && (
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <div className="absolute -left-[2.5rem] mt-1.5 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="bg-green-100 text-green-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold">Process Complete</h3>
                  <p>All steps completed successfully!</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displaySteps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`${
                  offlineSteps.includes(step) ? 'border-amber-200 bg-amber-50/30' : 'border-blue-200 bg-blue-50/30'
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm mr-2">
                        {activeTab === 'all' ? steps.indexOf(step) + 1 : index + 1}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                    <div className="flex items-center mt-1 gap-2">
                      {offlineSteps.includes(step) ? (
                        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          Offline
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          <Globe className="h-3 w-3 mr-1" />
                          Online
                        </span>
                      )}
                      {step.timeframe && (
                        <CardDescription className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {step.timeframe}
                        </CardDescription>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-foreground/80 mb-3">{step.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      {step.documents && step.documents.length > 0 && (
                        <div className="border-t pt-2">
                          <span className="font-medium flex items-center">
                            <FileText className="h-3 w-3 mr-1 text-blue-500" /> Required Documents:
                          </span>
                          <ul className="list-disc list-inside ml-4 text-foreground/70 mt-1">
                            {step.documents.map((doc, i) => (
                              <li key={i}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.fees && (
                        <div className="border-t pt-2 flex items-center">
                          <IndianRupee className="h-3 w-3 mr-1 text-green-500" />
                          <span className="font-medium">Fees:</span> <span className="ml-1">{step.fees}</span>
                        </div>
                      )}
                      
                      {step.tips && (
                        <div className="border-t pt-2 flex items-start">
                          <HelpCircle className="h-3 w-3 mr-1 mt-0.5 text-purple-500" />
                          <div>
                            <span className="font-medium">Tip:</span> <span>{step.tips}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="border-t pt-2 mt-2">
                        <span className="font-medium flex items-center mb-1">
                          {offlineSteps.includes(step) ? (
                            <>
                              <MapPin className="h-3 w-3 mr-1 text-red-500" /> Visit in person
                            </>
                          ) : (
                            <>
                              <Globe className="h-3 w-3 mr-1 text-blue-500" /> Complete online
                            </>
                          )}
                        </span>
                        <p className="text-foreground/70">
                          {offlineSteps.includes(step) 
                            ? "Local government office (Mon-Fri, 9-5)" 
                            : "Available 24/7 on the official portal"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProcessDisplay;
