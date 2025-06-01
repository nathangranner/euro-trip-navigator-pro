import React from "react";
export default function Header() {
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
    if (sectionId === 'itinerary') {
      window.location.href = '/planner';
    } else if (sectionId === 'concierge') {
      window.location.href = '/travel-concierge';
    } else {
      scrollToSection(sectionId);
    }
  };
  return <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-white/20">
      <nav role="navigation" aria-label="Main navigation" className="max-w-6xl mx-auto flex items-center justify-between p-4 bg-sky-950">
        <a href="/" className="text-xl font-semibold tracking-wider" aria-label="EUROTRIP25 home page">EUROTRIP25</a>
        <ul className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm uppercase tracking-wide">
          {["Itinerary", "Concierge", "Dates", "Contact"].map(label => <li key={label}>
              <button onClick={() => handleNavClick(label)} className="hover:text-amber-600 transition-colors duration-200 px-2 py-1" aria-label={`Navigate to ${label} section`}>
                {label}
              </button>
            </li>)}
        </ul>
      </nav>
    </header>;
}