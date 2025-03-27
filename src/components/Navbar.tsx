
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, LogIn, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
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
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center text-foreground/80 hover:text-foreground transition-colors link-underline">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                <div className="py-1">
                  <Link
                    to="/process-generator"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    Process Guidance
                  </Link>
                  <Link
                    to="/services/documents"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    Document Creation
                  </Link>
                  <Link
                    to="/experts"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    Expert Assistance
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-foreground transition-colors link-underline"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0">
              <Search className="h-4 w-4" />
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    <UserCircle className="h-4 w-4 mr-2" />
                    {user?.name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transition-transform duration-300 ease-in-out pt-16 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link
            to="/"
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div className="py-2">
            <button className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors">
              Services <ChevronDown className="h-4 w-4" />
            </button>
            <div className="pl-4 mt-2 space-y-2">
              <Link
                to="/process-generator"
                className="block py-1 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Process Guidance
              </Link>
              <Link
                to="/services/documents"
                className="block py-1 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Document Creation
              </Link>
              <Link
                to="/experts"
                className="block py-1 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Expert Assistance
              </Link>
            </div>
          </div>
          <Link
            to="/about"
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-4 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/profile');
                  }}
                >
                  Profile <UserCircle className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
