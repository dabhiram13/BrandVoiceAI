import React from "react";
import { Wand2 } from "lucide-react";
import { Link } from "wouter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Wand2 className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-dark">BrandVoice AI</span>
          </div>
          
          <div className="flex space-x-6 text-dark-medium text-sm">
            <span className="hover:text-primary">
              © 2025 BrandVoice AI
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center text-xs text-dark-light">
          <p>© {new Date().getFullYear()} BrandVoice AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
