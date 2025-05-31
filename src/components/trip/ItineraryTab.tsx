
import React, { useState } from "react";
import { TripDay, Activity } from "@/types/trip";
import { Button } from "@/components/ui/button";
import ItineraryDayList from "./ItineraryDayList";
import ItineraryTabView from "./ItineraryTabView";

interface ItineraryTabProps {
  tripDays: TripDay[];
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
}

export const ItineraryTab: React.FC<ItineraryTabProps> = ({
  tripDays,
  onEditDay,
  onEditActivity,
}) => {
  const [view, setView] = useState<"list" | "tabs">("list");

  const handleViewMap = (day: TripDay) => {
    const address = day.accommodation?.address || day.accommodationAddress;
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  };

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
          onViewMap={handleViewMap}
        />
      ) : (
        <ItineraryTabView
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onViewMap={handleViewMap}
        />
      )}
    </div>
  );
};
