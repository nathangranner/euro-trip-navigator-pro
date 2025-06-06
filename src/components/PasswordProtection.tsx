
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Info } from "lucide-react";

interface PasswordProtectionProps {
  onPasswordCorrect: () => void;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Martin9330") {
      localStorage.setItem("eurotrip25_auth", "authenticated");
      localStorage.setItem("eurotrip25_auth_timestamp", Date.now().toString());
      onPasswordCorrect();
      setIsError(false);
    } else {
      setIsError(true);
      setPassword("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Lock className="h-5 w-5 mr-2 text-white opacity-70" />
          <span className="text-sm tracking-wider uppercase text-white opacity-70">Access Code Required</span>
        </div>
        
        <div className="flex items-start gap-2 p-3 bg-blue-900 bg-opacity-30 border border-blue-700 border-opacity-50 rounded-lg mb-4">
          <Info className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-200 leading-relaxed">
            Your login will be saved and you won't need to enter the code again until you manually log out.
          </p>
        </div>

        <div className="relative">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            className={`bg-black bg-opacity-40 border-white border-opacity-30 text-white placeholder:text-white placeholder:opacity-50 text-center tracking-wider ${
              isError ? "border-red-400 border-opacity-60" : ""
            }`}
            autoFocus
          />
          {isError && (
            <p className="text-red-300 text-xs mt-2 text-center tracking-wide">
              Invalid access code. Please try again.
            </p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 text-white tracking-wider uppercase text-sm transition-all duration-300"
        >
          Enter
        </Button>
      </form>
    </div>
  );
};

export default PasswordProtection;
