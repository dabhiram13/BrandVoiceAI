import React from "react";
import { Link } from "wouter";
import { Wand2 } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <Wand2 className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-dark">BrandVoice AI</h1>
        </Link>
        
        {/* Navigation Items */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-primary font-medium">
            Transformer
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-dark-medium hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
