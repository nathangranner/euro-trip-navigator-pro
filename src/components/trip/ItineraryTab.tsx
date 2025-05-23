
import React from "react";
import { TripDay, Activity } from "@/data/tripData";
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
  return (
    <TabsContent value="itinerary" className="space-y-4">
      {tripDays.map((day, index) => (
        <DayCard 
          key={index} 
          day={day} 
          index={index} 
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
        />
      ))}
    </TabsContent>
  );
};
