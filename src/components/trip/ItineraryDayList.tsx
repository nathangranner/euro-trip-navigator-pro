
import React from "react";
import { DayCard } from "./DayCard";
import { TripDay, Activity } from "@/types/trip";

interface ItineraryDayListProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
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
        <p className="text-gray-500">No itinerary data available. Your Europe Trip 2025 should load automatically!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tripDays.map((day, index) => (
        <DayCard
          key={`${day.id}-${day.dayNumber}-${index}`}
          day={day}
          index={index}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onViewMap={onViewMap}
        />
      ))}
    </div>
  );
}
