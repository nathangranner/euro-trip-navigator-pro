
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NavHome: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute top-6 left-6 z-50">
      <Button 
        onClick={() => navigate("/")}
        variant="outline"
        size="sm"
        className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Return Home
      </Button>
    </div>
  );
};

export default NavHome;
