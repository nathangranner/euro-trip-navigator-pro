import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const NavHome: React.FC = () => {
  const navigate = useNavigate();
  return <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-50 opacity-90 hover:opacity-100 transition-opacity">
      <Button onClick={() => navigate("/")} variant="outline" size="sm" className="backdrop-blur-sm border-slate-700 tracking-wider px-3 sm:px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl text-xs sm:text-sm text-amber-800 bg-gray-950 hover:bg-gray-800">
        <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        HOME
      </Button>
    </div>;
};
export default NavHome;