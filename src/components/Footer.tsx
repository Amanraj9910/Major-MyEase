import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="text-2xl font-semibold tracking-tight">
              MyEase<span className="text-primary">.</span>
            </div>
            <p className="text-foreground/70">
              Simplifying government services for all citizens of India through technology and human expertise.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/10 hover:bg-white/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/10 hover:bg-white/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/10 hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/10 hover:bg-white/20">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/documents" className="text-foreground/70 hover:text-primary transition-colors">
                  Document Creation
                </Link>
              </li>
              <li>
                <Link to="/services/guidance" className="text-foreground/70 hover:text-primary transition-colors">
                  Process Guidance
                </Link>
              </li>
              <li>
                <Link to="/services/expert-help" className="text-foreground/70 hover:text-primary transition-colors">
                  Expert Assistance
                </Link>
              </li>
              <li>
                <Link to="/services/ai-support" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Chatbot Support
                </Link>
              </li>
              <li>
                <Link to="/services/tracking" className="text-foreground/70 hover:text-primary transition-colors">
                  Application Tracking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-foreground/70 hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-foreground/70 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/70">
                  Jabalpur Engineering College, Ranjhi
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-foreground/70">+91 9910772433</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-foreground/70">rajaman78167@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MyEase. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
