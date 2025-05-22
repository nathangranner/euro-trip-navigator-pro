
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
        <div className="text-sm text-gray-500">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      }
    />
  );
};
