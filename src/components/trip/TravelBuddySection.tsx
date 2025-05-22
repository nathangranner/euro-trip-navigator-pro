
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export const TravelBuddySection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" /> AI Travel Buddy
        </h2>
        <Button 
          variant="outline"
          onClick={() => navigate("/travel-buddy")}
          className="flex items-center gap-2"
        >
          Visit Travel Buddy
        </Button>
      </div>
      
      <Card className="p-6">
        <p className="text-gray-600 mb-4">
          Your AI travel companion can help with recommendations, language assistance, 
          and trip adaptations during your European adventure.
        </p>
        <Button onClick={() => navigate("/travel-buddy")}>
          Explore Travel Buddy Features
        </Button>
      </Card>
    </div>
  );
};
