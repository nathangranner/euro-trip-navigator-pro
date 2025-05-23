
import React from 'react';
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  onSave
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Set OpenRouter API Key" 
      footer={
        <Button onClick={onSave} className="ml-auto">
          Save API Key
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          To use the translation feature, you need an OpenRouter API key. 
          Get your key at <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">openrouter.ai</a>.
        </p>
        
        <Input 
          type="password" 
          value={apiKey} 
          onChange={e => setApiKey(e.target.value)} 
          placeholder="sk-or-v1-xxxxxxxx" 
          className="w-full" 
        />
        
        <p className="text-xs text-gray-500">
          Your API key will be securely stored in your account for future use.
        </p>
      </div>
    </Modal>
  );
};
