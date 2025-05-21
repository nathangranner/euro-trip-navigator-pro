
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
  return <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Hero Background with Parallax */}
      <div className="absolute inset-0 w-full h-full z-0" ref={parallaxRef}>
        <div className="absolute inset-0 w-full h-[120vh]" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.6) contrast(1.1)"
      }} />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 min-h-screen flex flex-col">
        {/* Header with luxury brand style */}
        <header className="pt-12 pb-8 flex justify-between items-center">
          <div className="text-2xl font-light tracking-[0.3em] uppercase">Europa</div>
          <div className="text-sm tracking-wider uppercase">Summer 2025</div>
        </header>

        {/* Main Title Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center my-16 md:my-24">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-light uppercase tracking-widest mb-8 glitch-effect" style={{
          letterSpacing: "0.15em"
        }}>
            EUROPE<span className="font-thin">25</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-lg md:text-xl font-light tracking-wide mb-12 opacity-90">
            Your exclusive journey through Europe's most coveted destinations. 
            An experience designed for the discerning traveler.
          </p>

          <div className="mt-12">
            <Button onClick={() => navigate("/planner")} className="explore-itinerary">
              Explore Collection <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto">
            <div className="group cursor-pointer relative overflow-hidden" onClick={() => navigate("/planner")}>
              <div className="h-72 overflow-hidden">
                <div className="h-full w-full transform transition-transform duration-1000 group-hover:scale-110" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }} />
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-end p-8 transition-all duration-500 group-hover:bg-black/40">
                <div>
                  <h3 className="text-xl uppercase tracking-wider font-light mb-1">Itinerary</h3>
                  <div className="w-8 h-[1px] bg-white mb-3 transition-all duration-500 group-hover:w-16"></div>
                  <p className="text-sm text-white/80">Day-by-day curated experiences</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer relative overflow-hidden" onClick={() => navigate("/travel-buddy")}>
              <div className="h-72 overflow-hidden">
                <div className="h-full w-full transform transition-transform duration-1000 group-hover:scale-110" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1000&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }} />
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-end p-8 transition-all duration-500 group-hover:bg-black/40">
                <div>
                  <h3 className="text-xl uppercase tracking-wider font-light mb-1">Concierge</h3>
                  <div className="w-8 h-[1px] bg-white mb-3 transition-all duration-500 group-hover:w-16"></div>
                  <p className="text-sm text-white/80">AI-powered travel assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/70">
            <div className="text-xs tracking-widest mb-4 md:mb-0">
              JUNE 5-26, 2025 · 21 DAYS · 7 DESTINATIONS
            </div>
            <div className="text-xs tracking-wider">
              DESIGNED FOR THE EXTRAORDINARY
            </div>
          </div>
        </footer>
      </div>

      {/* Visual effects - animated borders */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>
      <div className="absolute bottom-[20vh] left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
    </div>;
};
export default Index;
