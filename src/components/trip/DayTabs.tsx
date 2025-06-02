
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { TripDay } from "@/types/trip";

interface DayTabsProps {
  tripDays: TripDay[];
}

export default function DayTabs({ tripDays }: DayTabsProps) {
  return (
    <>
      {tripDays.map((day, idx) => (
        <TabsTrigger
          key={`tab-${day.id}-${day.dayNumber}-${idx}`}
          value={day.id}
          className="text-sm"
        >
          Day {day.dayNumber}: {day.city}
        </TabsTrigger>
      ))}
    </>
  );
}
