
import React from "react";

interface DateProgressProps {
  days: number;
}

const DateProgress: React.FC<DateProgressProps> = ({ days }) => {
  const progressPercentage = (days / 21) * 100;
  
  return (
    <div className="my-12 max-w-4xl mx-auto px-4">
      <div className="flex justify-between text-xs uppercase mb-2 text-white/80 tracking-wider">
        <span>June 5</span>
        <span>June 26</span>
      </div>
      <div className="h-1 bg-white/20 rounded-full">
        <div 
          className="h-1 bg-gold rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }} 
        />
      </div>
      <div className="text-center mt-3">
        <span className="text-sm text-white/70 tracking-wide">
          {days} of 21 days planned
        </span>
      </div>
    </div>
  );
};

export default DateProgress;
