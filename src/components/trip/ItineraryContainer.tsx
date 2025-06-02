
import React, { useState } from "react";
import ItineraryDayList from "./ItineraryDayList";
import ItineraryTabView from "./ItineraryTabView";
import { Button } from "@/components/ui/button";
import { TripDay, Activity } from "@/types/trip";

interface ItineraryContainerProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}

export default function ItineraryContainer({
  tripDays,
  onEditDay,
  onEditActivity,
  onDeleteActivity,
  onViewMap,
}: ItineraryContainerProps) {
  const [view, setView] = useState<"list" | "tabs">("list");
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <Button 
          onClick={() => setView("tabs")} 
          variant={view === "tabs" ? "default" : "outline"}
          size="sm"
          className="w-full sm:w-auto text-xs sm:text-sm"
        >
          Tabs View
        </Button>
        <Button 
          onClick={() => setView("list")} 
          variant={view === "list" ? "default" : "outline"}
          size="sm"
          className="w-full sm:w-auto text-xs sm:text-sm"
        >
          List View
        </Button>
      </div>
      {view === "list" ? (
        <ItineraryDayList
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onViewMap={onViewMap}
        />
      ) : (
        <ItineraryTabView
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onViewMap={onViewMap}
        />
      )}
    </div>
  );
}
