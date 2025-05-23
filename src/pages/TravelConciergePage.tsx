
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { TravelConciergeSelector } from "@/components/TravelConciergeSelector";
import { TranslationTool } from "@/components/TranslationTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Route, Navigation, Map, MessageCircle, Ambulance, Languages } from "lucide-react";
import NavHome from "@/components/NavHome";

const TravelConciergePage: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Mediterranean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-blue-100 to-blue-400 z-0" />
      
      {/* Swoosh effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute w-full h-[70%] bottom-0" 
          style={{
            background: "radial-gradient(ellipse at center bottom, #1e6091 0%, #3498db 50%, transparent 100%)",
            opacity: 0.6,
            borderTopLeftRadius: "50% 70%",
            borderTopRightRadius: "50% 70%",
            transform: "scale(1.5)",
            bottom: "-5%"
          }} 
        />
        <div 
          className="absolute w-full h-[40%] bottom-0" 
          style={{
            background: "radial-gradient(ellipse at center bottom, #f5d0a9 0%, transparent 70%)",
            opacity: 0.4,
            borderTopLeftRadius: "60% 100%",
            borderTopRightRadius: "60% 100%",
            bottom: "10%"
          }} 
        />
      </div>
      
      {/* Home navigation button (out of the way) */}
      <NavHome />
      
      {/* Content */}
      <div className="container mx-auto py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-futura tracking-wider uppercase text-slate-800">
          </h1>
          <Button 
            onClick={() => navigate("/")} 
            variant="outline" 
            className="flex items-center gap-2 bg-white/70 hover:bg-white/90 backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4 bg-white/30 backdrop-blur-sm p-4 rounded-lg luxury-spacing text-center">
            Personalized recommendations, language help, trip adaptations, and assistance from your travel experts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 backdrop-blur-sm shadow-lg hover-reveal relative overflow-hidden">
              <div className="flex items-center mb-2">
                <Map className="h-5 w-5 mr-2 text-blue-600" />
                <h3 className="font-futura text-lg tracking-wide">Cultural Insights</h3>
              </div>
              <p className="text-sm text-gray-700">Discover local history, art, and traditions from experts</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200 backdrop-blur-sm shadow-lg hover-reveal relative overflow-hidden">
              <div className="flex items-center mb-2">
                <Route className="h-5 w-5 mr-2 text-green-600" />
                <h3 className="font-futura text-lg tracking-wide">Navigation Assistant</h3>
              </div>
              <p className="text-sm text-gray-700">Get help with directions, road signs, and mileage calculations</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 backdrop-blur-sm shadow-lg hover-reveal relative overflow-hidden">
              <div className="flex items-center mb-2">
                <Languages className="h-5 w-5 mr-2 text-amber-600" />
                <h3 className="font-futura text-lg tracking-wide">Language Translation</h3>
              </div>
              <p className="text-sm text-gray-700">Translate phrases and get pronunciation help with Gemini Pro</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200 backdrop-blur-sm shadow-lg hover-reveal relative overflow-hidden">
              <div className="flex items-center mb-2">
                <Ambulance className="h-5 w-5 mr-2 text-red-600" />
                <h3 className="font-futura text-lg tracking-wide">Travel Health</h3>
              </div>
              <p className="text-sm text-gray-700">Medical advice, finding pharmacies, and health guidance abroad</p>
            </Card>
          </div>
          
          <Tabs defaultValue="assistant" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="assistant" className="font-futura text-lg tracking-wide uppercase">Travel Assistant</TabsTrigger>
              <TabsTrigger value="translator" className="font-futura text-lg tracking-wide uppercase">Translator</TabsTrigger>
            </TabsList>
            <TabsContent value="assistant">
              <Card className="p-6 bg-white/70 backdrop-blur-md">
                <TravelConciergeSelector 
                  onOpenChat={handleOpenChat} 
                  isChatOpen={isChatOpen} 
                  setIsChatOpen={setIsChatOpen} 
                />
              </Card>
            </TabsContent>
            <TabsContent value="translator">
              <Card className="bg-white/70 backdrop-blur-md">
                <TranslationTool />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TravelConciergePage;
