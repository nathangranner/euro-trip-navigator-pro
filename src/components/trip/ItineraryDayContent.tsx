
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
  // Convert TripDay activities to DatabaseActivity format for ActivitiesSection
  const convertedActivities = day.activities?.map(activity => ({
    id: activity.id,
    trip_day_id: day.id,
    time: activity.time,
    activity: activity.activity,
    type: activity.type,
    location: activity.location,
    notes: activity.note,
    duration: activity.duration,
    completed: activity.completed,
    booking_required: activity.booked || false,
    contact_info: activity.contactInfo,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })) || [];

  return (
    <div className="space-y-4">
      <AccommodationSection
        accommodationName={day.accommodationName}
        accommodationAddress={day.accommodationAddress}
        accommodationCheckIn={day.accommodationCheckIn}
        accommodationCheckOut={day.accommodationCheckOut}
        accommodationContact={day.accommodationContact}
        accommodationConfirmation={day.accommodationConfirmation}
      />
      
      <ActivitiesSection
        activities={convertedActivities}
        tripDayId={day.id}
        onEditActivity={onEditActivity}
        onDeleteActivity={onDeleteActivity}
      />
      
      <WeatherSection
        temperature={day.weather?.temp}
        condition={day.weather?.condition}
      />
    </div>
  );
}
