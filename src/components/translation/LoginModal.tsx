
import React from 'react';
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
  onSignup: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onSignup
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Login or Create Account" 
      footer={
        <div className="flex justify-between w-full">
          <Button onClick={onSignup} variant="outline">
            Sign Up
          </Button>
          <Button onClick={onLogin}>
            Login
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Please log in or create an account to securely store your API key.
        </p>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="your@email.com" 
            className="w-full mt-1" 
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="********" 
            className="w-full mt-1" 
          />
        </div>
      </div>
    </Modal>
  );
};
