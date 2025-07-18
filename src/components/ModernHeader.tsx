import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Menu, X, FileText, Users, Scale, MapPin, Search, Moon, Sun } from 'lucide-react';

interface ModernHeaderProps {
  darkMode?: boolean;
  toggleDarkMode: () => void;
  scrollToTab: (tabId: string) => void;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ 
  darkMode = false, 
  toggleDarkMode,
  scrollToTab
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldRenderDropdown, setShouldRenderDropdown] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Petitions', icon: FileText },
    { id: 'legal', label: 'Legal', icon: Scale },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'search', label: 'Search', icon: Search }
  ];
  
  const handleNavigation = (item: typeof navigationItems[0]) => {
    scrollToTab(item.id);
    setIsMobileMenuOpen(false);
    
    // Additional logic for petitions section
    if (item.id === 'dashboard') {
      setTimeout(() => {
        const petitionsSection = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2.gap-6');
        if (petitionsSection) {
          const header = document.querySelector('header');
          const headerHeight = header?.clientHeight || 64;
          const sectionTop = petitionsSection.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: sectionTop - headerHeight - 20, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const goToHomepage = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      setShouldRenderDropdown(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRenderDropdown(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  const menuIconVariants = {
    closed: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2
      }
    },
    open: {
      rotate: 90,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const xIconVariants = {
    closed: {
      rotate: -90,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    open: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        delay: 0.1
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const dropdownItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const logoVariants = {
    light: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    },
    dark: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.6
      }
    }
  };

  const logoVariantsDark = {
    light: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.6
      }
    },
    dark: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const themeIconVariants = {
    sun: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    moon: {
      rotate: 180,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const moonIconVariants = {
    sun: {
      rotate: -180,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    moon: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/80 backdrop-blur-md border-gray-700/60' 
        : 'bg-white/80 backdrop-blur-md border-green-100/60'
    } border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 bg-transparent">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={goToHomepage}
            aria-label="Go to homepage"
          >
            <div className="w-10 h-10 flex items-center justify-center relative">
              <link rel="preload" href="/logo_green.png" as="image" />
              <link rel="preload" href="/logo_white.png" as="image" />
              
              <motion.img 
                src="/logo_green.png"
                alt="Recall254 Logo Light"
                className="w-10 h-10 object-cover rounded-full absolute"
                variants={logoVariants}
                initial="light"
                animate={darkMode ? "dark" : "light"}
              />
              <motion.img 
                src="/logo_white.png"
                alt="Recall254 Logo Dark"
                className="w-10 h-10 object-cover rounded-full absolute"
                variants={logoVariantsDark}
                initial="light"
                animate={darkMode ? "dark" : "light"}
              />
            </div>
            <div>
              <h1 className={`text-lg font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-green-900'
              }`}>
                Recall254
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-green-700'
              }`}>
                by CEKA
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item)}
                className={`flex items-center space-x-2 transition-colors duration-300 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-green-700 hover:text-green-900 hover:bg-green-50/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Right Side: Status Badge + Dark Mode Toggle + Mobile Menu */}
          <div className="flex items-center space-x-3">
            <Badge 
              variant="outline" 
              className={`hidden sm:flex transition-colors duration-300 ${
                darkMode 
                  ? 'border-green-600 text-green-400 bg-green-900/30' 
                  : 'border-green-600 text-green-700 bg-green-50/70'
              }`}
            >
              Beta
            </Badge>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className={`transition-colors duration-300 relative w-10 h-10 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                  : 'text-green-700 hover:text-green-900 hover:bg-green-50/50'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute"
                  variants={themeIconVariants}
                  initial="sun"
                  animate={darkMode ? "moon" : "sun"}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
                <motion.div
                  className="absolute"
                  variants={moonIconVariants}
                  initial="sun"
                  animate={darkMode ? "moon" : "sun"}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              </div>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden transition-colors duration-300 relative w-10 h-10 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                  : 'text-green-700 hover:text-green-900 hover:bg-green-50/50'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute"
                  variants={menuIconVariants}
                  initial="closed"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
                <motion.div
                  className="absolute"
                  variants={xIconVariants}
                  initial="closed"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {shouldRenderDropdown && (
          <motion.div
            className={`md:hidden border-t transition-colors duration-300 ${
              darkMode ? 'border-gray-700/50' : 'border-green-100/50'
            }`}
            variants={dropdownVariants}
            initial="closed"
            animate={isMobileMenuOpen ? "open" : "closed"}
            exit="closed"
          >
            <nav className="py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={dropdownItemVariants}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNavigation(item)}
                      className={`w-full flex items-center space-x-3 justify-start px-4 py-3 transition-colors duration-300 ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                          : 'text-green-700 hover:text-green-900 hover:bg-green-50/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-2 mt-2 border-t border-gray-200/50 dark:border-gray-700/50"
                  variants={dropdownItemVariants}
                >
                  <Badge 
                    variant="outline" 
                    className={`transition-colors duration-300 ${
                      darkMode 
                        ? 'border-green-600 text-green-400 bg-green-900/30' 
                        : 'border-green-600 text-green-700 bg-green-50/70'
                    }`}
                  >
                    Beta Version
                  </Badge>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default ModernHeader;
