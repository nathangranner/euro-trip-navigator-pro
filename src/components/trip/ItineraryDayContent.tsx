
import React from "react";
import { TripDay, Activity } from "@/types/trip";
import AccommodationSection from "./AccommodationSection";
import ActivitiesSection from "./ActivitiesSection";
import WeatherSection from "./WeatherSection";

interface ItineraryDayContentProps {
  day: TripDay;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
}

export default function ItineraryDayContent({ 
  day, 
  onEditActivity,
  onDeleteActivity 
}: ItineraryDayContentProps) {
  return (
    <div className="space-y-4">
      <AccommodationSection
        accommodation={day.accommodation}
        accommodationName={day.accommodationName}
        accommodationAddress={day.accommodationAddress}
        accommodationCheckIn={day.accommodationCheckIn}
        accommodationCheckOut={day.accommodationCheckOut}
        accommodationContact={day.accommodationContact}
        accommodationConfirmation={day.accommodationConfirmation}
      />
      
      <ActivitiesSection
        activities={day.activities}
        tripDayId={day.id}
        onEditActivity={onEditActivity}
        onDeleteActivity={onDeleteActivity}
      />
      
      <WeatherSection
        weather={day.weather}
        temperature={day.weatherTemp}
        condition={day.weatherCondition}
      />
    </div>
  );
}
