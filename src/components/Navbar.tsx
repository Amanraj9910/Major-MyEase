import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, LogIn, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation('navigation');

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 10;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-foreground">
            MyEase<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <div className="flex space-x-4 lg:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              {t('home')}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline">
                  {t('services')} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/process-generator')}>{t('processGuidance')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/document-creator')}>{t('documentCreation')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/experts')}>{t('expertAssistance')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              {t('about')}
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              {t('pricing')}
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              {t('contact')}
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <DarkModeToggle />
            <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0">
              <Search className="h-4 w-4" />
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    <UserCircle className="h-4 w-4 mr-2" />
                    {user?.name || t('account')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    {t('profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
                    {t('dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  {t('signIn')}
                </Button>
                <Button 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => navigate('/signup')}
                >
                  {t('getStarted')}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-1">
          <LanguageSwitcher />
          <DarkModeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              <Link
                to="/"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              
              {/* Simplified mobile services dropdown */}
              <Accordion type="single" collapsible>
                <AccordionItem value="services" className="border-b-0">
                  <AccordionTrigger className="py-2 text-foreground hover:text-primary hover:no-underline flex justify-between w-full">
                    {t('services')}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pl-4">
                    <Link
                      to="/process-generator"
                      className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('processGuidance')}
                    </Link>
                    <Link
                      to="/document-creator"
                      className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('documentCreation')}
                    </Link>
                    <Link
                      to="/experts"
                      className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('expertAssistance')}
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Link
                to="/about"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <Link
                to="/pricing"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('pricing')}
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <div className="border-t pt-4 mt-2 flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                    >
                      <UserCircle className="h-4 w-4 mr-2" /> {t('profile')}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> {t('logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                    >
                      <LogIn className="h-4 w-4 mr-2" /> {t('signIn')}
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}
                    >
                      {t('getStarted')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
