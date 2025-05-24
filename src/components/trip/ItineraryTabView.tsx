
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import DayTabs from "./DayTabs";
import DayPanels from "./DayPanels";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface ItineraryTabViewProps {
  tripDays: DatabaseTripDay[];
  onEditDay?: (day: DatabaseTripDay) => void;
  onEditActivity?: (activity: any, dayId: string) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export default function ItineraryTabView({
  tripDays,
  onEditDay,
  onEditActivity,
  onViewMap,
}: ItineraryTabViewProps) {
  const [current, setCurrent] = useState(tripDays[0]?.id || "");
  
  if (!tripDays || tripDays.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No itinerary data available. Create a trip to get started!</p>
      </div>
    );
  }

  return (
    <Tabs value={current} onValueChange={setCurrent}>
      <DayTabs tripDays={tripDays} current={current} onChange={setCurrent} />
      <DayPanels 
        tripDays={tripDays} 
        onEditDay={onEditDay}
        onEditActivity={onEditActivity}
        onViewMap={onViewMap}
      />
    </Tabs>
  );
}
