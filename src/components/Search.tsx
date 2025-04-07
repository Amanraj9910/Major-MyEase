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
      navigate(`/process-generator?task=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    navigate(`/process-generator?task=${encodeURIComponent(term)}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Find Any Government Service 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                 In One Search
              </span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, fast access to information about government processes, requirements, 
              and applications—all in one place.
            </p>
          </div>
          
          <div className="relative animate-on-scroll group">
            {/* Subtle background shape */}
            <div className="absolute inset-0 -z-10 bg-blue-100/50 dark:bg-blue-900/30 rounded-[28px] transform translate-y-2 translate-x-2 transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
            
            <form onSubmit={handleSearch} className="relative bg-white dark:bg-gray-800 rounded-[28px] shadow-xl p-1 md:p-2 transition-all">
              <div className="flex items-center">
                <div className="flex-1 relative flex items-center">
                  <SearchIcon className="absolute left-4 h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholderText}
                    className="w-full py-4 px-12 rounded-l-[24px] bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {/* Clear Button */}
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      type="button"
                      className="absolute right-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      onClick={() => setSearchQuery('')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </Button>
                  )}
                </div>
                
                {/* Voice Search Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  type="button"
                  className={`mr-2 transition-all rounded-full ${isListening ? 'text-red-500 animate-pulse-gentle' : 'text-gray-600 dark:text-gray-400'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={handleVoiceSearch}
                  title="Voice Search"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                
                {/* Submit Search Button */}
                <Button type="submit" className="rounded-[24px] px-6 py-4 flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          
          {/* Popular Searches */}
          <div className="mt-8 text-center animate-on-scroll">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Popular searches: 
              <button 
                type="button" 
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                onClick={() => handlePopularSearch('Passport')}
              >
                Passport
              </button>,
              <button 
                type="button" 
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                onClick={() => handlePopularSearch('Aadhar Card')}
              >
                Aadhar Card
              </button>,
              <button 
                type="button" 
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                onClick={() => handlePopularSearch('Driving License')}
              >
                Driving License
              </button>,
              <button 
                type="button" 
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
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
