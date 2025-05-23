
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface AuthNoticeProps {
  onShowLogin: () => void;
}

export const AuthNotice: React.FC<AuthNoticeProps> = ({ onShowLogin }) => {
  return (
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
        onClick={onShowLogin} 
        className="mt-2"
      >
        Login or Sign up
      </Button>
    </div>
  );
};
