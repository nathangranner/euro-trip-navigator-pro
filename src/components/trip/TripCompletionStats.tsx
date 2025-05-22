
import React from "react";
import { StatsCard } from "./StatsCard";
import { TripDay } from "@/data/tripData";

interface TripCompletionStatsProps {
  tripDays: TripDay[];
}

export const calculateCompletionStats = (tripDays: TripDay[]) => {
  let completed = 0;
  let total = 0;
  
  tripDays.forEach(day => {
    if (day.activities) { // Add this check to ensure activities exists
      day.activities.forEach(activity => {
        total++;
        if (activity.completed) {
          completed++;
        }
      });
    }
  });
  
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};

export const TripCompletionCard: React.FC<TripCompletionStatsProps> = ({ tripDays }) => {
  const completionStats = calculateCompletionStats(tripDays);
  
  return (
    <StatsCard
      title="Activities Completed"
      value={`${completionStats.completed} / ${completionStats.total}`}
      footer={
        <>
          <div className="w-full bg-blue-400/50 rounded-full h-2.5 mt-2">
            <div 
              className="bg-gray-100 h-2.5 rounded-full" 
              style={{ width: `${completionStats.percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-100 mt-1 font-light tracking-wide">{completionStats.percentage}% Complete</div>
        </>
      }
    />
  );
};
