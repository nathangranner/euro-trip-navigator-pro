import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, MessageCircle, Compass } from "lucide-react";
import { europeTrip, TripDay } from '@/data/tripData';
import { TravelConcierge, TravelConciergeMessage, TravelConciergeSelectorProps } from './travel-concierge/types';
import { TRAVEL_CONCIERGES } from './travel-concierge/travel-concierge-data';
import { TravelConciergeCard } from './travel-concierge/TravelConciergeCard';
import { ChatModal } from './travel-concierge/ChatModal';
import { RecommendationsModal } from './travel-concierge/RecommendationsModal';
import { supabase } from "@/integrations/supabase/client";

export const TravelConciergeSelector: React.FC<TravelConciergeSelectorProps> = ({
  onOpenChat,
  isChatOpen = false,
  setIsChatOpen = () => {}
}) => {
  const [selectedConcierge, setSelectedConcierge] = useState<TravelConcierge | null>(null);
  const [chatOpen, setChatOpen] = useState(isChatOpen);
  const [messages, setMessages] = useState<TravelConciergeMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tripDays, setTripDays] = useState<TripDay[]>(europeTrip.days);
  const [selectedDay, setSelectedDay] = useState<TripDay | null>(null);
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const [recommendationTab, setRecommendationTab] = useState("dining");
  const [recommendations, setRecommendations] = useState<string>("");
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [adaptationRequest, setAdaptationRequest] = useState("");

  // Sync the chat state with parent component
  useEffect(() => {
    setChatOpen(isChatOpen);
  }, [isChatOpen]);

  const handleSelectConcierge = (concierge: TravelConcierge) => {
    setSelectedConcierge(concierge);
    
    // For the Itinerary Assistant, include trip data in the system prompt
    let systemPrompt = concierge.systemPrompt;
    if (concierge.id === "itinerary-assistant") {
      const tripDataSummary = tripDays.map(day => 
        `Day ${day.dayNumber} (${day.date}): ${day.city}, ${day.country} - ${day.description}`
      ).join('\n');
      
      systemPrompt = `${concierge.systemPrompt}

CURRENT TRIP DATA:
${tripDataSummary}

You have access to this detailed itinerary and can answer specific questions about dates, locations, and activities.`;
    }
    
    setMessages([{
      role: "system",
      content: systemPrompt
    }]);
    toast.success(`${concierge.name} is now your concierge!`);
  };

  const handleStartChat = () => {
    if (selectedConcierge) {
      setChatOpen(true);
      setIsChatOpen(true);
      if (onOpenChat) {
        onOpenChat();
      }
    } else {
      toast.error("Please select a concierge first");
    }
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setIsChatOpen(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedConcierge) return;

    const userMessage = {
      role: "user" as const,
      content: inputMessage
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      // For the Itinerary Assistant, enhance the message with current trip context
      let enhancedMessages = [...messages, userMessage];
      if (selectedConcierge.id === "itinerary-assistant") {
        // Add trip context to the user message for better responses
        const contextualMessage = {
          ...userMessage,
          content: `${userMessage.content}

[Trip Context: This is about Nathan & Jamie's Europe Trip 2025, June 5-26, 2025. Please reference the specific itinerary provided in your system prompt to answer accurately.]`
        };
        enhancedMessages = [...messages, contextualMessage];
      }

      // Call the Supabase Edge Function for travel concierge chat
      const { data, error } = await supabase.functions.invoke('travel-concierge-chat', {
        body: {
          messages: enhancedMessages.filter(msg => 
            msg.role !== "system" || 
            (msg.role === "system" && enhancedMessages.indexOf(msg) === 0)
          ),
          model: selectedConcierge.model,
          systemPrompt: messages[0]?.content || selectedConcierge.systemPrompt
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response from travel concierge');
      }

      const assistantMessage = {
        role: "assistant" as const,
        content: data.response || "I'm sorry, I couldn't process your request."
      };

      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with travel concierge:', error);
      toast.error("Couldn't connect with your concierge. Please try again.");

      // Fallback response if API call fails
      const fallbackMessage = {
        role: "assistant" as const,
        content: "I'm having trouble connecting right now. Please try again in a moment."
      };
      setMessages([...messages, userMessage, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRecommendations = (day: TripDay) => {
    setSelectedDay(day);
    setRecommendationTab("dining");
    setRecommendationsOpen(true);
  };

  const handleGetRecommendations = async (type: string) => {
    if (!selectedDay || !selectedConcierge) return;

    setRecommendationsLoading(true);
    setRecommendations("");

    let prompt = "";
    switch (type) {
      case "dining":
        prompt = `I'm visiting ${selectedDay.city} during my European trip on ${selectedDay.date}. Can you recommend the best local restaurants or dining experiences? Please include:
1. 3-5 specific restaurant recommendations with brief descriptions
2. Any local specialties I should try
3. Dining customs or etiquette I should know about
4. Any "insider tips" for getting reservations or special experiences`;
        break;
      case "attractions":
        prompt = `I'm visiting ${selectedDay.city} during my European trip on ${selectedDay.date}. What are the must-see attractions or hidden gems I should visit? Please include:
1. 3-5 attractions that are worth visiting with brief descriptions
2. Any special exhibits, events, or seasonal opportunities
3. Suggestions for the best times to visit to avoid crowds
4. Photography opportunities or viewpoints that tourists often miss`;
        break;
      case "events":
        prompt = `I'm visiting ${selectedDay.city} during my European trip on ${selectedDay.date}. Are there any special events, performances, or limited-time experiences happening around this time? Please include:
1. Any festivals, concerts, or cultural events during my visit
2. Special museum exhibitions or limited-time displays
3. Seasonal activities that are only available during this time period
4. Any local celebrations or traditions happening around this date`;
        break;
      case "adaptation":
        prompt = `I'm visiting ${selectedDay.city} during my European trip on ${selectedDay.date}. ${adaptationRequest || "I need to adapt my itinerary. What would you recommend?"} Please provide:
1. Alternative activities or places that match my interests
2. Suggestions for how to reorganize my day
3. Potential replacements for any activities I might need to skip
4. Any time-sensitive opportunities I should prioritize`;
        break;
    }

    try {
      const { data, error } = await supabase.functions.invoke('travel-concierge-chat', {
        body: {
          messages: [
            { role: "system", content: selectedConcierge.systemPrompt },
            { role: "user", content: prompt }
          ],
          model: selectedConcierge.model,
          systemPrompt: selectedConcierge.systemPrompt
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get recommendations');
      }

      setRecommendations(data.response || "No recommendations available.");
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations("I couldn't retrieve recommendations right now. Please try again.");
      toast.error("Couldn't get recommendations");
    } finally {
      setRecommendationsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Choose Your Concierge</h2>
      <p className="text-gray-300 mb-6">Select an AI concierge to help with your European adventure</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {TRAVEL_CONCIERGES.map(concierge => (
          <TravelConciergeCard 
            key={concierge.id} 
            concierge={concierge} 
            isSelected={selectedConcierge?.id === concierge.id} 
            onSelect={handleSelectConcierge} 
          />
        ))}
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <Button 
            onClick={handleStartChat} 
            disabled={!selectedConcierge} 
            className="px-6 flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with {selectedConcierge ? selectedConcierge.name : "your concierge"}
          </Button>
        </div>
        
        {selectedConcierge && selectedConcierge.id !== "itinerary-assistant" && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Get Location Recommendations</h3>
            <p className="text-sm text-gray-300 mb-4">
              Let {selectedConcierge.name} suggest interesting places and itinerary adaptations for each day of your trip
            </p>
            
            <p className="text-sm text-gray-400 mb-4">
              Your journey will take you through regions rich in European history. Italy offers Renaissance masterpieces, ancient Roman ruins, and medieval cities. Switzerland features Alpine traditions and neutral ground during major conflicts. Germany's landscape tells stories from the Holy Roman Empire through the modern era. Your concierge can provide historical context to enhance your travel experience.
            </p>
            
            <div className="space-y-4 mt-4">
              {tripDays.map(day => (
                <Card key={day.dayNumber} className="p-4 bg-slate-600 border-slate-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">Day {day.dayNumber}: {day.city}</h4>
                      <p className="text-sm text-gray-300">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleOpenRecommendations(day)} 
                      className="flex items-center gap-1 border-amber-600 bg-amber-700 hover:bg-amber-600 text-white"
                    >
                      <Compass className="h-4 w-4" /> Get Recommendations
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {selectedConcierge && selectedConcierge.id === "itinerary-assistant" && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Ask About Your Trip</h3>
            <p className="text-sm text-gray-300 mb-4">
              The Itinerary Assistant knows your complete Europe 2025 schedule. Ask questions like:
            </p>
            <div className="bg-slate-600 p-4 rounded-lg mb-4">
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• "Where am I on June 8th?"</li>
                <li>• "What's my accommodation in Florence?"</li>
                <li>• "When do I travel from Italy to Germany?"</li>
                <li>• "What activities are planned for Lake Como?"</li>
                <li>• "How many days am I spending in each country?"</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ChatModal 
        isOpen={chatOpen} 
        onClose={handleCloseChat} 
        selectedConcierge={selectedConcierge} 
        messages={messages} 
        inputMessage={inputMessage} 
        setInputMessage={setInputMessage} 
        loading={loading} 
        onSendMessage={handleSendMessage} 
      />

      <RecommendationsModal 
        isOpen={recommendationsOpen} 
        onClose={() => setRecommendationsOpen(false)} 
        selectedDay={selectedDay} 
        recommendationTab={recommendationTab} 
        setRecommendationTab={setRecommendationTab} 
        recommendations={recommendations} 
        recommendationsLoading={recommendationsLoading} 
        adaptationRequest={adaptationRequest} 
        setAdaptationRequest={setAdaptationRequest} 
        selectedConcierge={selectedConcierge} 
        handleGetRecommendations={handleGetRecommendations} 
      />
    </div>
  );
};
