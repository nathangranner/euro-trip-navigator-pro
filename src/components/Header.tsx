
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (label: string) => {
    const sectionId = label.toLowerCase();
    setIsMenuOpen(false); // Close mobile menu
    
    if (sectionId === 'itinerary') {
      window.location.href = '/planner';
    } else if (sectionId === 'concierge') {
      window.location.href = '/travel-concierge';
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-white/20">
      <nav role="navigation" aria-label="Main navigation" className="max-w-6xl mx-auto flex items-center justify-between p-3 sm:p-4 bg-sky-950">
        <a href="/" className="text-base sm:text-lg md:text-xl font-semibold tracking-wider" aria-label="EUROTRIP25 home page">
          EUROTRIP25
        </a>
        
        {/* Mobile menu button */}
        <button
          className="sm:hidden text-white hover:text-amber-600 transition-colors duration-200 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>

        {/* Desktop navigation */}
        <ul className="hidden sm:flex space-x-3 md:space-x-4 lg:space-x-6 text-xs sm:text-sm uppercase tracking-wide">
          {["Itinerary", "Concierge", "Dates", "Contact"].map(label => (
            <li key={label}>
              <button 
                onClick={() => handleNavClick(label)} 
                className="hover:text-amber-600 transition-colors duration-200 px-2 py-1" 
                aria-label={`Navigate to ${label} section`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-sky-950/95 backdrop-blur-sm sm:hidden">
            <ul className="flex flex-col space-y-1 p-3 text-sm uppercase tracking-wide">
              {["Itinerary", "Concierge", "Dates", "Contact"].map(label => (
                <li key={label}>
                  <button 
                    onClick={() => handleNavClick(label)} 
                    className="w-full text-left hover:text-amber-600 transition-colors duration-200 px-3 py-3 border-b border-white/10 last:border-b-0" 
                    aria-label={`Navigate to ${label} section`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
