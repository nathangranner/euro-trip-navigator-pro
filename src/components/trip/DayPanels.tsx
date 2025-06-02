
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ItineraryDayContent from "./ItineraryDayContent";
import DayHeader from "./DayHeader";
import { TripDay, Activity } from "@/types/trip";

interface DayPanelsProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}

export default function DayPanels({ 
  tripDays, 
  onEditDay, 
  onEditActivity, 
  onDeleteActivity,
  onViewMap 
}: DayPanelsProps) {
  return (
    <>
      {tripDays.map((day, idx) => (
        <TabsContent key={`content-${day.id}-${day.dayNumber}-${idx}`} value={day.id}>
          <DayHeader 
            day={day} 
            onEditDay={onEditDay}
            onViewMap={onViewMap}
          />
          <ItineraryDayContent 
            day={day} 
            onEditActivity={onEditActivity}
            onDeleteActivity={onDeleteActivity}
          />
        </TabsContent>
      ))}
    </>
  );
}
