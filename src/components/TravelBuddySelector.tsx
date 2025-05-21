
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import { Bot, User, Loader2, Send } from "lucide-react";

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

const TRAVEL_BUDDIES: TravelBuddy[] = [
  {
    id: "claude",
    name: "Sophie",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format",
    description: "Worldly travel expert with knowledge of European history and culture",
    model: "anthropic/claude-3-opus",
    systemPrompt: "You are Sophie, a worldly travel expert with extensive knowledge of European history, culture, and hidden gems. You specialize in Italy, Switzerland, and Germany. Be conversational, warm, and personable. Provide specific, actionable travel advice when asked. You have extensive knowledge about European customs, local foods, and off-the-beaten-path destinations. If asked about something outside your expertise, politely redirect to travel-related topics you can help with."
  },
  {
    id: "gpt4o",
    name: "Marco",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format",
    description: "Local European guide with insider knowledge of restaurants and activities",
    model: "openai/gpt-4o",
    systemPrompt: "You are Marco, a local European guide with insider knowledge of the best restaurants, activities, and hidden spots across Italy, Switzerland, and Germany. You have lived in these countries for years and know the authentic experiences tourists often miss. Be friendly, enthusiastic, and speak casually as if talking to a friend. Focus on providing specific recommendations with local insights when asked. You excel at suggesting food, entertainment options, and how to interact with locals."
  },
  {
    id: "llama",
    name: "Professor Ludwig",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format",
    description: "History professor specializing in European art and architecture",
    model: "meta/llama-3-70b-instruct",
    systemPrompt: "You are Professor Ludwig, a history professor specializing in European art and architecture with decades of experience. You provide fascinating historical context for landmarks and cities in Italy, Switzerland, and Germany. Speak in a slightly formal but approachable manner, showing enthusiasm when discussing historical subjects. You excel at explaining the historical significance of buildings, artwork, and monuments. When asked questions, focus on providing educational and enriching responses that add depth to a traveler's experience."
  }
];

export const TravelBuddySelector: React.FC = () => {
  const [selectedBuddy, setSelectedBuddy] = useState<TravelBuddy | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<TravelBuddyMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectBuddy = (buddy: TravelBuddy) => {
    setSelectedBuddy(buddy);
    setMessages([
      {
        role: "system",
        content: buddy.systemPrompt
      }
    ]);
    toast.success(`${buddy.name} is now your travel buddy!`);
  };

  const handleStartChat = () => {
    if (selectedBuddy) {
      setChatOpen(true);
    } else {
      toast.error("Please select a travel buddy first");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedBuddy) return;
    
    const userMessage = { role: "user" as const, content: inputMessage };
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
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || ''}`, // This would need to be set in your environment
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Europe Trip Planner'
        },
        body: JSON.stringify({
          model: selectedBuddy.model,
          messages: apiMessages
        }),
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
      toast.error("Couldn't connect with your travel buddy. You may need to set up an OpenRouter API key.");
      
      // Fallback response if API call fails
      const fallbackMessage = {
        role: "assistant" as const,
        content: "I'm having trouble connecting right now. To chat with your travel buddy, you'll need to set up an OpenRouter API key. Check the console for more information."
      };
      
      setMessages([...messages, userMessage, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Choose Your Travel Buddy</h2>
      <p className="text-gray-600 mb-6">Select an AI companion to help with your European adventure</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {TRAVEL_BUDDIES.map((buddy) => (
          <Card 
            key={buddy.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedBuddy?.id === buddy.id ? 'ring-2 ring-blue-500 shadow-md' : ''
            }`}
            onClick={() => handleSelectBuddy(buddy)}
          >
            <div className="flex items-center mb-3">
              <img 
                src={buddy.avatar} 
                alt={buddy.name} 
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <h3 className="font-semibold">{buddy.name}</h3>
                <p className="text-sm text-gray-500">{buddy.model.split('/')[0]}</p>
              </div>
            </div>
            <p className="text-sm">{buddy.description}</p>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleStartChat}
          disabled={!selectedBuddy}
          className="px-6"
        >
          Chat with {selectedBuddy ? selectedBuddy.name : "your buddy"}
        </Button>
      </div>

      {/* Chat Modal */}
      <Modal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        title={selectedBuddy ? `Chat with ${selectedBuddy.name}` : "Chat with Travel Buddy"}
      >
        <div className="flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-md">
            {messages.filter(msg => msg.role !== "system").map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" 
                    ? "bg-blue-500 text-white rounded-br-none" 
                    : "bg-white border rounded-bl-none shadow-sm"
                }`}>
                  <div className="flex items-center mb-1">
                    {message.role === "assistant" && selectedBuddy && (
                      <img 
                        src={selectedBuddy.avatar} 
                        alt={selectedBuddy.name} 
                        className="w-6 h-6 rounded-full mr-2 object-cover" 
                      />
                    )}
                    <span className="text-xs font-medium">
                      {message.role === "user" ? "You" : selectedBuddy?.name}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white border rounded-bl-none shadow-sm">
                  <div className="flex items-center">
                    {selectedBuddy && (
                      <img 
                        src={selectedBuddy.avatar} 
                        alt={selectedBuddy.name} 
                        className="w-6 h-6 rounded-full mr-2 object-cover" 
                      />
                    )}
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Ask your travel buddy a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSendMessage()}
              className="flex-1"
              disabled={loading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || loading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
