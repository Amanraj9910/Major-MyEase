import React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative w-9 h-9 px-0 rounded-full overflow-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 hover:bg-secondary/80"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme === 'light' ? 'sun' : 'moon'}
          initial={{ y: -30, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 30, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-300" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default DarkModeToggle; 