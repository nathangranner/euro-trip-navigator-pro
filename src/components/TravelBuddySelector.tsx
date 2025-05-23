
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, MessageCircle, User, Key, Settings, LogIn } from "lucide-react";
import { saveApiKey, getApiKey, hasApiKey, clearApiKey } from "@/utils/storageUtils";
import { europeTrip, TripDay } from '@/data/tripData';
import { supabase } from "@/integrations/supabase/client";
import { TravelBuddy, TravelBuddyMessage, TravelBuddySelectorProps } from './travel-buddy/types';
import { TRAVEL_BUDDIES } from './travel-buddy/travel-buddy-data';
import { TravelBuddyCard } from './travel-buddy/TravelBuddyCard';
import { ApiKeyModal } from './travel-buddy/ApiKeyModal';
import { ApiSettingsModal } from './travel-buddy/ApiSettingsModal';
import { LoginModal } from './travel-buddy/LoginModal';
import { ChatModal } from './travel-buddy/ChatModal';
import { RecommendationsModal } from './travel-buddy/RecommendationsModal';

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
  const [showApiSettingsModal, setShowApiSettingsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
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

  // Check user auth status on mount
  useEffect(() => {
    const checkUser = async () => {
      setCheckingAuth(true);
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setCheckingAuth(false);
      
      if (user) {
        // Check for saved API key
        const keyExists = await hasApiKey("openrouter");
        if (keyExists) {
          const storedKey = await getApiKey("openrouter");
          setApiKey(storedKey);
        }
      }
    };
    
    checkUser();
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
      // Check if user is logged in
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
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

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    if (!isLoggedIn) {
      toast.error("Please log in to save your API key");
      setShowLoginModal(true);
      return;
    }
    
    const success = await saveApiKey("openrouter", apiKey.trim());
    
    if (success) {
      setShowApiKeyModal(false);
      toast.success("OpenRouter API key saved");
      
      // Now try chatting again if a buddy is selected
      if (selectedBuddy) {
        handleStartChat();
      }
    } else {
      toast.error("Failed to save API key. Please try again.");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (data.user) {
        setIsLoggedIn(true);
        setShowLoginModal(false);
        toast.success("Login successful!");
        
        // If we have an API key in state, save it now
        if (apiKey) {
          await saveApiKey("openrouter", apiKey);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success("Account created! Please check your email for verification.");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleOpenApiSettings = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowApiSettingsModal(true);
  };

  const handleClearApiKey = async () => {
    const success = await clearApiKey("openrouter");
    if (success) {
      setApiKey("");
      toast.success("API key removed");
      setShowApiSettingsModal(false);
    } else {
      toast.error("Failed to remove API key");
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
          messages: apiMessages.filter(msg => msg.role !== "system" || (msg.role === "system" && apiMessages.indexOf(msg) === 0))
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

  if (checkingAuth) {
    return (
      <div>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Choose Your Concierge</h2>
      <p className="text-gray-600 mb-6">Select an AI companion to help with your European adventure</p>
      
      {!isLoggedIn && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center">
            <LogIn className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-amber-800 font-medium">Sign in to save your API key</p>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            Log in or create an account to securely store your OpenRouter API key for future sessions.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowLoginModal(true)} 
            className="mt-2"
          >
            Login or Sign up
          </Button>
        </div>
      )}
      
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          onClick={handleOpenApiSettings}
          className="flex items-center gap-2"
          size="sm"
        >
          <Key className="h-4 w-4" />
          Manage API Key
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {TRAVEL_BUDDIES.map(buddy => (
          <TravelBuddyCard
            key={buddy.id}
            buddy={buddy}
            isSelected={selectedBuddy?.id === buddy.id}
            onSelect={handleSelectBuddy}
          />
        ))}
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <Button 
            onClick={handleStartChat} 
            disabled={!selectedBuddy} 
            className="px-6 flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with {selectedBuddy ? selectedBuddy.name : "your buddy"}
          </Button>
        </div>
        
        {selectedBuddy && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Get Location Recommendations</h3>
            <p className="text-sm text-gray-600 mb-4">
              Let {selectedBuddy.name} suggest interesting places and itinerary adaptations for each day of your trip
            </p>
            
            <p className="text-sm text-gray-500 mb-4">
              Your journey will take you through regions rich in European history. Italy offers Renaissance masterpieces, ancient Roman ruins, and medieval cities. Switzerland features Alpine traditions and neutral ground during major conflicts. Germany's landscape tells stories from the Holy Roman Empire through the modern era. Your concierge can provide historical context to enhance your travel experience.
            </p>
            
            <div className="space-y-4 mt-4">
              {tripDays.map(day => (
                <Card key={day.dayNumber} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Day {day.dayNumber}: {day.city}</h4>
                      <p className="text-sm text-gray-500">{new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleOpenRecommendations(day)} 
                      className="flex items-center gap-1"
                    >
                      <Compass className="h-4 w-4" /> Get Recommendations
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSave={handleSaveApiKey}
      />
      
      <ApiSettingsModal
        isOpen={showApiSettingsModal}
        onClose={() => setShowApiSettingsModal(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onClearApiKey={handleClearApiKey}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <ChatModal
        isOpen={chatOpen}
        onClose={handleCloseChat}
        selectedBuddy={selectedBuddy}
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
        selectedBuddy={selectedBuddy}
        handleGetRecommendations={handleGetRecommendations}
      />
    </div>
  );
};
