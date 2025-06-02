import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TripDay, Activity } from "@/types/trip";
import DayHeader from "./DayHeader";
import ItineraryDayContent from "./ItineraryDayContent";
interface ItineraryDayCardProps {
  day: TripDay;
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
  onViewMap?: (day: TripDay) => void;
}
export default function ItineraryDayCard({
  day,
  onEditDay,
  onEditActivity,
  onDeleteActivity,
  onViewMap
}: ItineraryDayCardProps) {
  return <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <DayHeader day={day} onEditDay={onEditDay} onViewMap={onViewMap} />
      <CardContent className="p-3 sm:p-6 bg-sky-900">
        <ItineraryDayContent day={day} onEditActivity={onEditActivity} onDeleteActivity={onDeleteActivity} />
      </CardContent>
    </Card>;
}