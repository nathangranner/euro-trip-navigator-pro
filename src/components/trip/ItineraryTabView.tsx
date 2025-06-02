import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { TripDay, Activity } from "@/types/trip";
import { DayCard } from "./DayCard";
import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
interface ItineraryTabViewProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}
export default function ItineraryTabView({
  tripDays,
  onEditDay,
  onEditActivity,
  onViewMap
}: ItineraryTabViewProps) {
  const [current, setCurrent] = useState(tripDays[0]?.id || "");
  if (!tripDays || tripDays.length === 0) {
    return <div className="p-4 sm:p-8 text-center">
        <p className="text-gray-500 text-sm sm:text-base">No itinerary data available. Your Europe Trip 2025 should load automatically!</p>
      </div>;
  }
  return <Tabs value={current} onValueChange={setCurrent}>
      <div className="mb-4 p-1 rounded-lg bg-travel-blue">
        <TabsList className="w-full bg-transparent p-0 h-auto grid-cols-none flex overflow-x-auto scrollbar-hide">
          {tripDays.map((day, idx) => <TabsTrigger key={`tab-${day.id}-${day.dayNumber}-${idx}`} value={day.id} className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-2 flex-shrink-0 min-w-fit font-normal text-amber-500">
              Day {day.dayNumber}: {day.city}
            </TabsTrigger>)}
        </TabsList>
      </div>
      
      {tripDays.map((day, idx) => <TabsContent key={`content-${day.id}-${day.dayNumber}-${idx}`} value={day.id}>
          <DayCard day={day} index={idx} onEditDay={onEditDay} onEditActivity={onEditActivity} onViewMap={onViewMap} />
        </TabsContent>)}
    </Tabs>;
}