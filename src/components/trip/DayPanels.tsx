
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ItineraryDayContent from "./ItineraryDayContent";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface DayPanelsProps {
  tripDays: DatabaseTripDay[];
  onEditDay?: (day: DatabaseTripDay) => void;
  onEditActivity?: (activity: any, dayId: string) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export default function DayPanels({ tripDays, onEditDay, onEditActivity, onViewMap }: DayPanelsProps) {
  return (
    <>
      {tripDays.map((day, idx) => (
        <TabsContent key={`content-${day.id}-${day.day_number}-${idx}`} value={day.id}>
          <ItineraryDayContent 
            tripDay={day} 
            onEditDay={onEditDay}
            onEditActivity={onEditActivity}
            onViewMap={onViewMap}
          />
        </TabsContent>
      ))}
    </>
  );
}
