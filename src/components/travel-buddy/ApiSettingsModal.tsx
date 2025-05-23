
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";
import { saveApiKey } from "@/utils/storageUtils";

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onClearApiKey: () => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  apiKey, 
  setApiKey, 
  onClearApiKey 
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="API Key Settings" 
      footer={
        <div className="flex justify-between w-full">
          <Button 
            onClick={onClearApiKey} 
            variant="destructive"
          >
            Remove API Key
          </Button>
          <Button 
            onClick={onClose} 
            variant="outline"
          >
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">OpenRouter API Key</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your API key is securely stored in your Supabase account.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <Input 
              type="password" 
              value={apiKey} 
              onChange={e => setApiKey(e.target.value)} 
              className="flex-1" 
              placeholder="sk-or-v1-xxxxxxxx"
            />
            <Button 
              onClick={async () => {
                if (apiKey.trim()) {
                  const success = await saveApiKey("openrouter", apiKey.trim());
                  if (success) {
                    toast.success("API key updated");
                  } else {
                    toast.error("Failed to update API key");
                  }
                } else {
                  toast.error("Please enter a valid API key");
                }
              }}
              size="sm"
            >
              Update
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 border-t pt-4 mt-4">
          <p>Your API key is stored securely and used for:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Travel buddy conversations</li>
            <li>City recommendations</li>
            <li>Translation services</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
