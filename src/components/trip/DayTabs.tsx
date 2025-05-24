
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface DayTabsProps {
  tripDays: DatabaseTripDay[];
  current: string;
  onChange: (value: string) => void;
}

export default function DayTabs({ tripDays, current, onChange }: DayTabsProps) {
  return (
    <TabsList className="mb-4">
      {tripDays.map((day, idx) => (
        <TabsTrigger
          key={`tab-${day.id}-${day.day_number}-${idx}`}
          value={day.id}
          className="text-sm"
        >
          Day {day.day_number}: {day.city}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
