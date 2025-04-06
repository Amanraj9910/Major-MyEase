import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Search = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Search for government services...');
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition when component mounts
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      
      // Set up event listeners
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        setPlaceholderText('Search for government services...');
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setPlaceholderText('Search for government services...');
        
        toast({
          title: "Voice Recognition Failed",
          description: `Error: ${event.error}. Please try again or type your search.`,
          variant: "destructive",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setPlaceholderText('Search for government services...');
      };
    }
    
    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
      }
    };
  }, []);

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Voice search is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    setIsListening(true);
    setPlaceholderText('Listening...');
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      setPlaceholderText('Search for government services...');
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery.trim()) {
      // Navigate to process generator with the search query
      navigate(`/process-generator?task=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    navigate(`/process-generator?task=${encodeURIComponent(term)}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Any Government Service 
              <span className="text-gradient"> In One Search</span>
            </h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto dark:text-foreground/80">
              Simple, fast access to information about government processes, requirements, 
              and applications—all in one place.
            </p>
          </div>
          
          <div className="relative animate-on-scroll">
            <div className="absolute inset-0 -z-10 bg-primary/5 dark:bg-primary/10 rounded-[28px] transform translate-y-2 translate-x-2 transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
            
            <form onSubmit={handleSearch} className="relative bg-white rounded-[28px] shadow-xl p-1 md:p-2 transition-all">
              <div className="flex items-center">
                <div className="flex-1 relative flex items-center">
                  <SearchIcon className="absolute left-4 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholderText}
                    className="w-full py-4 px-12 rounded-l-[24px] bg-transparent focus:outline-none text-foreground placeholder-muted-foreground/70"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    type="button"
                    className={`absolute right-2 transition-opacity ${searchQuery ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setSearchQuery('')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  type="button"
                  className={`mr-2 transition-all ${isListening ? 'text-red-500 animate-pulse-gentle' : 'text-foreground/70'}`}
                  onClick={handleVoiceSearch}
                  title="Voice Search"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                
                <Button type="submit" className="rounded-[24px] px-6 py-4 flex items-center shadow-none transition-all hover:shadow-lg">
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center animate-on-scroll">
            <p className="text-sm text-muted-foreground">
              Popular searches: 
              <button 
                type="button" 
                className="ml-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => handlePopularSearch('Passport')}
              >
                Passport
              </button>,
              <button 
                type="button" 
                className="ml-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => handlePopularSearch('Aadhar Card')}
              >
                Aadhar Card
              </button>,
              <button 
                type="button" 
                className="ml-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => handlePopularSearch('Driving License')}
              >
                Driving License
              </button>,
              <button 
                type="button" 
                className="ml-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => handlePopularSearch('Income Certificate')}
              >
                Income Certificate
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
