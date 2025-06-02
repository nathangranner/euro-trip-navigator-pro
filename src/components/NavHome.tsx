
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NavHome: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-2 sm:top-4 left-4 sm:left-8 z-50 opacity-90 hover:opacity-100 transition-opacity">
      <Button 
        onClick={() => navigate("/")} 
        variant="outline" 
        className="backdrop-blur-sm border-slate-700 tracking-wider px-2 sm:px-3 py-1 shadow-lg transition-all duration-300 hover:shadow-xl text-xs text-amber-800 bg-gray-950 hover:bg-gray-800"
      >
        <ArrowLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
        HOME
      </Button>
    </div>
  );
};

export default NavHome;
