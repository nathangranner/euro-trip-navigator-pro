
import React from "react";
import ItineraryDayCard from "./ItineraryDayCard";
import { TripDay, Activity } from "@/types/trip";

interface ItineraryDayListProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}

export default function ItineraryDayList({
  tripDays,
  onEditDay,
  onEditActivity,
  onDeleteActivity,
  onViewMap,
}: ItineraryDayListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {tripDays.map((day, index) => (
        <ItineraryDayCard
          key={`day-${day.id}-${index}`}
          day={day}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onViewMap={onViewMap}
        />
      ))}
    </div>
  );
}
