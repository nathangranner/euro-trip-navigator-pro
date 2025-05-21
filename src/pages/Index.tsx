
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plane, Map, Calendar, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Europe Trip 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Your complete travel companion for your upcoming European adventure.
            Plan, organize, and enjoy your journey with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="group cursor-pointer" onClick={() => navigate("/planner")}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <Calendar className="text-white h-16 w-16" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Trip Planner</h3>
                <p className="text-gray-600">
                  View your detailed day-by-day itinerary, manage activities, and track expenses throughout your journey.
                </p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer" onClick={() => navigate("/travel-buddy")}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                <Globe className="text-white h-16 w-16" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">AI Travel Buddy</h3>
                <p className="text-gray-600">
                  Get personalized recommendations, translations, and cultural insights from your AI travel companions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button 
            size="lg" 
            onClick={() => navigate("/planner")} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            View Trip Details
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/travel-buddy")} 
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Open Travel Buddy
          </Button>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full text-sm text-gray-500 shadow-sm">
            Europe Trip: June 5-26, 2025 • 21 Days • 7 Countries
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
