
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { TravelBuddySelector } from "@/components/TravelBuddySelector";
import { ChevronLeft } from "lucide-react";

const TravelBuddyPage: React.FC = () => {
  const navigate = useNavigate();

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
          Get personalized recommendations, language help, and trip adaptations from your AI travel companion
        </p>
        
        <Card className="p-6">
          <TravelBuddySelector />
        </Card>
      </div>
    </div>
  );
};

export default TravelBuddyPage;
