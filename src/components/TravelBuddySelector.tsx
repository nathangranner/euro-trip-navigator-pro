import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import { Loader2, MessageCircle, User, Send, MapPin, Compass, Star, Route, Navigation, Map, Ambulance } from "lucide-react";
import { saveApiKey, getApiKey } from "@/utils/storageUtils";
import { europeTrip, TripDay, PointOfInterest } from "@/data/tripData";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface TravelBuddyMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
interface TravelBuddy {
  id: string;
  name: string;
  avatar: string;
  description: string;
  model: string;
  systemPrompt: string;
}
interface RecommendationRequest {
  dayNumber: number;
  city: string;
  type: "dining" | "attractions" | "events" | "adaptation";
  context: string;
}
interface TravelBuddySelectorProps {
  onOpenChat?: () => void;
  isChatOpen?: boolean;
  setIsChatOpen?: (isOpen: boolean) => void;
}
const TRAVEL_BUDDIES: TravelBuddy[] = [{
  id: "claude",
  name: "Sophie",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format",
  description: "Worldly travel expert with knowledge of European history and culture",
  model: "anthropic/claude-3-opus",
  systemPrompt: "You are Sophie, a worldly travel expert with extensive knowledge of European history, culture, and hidden gems. You specialize in Italy, Switzerland, and Germany. Be conversational, warm, and personable. Provide specific, actionable travel advice when asked. You have extensive knowledge about European customs, local foods, and off-the-beaten-path destinations. If asked about something outside your expertise, politely redirect to travel-related topics you can help with."
}, {
  id: "gpt4o",
  name: "Marco",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format",
  description: "Local European guide with insider knowledge of restaurants and activities",
  model: "openai/gpt-4o",
  systemPrompt: "You are Marco, a local European guide with insider knowledge of the best restaurants, activities, and hidden spots across Italy, Switzerland, and Germany. You have lived in these countries for years and know the authentic experiences tourists often miss. Be friendly, enthusiastic, and speak casually as if talking to a friend. Focus on providing specific recommendations with local insights when asked. You excel at suggesting food, entertainment options, and how to interact with locals."
}, {
  id: "llama",
  name: "Professor Ludwig",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format",
  description: "History professor specializing in European art and architecture",
  model: "meta/llama-3-70b-instruct",
  systemPrompt: "You are Professor Ludwig, a history professor specializing in European art and architecture with decades of experience. You provide fascinating historical context for landmarks and cities in Italy, Switzerland, and Germany. Speak in a slightly formal but approachable manner, showing enthusiasm when discussing historical subjects. You excel at explaining the historical significance of buildings, artwork, and monuments. When asked questions, focus on providing educational and enriching responses that add depth to a traveler's experience."
}, {
  id: "navigator",
  name: "Olivia",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format",
  description: "Road trip navigator with expertise on European driving regulations and routes",
  model: "openai/gpt-4o",
  systemPrompt: "You are Olivia, a road trip navigator with detailed knowledge of European driving regulations, road signs, and optimal routes. You specialize in calculating travel times, interpreting European road signs, suggesting efficient routes, and providing information about tolls, speed limits, and driving customs in Italy, Switzerland, and Germany. Be practical, precise, and helpful. Respond clearly to questions about distances, driving times, and road regulations. You excel at explaining the meanings of road signs and symbols, providing real-time navigation help, and suggesting the most scenic or efficient routes between destinations."
}, {
  id: "health",
  name: "Dr. Elena",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format",
  description: "Experienced travel doctor with medical expertise for travelers in Europe",
  model: "anthropic/claude-3-opus",
  systemPrompt: "You are Dr. Elena, an experienced travel physician who has worked across Europe and traveled extensively throughout Italy, Switzerland, and Germany. You provide practical medical advice for travelers dealing with common travel health issues, medication information, and emergency guidance. You can explain local healthcare systems, help find pharmacies or medical facilities, and offer advice on travel insurance. You're knowledgeable about altitude sickness in the Alps, food safety, dealing with jet lag, and staying healthy while traveling. Your advice is practical, calming, and accessible to non-medical travelers. Always remind users that you provide general guidance, not diagnosis, and to seek professional medical help for serious conditions."
}];
export const TravelBuddySelector: React.FC<TravelBuddySelectorProps> = ({
  onOpenChat,
  isChatOpen = false,
  setIsChatOpen = () => {}
}) => {
  const [selectedBuddy, setSelectedBuddy] = useState<TravelBuddy | null>(null);
  const [chatOpen, setChatOpen] = useState(isChatOpen);
  const [messages, setMessages] = useState<TravelBuddyMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
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
  useEffect(() => {
    const storedApiKey = getApiKey("openrouter");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      // Show API key modal if no key is found
      setShowApiKeyModal(true);
    }
  }, []);
  const handleSelectBuddy = (buddy: TravelBuddy) => {
    setSelectedBuddy(buddy);
    setMessages([{
      role: "system",
      content: buddy.systemPrompt
    }]);
    toast.success(`${buddy.name} is now your travel buddy!`);
  };
  const handleStartChat = () => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }
    if (selectedBuddy) {
      setChatOpen(true);
      setIsChatOpen(true);
      if (onOpenChat) {
        onOpenChat();
      }
    } else {
      toast.error("Please select a travel buddy first");
    }
  };
  const handleCloseChat = () => {
    setChatOpen(false);
    setIsChatOpen(false);
  };
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveApiKey("openrouter", apiKey.trim());
      setShowApiKeyModal(false);
      toast.success("OpenRouter API key saved");
    } else {
      toast.error("Please enter a valid API key");
    }
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedBuddy || !apiKey) return;
    const userMessage = {
      role: "user" as const,
      content: inputMessage
    };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setLoading(true);
    try {
      // Prepare messages for the API call
      const apiMessages = [...messages, userMessage];

      // Make request to OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Europe Trip Planner'
        },
        body: JSON.stringify({
          model: selectedBuddy.model,
          messages: apiMessages.filter(msg => msg.role !== "system" || msg.role === "system" && apiMessages.indexOf(msg) === 0)
        })
      });
      if (!response.ok) {
        throw new Error('Failed to get response from travel buddy');
      }
      const data = await response.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request."
      };
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with travel buddy:', error);
      toast.error("Couldn't connect with your travel buddy. Please check your API key.");

      // Fallback response if API call fails
      const fallbackMessage = {
        role: "assistant" as const,
        content: "I'm having trouble connecting right now. Please check your OpenRouter API key and try again."
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
    if (!selectedDay || !selectedBuddy || !apiKey) return;
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
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Europe Trip Planner'
        },
        body: JSON.stringify({
          model: selectedBuddy.model,
          messages: [{
            role: "system",
            content: selectedBuddy.systemPrompt
          }, {
            role: "user",
            content: prompt
          }]
        })
      });
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      const data = await response.json();
      setRecommendations(data.choices[0]?.message?.content || "No recommendations available.");
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations("I couldn't retrieve recommendations right now. Please check your connection and API key.");
      toast.error("Couldn't get recommendations");
    } finally {
      setRecommendationsLoading(false);
    }
  };
  return <div>
      <h2 className="text-2xl font-semibold mb-4">Choose Your Concierge</h2>
      <p className="text-gray-600 mb-6">Select an AI companion to help with your European adventure</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {TRAVEL_BUDDIES.map(buddy => <Card key={buddy.id} className={`p-4 cursor-pointer transition-all hover:shadow-md ${selectedBuddy?.id === buddy.id ? 'ring-2 ring-blue-500 shadow-md' : ''}`} onClick={() => handleSelectBuddy(buddy)}>
            <div className="flex items-center mb-3">
              <img src={buddy.avatar} alt={buddy.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
              <div>
                <h3 className="font-semibold">{buddy.name}</h3>
                <p className="text-sm text-gray-500">{buddy.model.split('/')[0]}</p>
              </div>
            </div>
            <p className="text-sm">{buddy.description}</p>
          </Card>)}
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <Button onClick={handleStartChat} disabled={!selectedBuddy} className="px-6 flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat with {selectedBuddy ? selectedBuddy.name : "your buddy"}
          </Button>
        </div>
        
        {selectedBuddy && <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Get Location Recommendations</h3>
            <p className="text-sm text-gray-600 mb-4">
              Let {selectedBuddy.name} suggest interesting places and itinerary adaptations for each day of your trip
            </p>
            
            <div className="space-y-4 mt-4">
              {tripDays.map(day => <Card key={day.dayNumber} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Day {day.dayNumber}: {day.city}</h4>
                      <p className="text-sm text-gray-500">{new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</p>
                    </div>
                    <Button variant="outline" onClick={() => handleOpenRecommendations(day)} className="flex items-center gap-1">
                      <Compass className="h-4 w-4" /> Get Recommendations
                    </Button>
                  </div>
                </Card>)}
            </div>
          </div>}
      </div>

      {/* API Key Modal */}
      <Modal isOpen={showApiKeyModal} onClose={() => setShowApiKeyModal(false)} title="Set OpenRouter API Key" footer={<Button onClick={handleSaveApiKey} className="ml-auto">
            Save API Key
          </Button>}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            To use the travel buddy feature, you need an OpenRouter API key. 
            Get your key at <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">openrouter.ai</a>.
          </p>
          <Input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-or-v1-xxxxxxxx" className="w-full" />
          <p className="text-xs text-gray-500">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      </Modal>

      {/* Chat Modal */}
      <Modal isOpen={chatOpen} onClose={handleCloseChat} title={selectedBuddy ? `Chat with ${selectedBuddy.name}` : "Chat with Travel Buddy"}>
        <div className="flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-md">
            {messages.filter(msg => msg.role !== "system").map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-white border rounded-bl-none shadow-sm"}`}>
                  <div className="flex items-center mb-1">
                    {message.role === "assistant" && selectedBuddy && <img src={selectedBuddy.avatar} alt={selectedBuddy.name} className="w-6 h-6 rounded-full mr-2 object-cover" />}
                    <span className="text-xs font-medium">
                      {message.role === "user" ? "You" : selectedBuddy?.name}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>)}
            {loading && <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white border rounded-bl-none shadow-sm">
                  <div className="flex items-center">
                    {selectedBuddy && <img src={selectedBuddy.avatar} alt={selectedBuddy.name} className="w-6 h-6 rounded-full mr-2 object-cover" />}
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>}
          </div>
          
          <div className="flex gap-2">
            <Input placeholder="Ask your travel buddy a question..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === "Enter" && !loading && handleSendMessage()} className="flex-1" disabled={loading} />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || loading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Modal>

      {/* Recommendations Modal */}
      <Modal isOpen={recommendationsOpen} onClose={() => setRecommendationsOpen(false)} title={selectedDay ? `Recommendations for ${selectedDay.city}` : "Recommendations"}>
        <div className="flex flex-col h-[60vh]">
          <Tabs defaultValue="dining" value={recommendationTab} onValueChange={setRecommendationTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="dining">Dining</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="adaptation">Adaptation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dining">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Restaurant Recommendations</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover the best dining options in {selectedDay?.city}
                </p>
                <Button onClick={() => handleGetRecommendations("dining")} disabled={recommendationsLoading || !selectedBuddy} className="mb-4">
                  {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Star className="h-4 w-4 mr-2" />}
                  Get Dining Recommendations
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="attractions">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Local Attractions</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover must-see sights and hidden gems in {selectedDay?.city}
                </p>
                <Button onClick={() => handleGetRecommendations("attractions")} disabled={recommendationsLoading || !selectedBuddy} className="mb-4">
                  {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <MapPin className="h-4 w-4 mr-2" />}
                  Get Attraction Recommendations
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Special Events</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover timely events and activities in {selectedDay?.city}
                </p>
                <Button onClick={() => handleGetRecommendations("events")} disabled={recommendationsLoading || !selectedBuddy} className="mb-4">
                  {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Star className="h-4 w-4 mr-2" />}
                  Get Event Recommendations
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="adaptation">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Itinerary Adaptation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Need to change your plans? Get suggestions for adapting your itinerary
                </p>
                <Textarea placeholder="Briefly describe why you need to adapt your itinerary (e.g., 'Museum is closed', 'Weather is bad', 'Want to try something different')" value={adaptationRequest} onChange={e => setAdaptationRequest(e.target.value)} className="mb-4" />
                <Button onClick={() => handleGetRecommendations("adaptation")} disabled={recommendationsLoading || !selectedBuddy} className="mb-4">
                  {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Compass className="h-4 w-4 mr-2" />}
                  Get Adaptation Suggestions
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md">
            {recommendationsLoading ? <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div> : recommendations ? <div className="whitespace-pre-wrap">
                {recommendations}
              </div> : <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <p>Click the button above to get recommendations from {selectedBuddy?.name}</p>
              </div>}
          </div>
          
          {selectedDay?.pointsOfInterest && selectedDay.pointsOfInterest.length > 0 && <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Points of Interest in {selectedDay.city}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2">
                {selectedDay.pointsOfInterest.map((poi, index) => <div key={index} className="flex items-start space-x-2 border rounded p-2">
                    {poi.image && <img src={poi.image} alt={poi.name} className="w-16 h-16 object-cover rounded" />}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{poi.name}</span>
                        <Badge variant="outline">{poi.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{poi.description.length > 100 ? `${poi.description.substring(0, 100)}...` : poi.description}</p>
                      {poi.mustSee && <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-300">Must See</Badge>}
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
      </Modal>
    </div>;
};