
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";

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
            This feature is no longer needed. Travel Buddy now works without requiring personal API keys.
          </p>
          
          <div className="text-xs text-gray-500 border-t pt-4 mt-4">
            <p>The travel buddy feature now uses server-side processing and no longer requires personal API keys.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
