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
  return <div className="min-h-screen bg-slate-800">
      {/* Home navigation button */}
      <NavHome />
      
      {/* Content */}
      <div className="container mx-auto py-6 sm:py-8 space-y-4 sm:space-y-6 px-3 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold text-amber-400 font-futura tracking-wider uppercase py-[32px] px-[32px] sm:text-2xl my-0 mx-[12px]">
              Travel Concierge
            </h1>
            <p className="mt-1 text-amber-400 text-sm sm:text-base my-0 mx-[42px] py-0">Your AI travel companion for European adventures</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-gray-300 mb-4 bg-slate-700/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base">
            Personalized recommendations, language help, trip adaptations, and assistance from your travel experts
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="p-3 sm:p-4 bg-slate-700 border-slate-600 shadow-lg hover:bg-slate-600 transition-colors">
              <div className="flex items-center mb-2">
                <Map className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-amber-400" />
                <h3 className="font-futura text-base sm:text-lg tracking-wide text-white">Cultural Insights</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Discover local history, art, and traditions from experts</p>
            </Card>
            
            <Card className="p-3 sm:p-4 bg-slate-700 border-slate-600 shadow-lg hover:bg-slate-600 transition-colors">
              <div className="flex items-center mb-2">
                <Route className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-amber-400" />
                <h3 className="font-futura text-base sm:text-lg tracking-wide text-white">Navigation Assistant</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Get help with directions, road signs, and mileage calculations</p>
            </Card>
            
            <Card className="p-3 sm:p-4 border-slate-600  transition-colors bg-cyan-900">
              <div className="flex items-center mb-2">
                <Languages className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-amber-400" />
                <h3 className="font-futura text-base sm:text-lg tracking-wide text-white">Language Translation</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Translate phrases and get pronunciation help with Gemini Pro</p>
            </Card>

            <Card className="p-3 sm:p-4 bg-slate-700 border-slate-600 shadow-lg hover:bg-slate-600 transition-colors">
              <div className="flex items-center mb-2">
                <Ambulance className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-amber-400" />
                <h3 className="font-futura text-base sm:text-lg tracking-wide text-white">Travel Health</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Medical advice, finding pharmacies, and health guidance abroad</p>
            </Card>
          </div>
          
          <Tabs defaultValue="assistant" className="mb-6 sm:mb-8">
            <TabsList className="grid w-full grid-cols-2 mx-[3px] my-px py-[3px] px-[23px] rounded-2xl bg-amber-600">
              <TabsTrigger value="assistant" className="font-futura text-sm sm:text-lg tracking-wide uppercase bg-amber-700 hover:bg-amber-600 text-amber-50">Travel Assistant</TabsTrigger>
              <TabsTrigger value="translator" className="font-futura text-sm sm:text-lg tracking-wide uppercase bg-amber-700 hover:bg-amber-600 text-orange-100">Translator</TabsTrigger>
            </TabsList>
            <TabsContent value="assistant">
              <Card className="p-4 sm:p-6 bg-slate-700 border-slate-600">
                <TravelConciergeSelector onOpenChat={handleOpenChat} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
              </Card>
            </TabsContent>
            <TabsContent value="translator">
              <Card className="bg-slate-700 border-slate-600">
                <TranslationTool />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
};
export default TravelConciergePage;