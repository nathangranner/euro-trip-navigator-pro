
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Loader2, Send } from "lucide-react";
import { TravelConciergeMessage, TravelConcierge } from './types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedConcierge: TravelConcierge | null;
  messages: TravelConciergeMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  loading: boolean;
  onSendMessage: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedConcierge,
  messages,
  inputMessage,
  setInputMessage,
  loading,
  onSendMessage
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={selectedConcierge ? `Chat with ${selectedConcierge.name}` : "Chat with Concierge"}
    >
      <div className="flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-md">
          {messages.filter(msg => msg.role !== "system").map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-white border rounded-bl-none shadow-sm"}`}>
                <div className="flex items-center mb-1">
                  {message.role === "assistant" && selectedConcierge && (
                    <img 
                      src={selectedConcierge.avatar} 
                      alt={selectedConcierge.name} 
                      className="w-6 h-6 rounded-full mr-2 object-cover" 
                    />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === "user" ? "You" : selectedConcierge?.name}
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
                  {selectedConcierge && (
                    <img 
                      src={selectedConcierge.avatar} 
                      alt={selectedConcierge.name} 
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
            placeholder="Ask your concierge a question..." 
            value={inputMessage} 
            onChange={e => setInputMessage(e.target.value)} 
            onKeyPress={e => e.key === "Enter" && !loading && onSendMessage()} 
            className="flex-1" 
            disabled={loading} 
          />
          <Button 
            onClick={onSendMessage} 
            disabled={!inputMessage.trim() || loading} 
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
