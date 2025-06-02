
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DayTabs from "./DayTabs";
import DayPanels from "./DayPanels";
import { TripDay, Activity } from "@/types/trip";

interface ItineraryTabViewProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}

export default function ItineraryTabView({
  tripDays,
  onEditDay,
  onEditActivity,
  onDeleteActivity,
  onViewMap,
}: ItineraryTabViewProps) {
  if (!tripDays || tripDays.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No trip days available.
      </div>
    );
  }

  return (
    <Tabs defaultValue={tripDays[0]?.id} className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 h-auto p-1">
        <DayTabs tripDays={tripDays} />
      </TabsList>
      <div className="mt-4">
        <DayPanels 
          tripDays={tripDays} 
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onViewMap={onViewMap}
        />
      </div>
    </Tabs>
  );
}
