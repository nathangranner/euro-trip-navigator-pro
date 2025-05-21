
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { TravelBuddySelector } from "@/components/TravelBuddySelector";
import { ChevronLeft, Route, Navigation, Map, MessageCircle } from "lucide-react";

const TravelBuddyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Travel Buddy</h1>
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Get personalized recommendations, language help, trip adaptations, and navigation assistance from your AI travel companions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center mb-2">
              <Map className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-semibold">Cultural Insights</h3>
            </div>
            <p className="text-sm text-gray-700">Discover local history, art, and traditions from experts</p>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center mb-2">
              <Route className="h-5 w-5 mr-2 text-green-600" />
              <h3 className="font-semibold">Navigation Assistant</h3>
            </div>
            <p className="text-sm text-gray-700">Get help with directions, road signs, and mileage calculations</p>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="flex items-center mb-2">
              <Navigation className="h-5 w-5 mr-2 text-amber-600" />
              <h3 className="font-semibold">Local Recommendations</h3>
            </div>
            <p className="text-sm text-gray-700">Find the best dining spots, attractions, and hidden gems</p>
          </Card>
        </div>
        
        <Card className="p-6">
          <TravelBuddySelector onOpenChat={handleOpenChat} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        </Card>
      </div>
    </div>
  );
};

export default TravelBuddyPage;
