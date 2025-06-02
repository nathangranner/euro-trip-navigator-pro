import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Mail, MailOpen, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import DateProgress from "@/components/DateProgress";

const Index = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current && titleRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        titleRef.current.style.transform = `translateY(${scrollPosition * -0.2}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const scrollToItinerary = () => {
    navigate("/planner");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white font-body">
      {/* Header */}
      <Header />

      {/* Hero Background with Parallax */}
      <div className="absolute inset-0 w-full h-full z-0" ref={parallaxRef}>
        <div 
          className="absolute inset-0 w-full h-[120vh] bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2000&auto=format&fit=crop')",
            filter: "brightness(0.5) contrast(1.1)"
          }} 
        />
        {/* Dark overlay for better text readability and contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-3 sm:px-4 min-h-screen flex flex-col">
        {/* Main Title Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center my-4 sm:my-8 md:my-24 pt-16 sm:pt-20">
          <div className="hero-content space-y-3 sm:space-y-4 md:space-y-6">
            <h1 
              ref={titleRef} 
              style={{ letterSpacing: "0.15em" }} 
              className="text-3xl sm:text-4xl md:text-6xl font-light font-heading uppercase tracking-widest text-white mx-px"
            >
              EUROTRIP<span className="font-thin">25</span>
            </h1>
            
            <p className="max-w-sm sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg font-light tracking-wide text-white/90 leading-relaxed px-2 sm:px-4">
              Your exclusive journey through Europe's most coveted destinations. 
              An experience designed for Jamie and Nathan.
            </p>

            {/* Primary CTA Button */}
            <button 
              onClick={scrollToItinerary} 
              aria-label="Navigate to trip itinerary planner" 
              className="inline-block hover:bg-gold-dark px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 uppercase tracking-wide font-medium transition-colors duration-200 text-white mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base rounded-none bg-amber-700 hover:bg-amber-600"
            >
              Start Your Journey
            </button>
          </div>

          {/* Date Progress Bar */}
          <div className="w-full px-2 sm:px-0">
            <DateProgress days={21} />
          </div>

          <div className="mt-6 sm:mt-8 md:mt-12">
            <div 
              onClick={() => handleNavigate("/planner")} 
              className="duomo-container cursor-pointer transform scale-75 sm:scale-90 md:scale-100" 
              role="button" 
              tabIndex={0} 
              aria-label="Access trip planner"
            >
              {/* ... keep existing code (duomo structure) */}
              <div className="duomo-main">
                <div className="duomo-body"></div>
                <div className="duomo-central-spire"></div>
                <div className="duomo-side-spire-left"></div>
                <div className="duomo-side-spire-right"></div>
                <div className="duomo-arch-left"></div>
                <div className="duomo-arch-right"></div>
                <div className="duomo-rose-window"></div>
                <div className="duomo-portal"></div>
                <div className="duomo-buttress-left"></div>
                <div className="duomo-buttress-right"></div>
                <div className="duomo-filigree-tl"></div>
                <div className="duomo-filigree-tr"></div>
                <div className="duomo-filigree-bl"></div>
                <div className="duomo-filigree-br"></div>
                <div className="duomo-filigree-center"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections for navigation anchors */}
        <div id="dates" className="mb-8 sm:mb-12 md:mb-24 py-8 sm:py-12 md:py-24">
          <div className="text-center px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light font-heading uppercase tracking-wider mb-4 sm:mb-6 md:mb-8">Travel Dates</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-3 sm:mb-4 leading-relaxed">June 5-26, 2025</p>
              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">21 days across 7 European destinations</p>
            </div>
          </div>
        </div>

        <div id="contact" className="mb-8 sm:mb-12 md:mb-24 py-8 sm:py-12 md:py-24">
          <div className="text-center px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light font-heading uppercase tracking-wider mb-4 sm:mb-6 md:mb-8">Contact</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                This exclusive experience has been designed specifically for Jamie and Nathan.
              </p>
              <p className="text-xs sm:text-sm text-white/60 mt-3 sm:mt-4 leading-relaxed">Have an amazing journey!</p>
            </div>
          </div>
        </div>

        {/* Polished Navigation Cards - Mobile First Grid */}
        <div className="mb-8 sm:mb-12 md:mb-24 py-8 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-12 max-w-4xl mx-auto px-3 sm:px-4 md:px-0">
            <figure 
              id="itinerary" 
              className="group cursor-pointer relative overflow-hidden rounded-lg" 
              onClick={() => handleNavigate("/planner")} 
              aria-labelledby="itinerary-heading" 
              role="button" 
              tabIndex={0}
            >
              <div className="h-48 sm:h-64 md:h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop" 
                  alt="European cityscape with historic cathedral architecture showcasing detailed Gothic facades and spires" 
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <figcaption className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 id="itinerary-heading" className="text-base sm:text-lg md:text-xl font-heading uppercase tracking-wider font-light mb-2 text-white">Itinerary</h3>
                <div className="w-12 h-[1px] bg-gold mb-3 transition-all duration-500 group-hover:w-20"></div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed text-center">Day-by-day curated experiences</p>
              </figcaption>
            </figure>
            
            <figure 
              id="concierge" 
              className="group cursor-pointer relative overflow-hidden rounded-lg" 
              onClick={() => handleNavigate("/travel-concierge")} 
              aria-labelledby="concierge-heading" 
              role="button" 
              tabIndex={0}
            >
              <div className="h-48 sm:h-64 md:h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1000&auto=format&fit=crop" 
                  alt="Luxury hotel concierge desk with professional service environment, marble surfaces and elegant lighting" 
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <figcaption className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 id="concierge-heading" className="text-base sm:text-lg md:text-xl font-heading uppercase tracking-wider font-light mb-2 text-white">Concierge</h3>
                <div className="w-12 h-[1px] bg-gold mb-3 transition-all duration-500 group-hover:w-20"></div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed text-center">AI-powered travel assistance</p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-4 sm:py-6 md:py-8 border-t border-white border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-opacity-70 px-3 sm:px-4">
            <div className="text-xs tracking-widest mb-3 md:mb-0 leading-relaxed text-center md:text-left">
              JUNE 5-26, 2025 · 21 DAYS · 7 DESTINATIONS
            </div>
            <div className="text-xs tracking-wider leading-relaxed text-center md:text-right">
              Designed for Jamie and Nathan. Have fun!
            </div>
          </div>
        </footer>
      </div>

      {/* Visual effects - animated borders */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white from-opacity-0 via-white via-opacity-30 to-white to-opacity-0"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white from-opacity-0 via-white via-opacity-30 to-white to-opacity-0"></div>
      <div className="absolute bottom-[20vh] left-0 w-full h-[1px] bg-gradient-to-r from-white from-opacity-0 via-white via-opacity-30 to-white to-opacity-0"></div>
    </div>
  );
};

export default Index;
