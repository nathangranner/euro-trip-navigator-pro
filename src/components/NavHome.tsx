
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NavHome: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute top-8 left-8 z-10 opacity-90 hover:opacity-100 transition-opacity">
      <Button 
        onClick={() => navigate("/")}
        variant="outline"
        size="sm"
        className="bg-slate-800/90 backdrop-blur-sm border-slate-700 text-white hover:bg-slate-700/90 tracking-wider px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        HOME
      </Button>
    </div>
  );
};

export default NavHome;
