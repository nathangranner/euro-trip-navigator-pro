
import React from "react";
import { TripDay } from "@/data/tripData";
import { DayCard } from "./DayCard";
import { TabsContent } from "@/components/ui/tabs";

interface ItineraryTabProps {
  tripDays: TripDay[];
  onViewMap: (day: TripDay) => void;
}

export const ItineraryTab: React.FC<ItineraryTabProps> = ({ tripDays, onViewMap }) => {
  return (
    <TabsContent value="itinerary" className="space-y-4">
      {tripDays.map((day, index) => (
        <DayCard key={index} day={day} index={index} onViewMap={onViewMap} />
      ))}
    </TabsContent>
  );
};
