
import React from "react";
import { Button } from "@/components/ui/button";
import { Map, Edit } from "lucide-react";
import { TripDay } from "@/types/trip";
import { formatDisplayDate } from "@/utils/dateUtils";

interface DayHeaderProps {
  day: TripDay;
  onEditDay?: (day: TripDay) => void;
  onViewMap?: (day: TripDay) => void;
}

export default function DayHeader({ day, onEditDay, onViewMap }: DayHeaderProps) {
  if (!day) {
    return null;
  }

  return (
    <div className="bg-slate-50 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">
            Day {day.dayNumber}: {day.city}
          </h3>
          <p className="text-sm text-gray-600">{day.title}</p>
          <p className="text-sm text-gray-500">
            {formatDisplayDate(day.date)}
          </p>
        </div>
        <div className="flex gap-2">
          {onViewMap && (day.accommodationAddress || day.accommodation?.address) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewMap(day)}
              className="flex items-center gap-2"
            >
              <Map className="h-4 w-4" />
              View Map
            </Button>
          )}
          {onEditDay && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEditDay(day)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Day
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
