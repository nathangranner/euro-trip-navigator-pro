import React from "react";
import { Button } from "@/components/ui/button";
import { Map, Edit } from "lucide-react";
import { DatabaseTripDay } from "@/hooks/useTripData";
import { formatDisplayDate } from "@/utils/dateUtils";

interface DayHeaderProps {
  tripDay: DatabaseTripDay;
  onEditDay?: (day: DatabaseTripDay) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export default function DayHeader({ tripDay, onEditDay, onViewMap }: DayHeaderProps) {
  return (
    <div className="bg-slate-50 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">
            Day {tripDay.day_number}: {tripDay.city}
          </h3>
          <p className="text-sm text-gray-600">{tripDay.title}</p>
          <p className="text-sm text-gray-500">
            {formatDisplayDate(tripDay.date)}
          </p>
        </div>
        <div className="flex gap-2">
          {onViewMap && tripDay.accommodation_address && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewMap(tripDay)}
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
              onClick={() => onEditDay(tripDay)}
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
