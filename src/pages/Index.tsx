
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Mail, MailOpen, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

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
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 min-h-screen flex flex-col">
        {/* Main Title Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center my-16 md:my-24 pt-20">
          <div className="hero-content space-y-6">
            <h1 
              ref={titleRef} 
              className="text-6xl md:text-8xl font-light uppercase tracking-widest text-white"
              style={{ letterSpacing: "0.15em" }}
            >
              EUROTRIP<span className="font-thin">25</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-lg md:text-xl font-light tracking-wide text-white/90">
              Your exclusive journey through Europe's most coveted destinations. 
              An experience designed for Jamie and Nathan.
            </p>

            {/* Primary CTA Button */}
            <button
              onClick={scrollToItinerary}
              className="inline-block bg-amber-600 hover:bg-amber-700 px-8 py-4 uppercase tracking-wide font-medium transition-colors duration-200 text-white rounded-none mt-8"
            >
              Start Your Journey
            </button>
          </div>

          <div className="mt-12">
            <div onClick={() => handleNavigate("/planner")} className="duomo-container cursor-pointer">
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
        <div id="dates" className="mb-20">
          <div className="text-center py-16">
            <h2 className="text-3xl font-light uppercase tracking-wider mb-8">Travel Dates</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-white/80 mb-4">June 5-26, 2025</p>
              <p className="text-lg text-white/70">21 days across 7 European destinations</p>
            </div>
          </div>
        </div>

        <div id="contact" className="mb-20">
          <div className="text-center py-16">
            <h2 className="text-3xl font-light uppercase tracking-wider mb-8">Contact</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-white/80">
                This exclusive experience has been designed specifically for Jamie and Nathan.
              </p>
              <p className="text-sm text-white/60 mt-4">Have an amazing journey!</p>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto">
            <div className="group cursor-pointer relative overflow-hidden" onClick={() => handleNavigate("/planner")}>
              <div className="h-72 overflow-hidden">
                <div className="h-full w-full transform transition-transform duration-1000 group-hover:scale-110 bg-cover bg-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop')"
              }} />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-8 transition-all duration-500 group-hover:bg-black group-hover:bg-opacity-40">
                <div>
                  <h3 className="text-xl uppercase tracking-wider font-light mb-1">Itinerary</h3>
                  <div className="w-8 h-[1px] bg-white mb-3 transition-all duration-500 group-hover:w-16"></div>
                  <p className="text-sm text-white text-opacity-80">Day-by-day curated experiences</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer relative overflow-hidden" onClick={() => handleNavigate("/travel-concierge")}>
              <div className="h-72 overflow-hidden">
                <div className="h-full w-full transform transition-transform duration-1000 group-hover:scale-110 bg-cover bg-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1000&auto=format&fit=crop')"
              }} />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-8 transition-all duration-500 group-hover:bg-black group-hover:bg-opacity-40">
                <div>
                  <h3 className="text-xl uppercase tracking-wider font-light mb-1">CONCIERGE</h3>
                  <div className="w-8 h-[1px] bg-white mb-3 transition-all duration-500 group-hover:w-16"></div>
                  <p className="text-sm text-white text-opacity-80">AI-powered travel assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-white border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-opacity-70">
            <div className="text-xs tracking-widest mb-4 md:mb-0">
              JUNE 5-26, 2025 · 21 DAYS · 7 DESTINATIONS
            </div>
            <div className="text-xs tracking-wider">
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
