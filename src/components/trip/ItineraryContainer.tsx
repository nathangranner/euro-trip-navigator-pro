
import React, { useState } from "react";
import ItineraryDayList from "./ItineraryDayList";
import ItineraryTabView from "./ItineraryTabView";
import { Button } from "@/components/ui/button";
import { TripDay, Activity } from "@/types/trip";

interface ItineraryContainerProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}

export default function ItineraryContainer({
  tripDays,
  onEditDay,
  onEditActivity,
  onViewMap,
}: ItineraryContainerProps) {
  const [view, setView] = useState<"list" | "tabs">("list");
  
  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <Button 
          onClick={() => setView("tabs")} 
          variant={view === "tabs" ? "default" : "outline"}
          size="sm"
        >
          Tabs View
        </Button>
        <Button 
          onClick={() => setView("list")} 
          variant={view === "list" ? "default" : "outline"}
          size="sm"
        >
          List View
        </Button>
      </div>
      {view === "list" ? (
        <ItineraryDayList
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onViewMap={onViewMap}
        />
      ) : (
        <ItineraryTabView
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onViewMap={onViewMap}
        />
      )}
    </div>
  );
}
