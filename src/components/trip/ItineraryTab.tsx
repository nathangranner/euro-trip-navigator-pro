
import React from "react";
import { TripDay, Activity } from "@/types/trip";
import { DayCard } from "./DayCard";
import { TabsContent } from "@/components/ui/tabs";

interface ItineraryTabProps {
  tripDays: TripDay[];
  onEditDay: (day: TripDay) => void;
  onEditActivity: (activity: Activity, dayId: string) => void;
}

export const ItineraryTab: React.FC<ItineraryTabProps> = ({ 
  tripDays, 
  onEditDay, 
  onEditActivity 
}) => {
  // Debug to check tripDays data
  React.useEffect(() => {
    console.log("TripDays in ItineraryTab:", tripDays);
    // Check if activities exist in each day
    tripDays.forEach(day => {
      console.log(`Day ${day.dayNumber} has ${day.activities?.length || 0} activities`);
    });
  }, [tripDays]);

  return (
    <TabsContent value="itinerary" className="space-y-4">
      {tripDays.map((day, index) => (
        <DayCard 
          key={day.id || index} 
          day={day} 
          index={index} 
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
        />
      ))}
    </TabsContent>
  );
};
