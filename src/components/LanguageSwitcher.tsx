import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  // Find the current language object
  const currentLangObj = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Group languages by region for better organization
  const northIndianLanguages = ['hi', 'pa', 'ur'];
  const eastIndianLanguages = ['bn', 'as', 'or'];
  const westIndianLanguages = ['gu', 'mr'];
  const southIndianLanguages = ['ta', 'te', 'kn', 'ml'];

  const getLanguagesByRegion = (codes: string[]) => {
    return languages.filter(lang => codes.includes(lang.code));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0 rounded-full" aria-label="Switch language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>Language | भाषा</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
          {/* English first as it's the default */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={`flex justify-between ${currentLanguage === 'en' ? 'bg-accent' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              <span>English</span>
              <span className="text-muted-foreground">English</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>North India</DropdownMenuLabel>
          <DropdownMenuGroup>
            {getLanguagesByRegion(northIndianLanguages).map(lang => (
              <DropdownMenuItem
                key={lang.code}
                className={`flex justify-between ${currentLanguage === lang.code ? 'bg-accent' : ''}`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                <span className="text-muted-foreground">{lang.nativeName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>West India</DropdownMenuLabel>
          <DropdownMenuGroup>
            {getLanguagesByRegion(westIndianLanguages).map(lang => (
              <DropdownMenuItem
                key={lang.code}
                className={`flex justify-between ${currentLanguage === lang.code ? 'bg-accent' : ''}`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                <span className="text-muted-foreground">{lang.nativeName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>East India</DropdownMenuLabel>
          <DropdownMenuGroup>
            {getLanguagesByRegion(eastIndianLanguages).map(lang => (
              <DropdownMenuItem
                key={lang.code}
                className={`flex justify-between ${currentLanguage === lang.code ? 'bg-accent' : ''}`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                <span className="text-muted-foreground">{lang.nativeName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>South India</DropdownMenuLabel>
          <DropdownMenuGroup>
            {getLanguagesByRegion(southIndianLanguages).map(lang => (
              <DropdownMenuItem
                key={lang.code}
                className={`flex justify-between ${currentLanguage === lang.code ? 'bg-accent' : ''}`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                <span className="text-muted-foreground">{lang.nativeName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher; 