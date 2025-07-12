
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Menu, X } from 'lucide-react';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      {/* Constitutional Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-center items-center space-x-6">
          <span>Art. 104: Constitutional Right to Recall</span>
          <span>•</span>
          <span>KICA §83C Compliant</span>
          <span>•</span>
          <span>End-to-End Encrypted</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900">PetaRecall</h1>
              <p className="text-xs text-green-600">Your Constitution. Your Power.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#petitions" className="text-green-800 hover:text-green-600 transition-colors">
              Active Petitions
            </a>
            <a href="#search" className="text-green-800 hover:text-green-600 transition-colors">
              Search Wards
            </a>
            <a href="#legal" className="text-green-800 hover:text-green-600 transition-colors">
              Legal Framework
            </a>
            <a href="#map" className="text-green-800 hover:text-green-600 transition-colors">
              Ward Map
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-green-100">
            <div className="flex flex-col space-y-3">
              <a href="#petitions" className="text-green-800 hover:text-green-600 transition-colors">
                Active Petitions
              </a>
              <a href="#search" className="text-green-800 hover:text-green-600 transition-colors">
                Search Wards
              </a>
              <a href="#legal" className="text-green-800 hover:text-green-600 transition-colors">
                Legal Framework
              </a>
              <a href="#map" className="text-green-800 hover:text-green-600 transition-colors">
                Ward Map
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default ModernHeader;
