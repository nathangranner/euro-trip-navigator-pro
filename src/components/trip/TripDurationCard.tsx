
import React from "react";
import { StatsCard } from "./StatsCard";
import { formatDate } from "./DateFormatter";

interface TripDurationCardProps {
  daysCount: number;
  startDate: string;
  endDate: string;
}

export const TripDurationCard: React.FC<TripDurationCardProps> = ({ 
  daysCount, 
  startDate, 
  endDate 
}) => {
  return (
    <StatsCard
      title="Trip Duration"
      value={`${daysCount} Days`}
      footer={
        <div className="text-sm text-gray-100 font-light tracking-wide">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      }
    />
  );
};
