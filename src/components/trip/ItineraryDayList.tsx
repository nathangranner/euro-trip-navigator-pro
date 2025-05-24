
import React from "react";
import ItineraryDayCard from "./ItineraryDayCard";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface ItineraryDayListProps {
  tripDays: DatabaseTripDay[];
  onEditDay?: (day: DatabaseTripDay) => void;
  onEditActivity?: (activity: any, dayId: string) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export default function ItineraryDayList({
  tripDays,
  onEditDay,
  onEditActivity,
  onViewMap,
}: ItineraryDayListProps) {
  if (!tripDays || tripDays.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No itinerary data available. Create a trip to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tripDays.map((day, index) => (
        <ItineraryDayCard
          key={`${day.id}-${day.day_number}-${index}`}
          tripDay={day}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onViewMap={onViewMap}
        />
      ))}
    </div>
  );
}
