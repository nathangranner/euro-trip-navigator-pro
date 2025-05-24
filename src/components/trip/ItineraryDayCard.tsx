
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DatabaseTripDay } from "@/hooks/useTripData";
import DayHeader from "./DayHeader";
import WeatherSection from "./WeatherSection";
import ActivitiesSection from "./ActivitiesSection";
import AccommodationSection from "./AccommodationSection";

interface ItineraryDayCardProps {
  tripDay: DatabaseTripDay;
  onEditDay?: (day: DatabaseTripDay) => void;
  onEditActivity?: (activity: any, dayId: string) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export default function ItineraryDayCard({
  tripDay,
  onEditDay,
  onEditActivity,
  onViewMap,
}: ItineraryDayCardProps) {
  return (
    <Card className="overflow-hidden mb-6">
      <CardContent className="p-0">
        <DayHeader 
          tripDay={tripDay} 
          onEditDay={onEditDay} 
          onViewMap={onViewMap} 
        />
        
        <WeatherSection 
          weatherTemp={tripDay.weather_temp} 
          weatherCondition={tripDay.weather_condition} 
        />
        
        <div className="p-4">
          {tripDay.description && (
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm italic text-blue-800">{tripDay.description}</p>
            </div>
          )}
          
          <ActivitiesSection 
            activities={tripDay.activities} 
            tripDayId={tripDay.id}
            onEditActivity={onEditActivity} 
          />
          
          <Separator className="my-4" />
          
          <AccommodationSection 
            accommodationName={tripDay.accommodation_name}
            accommodationAddress={tripDay.accommodation_address}
            accommodationCheckin={tripDay.accommodation_checkin}
            accommodationCheckout={tripDay.accommodation_checkout}
            accommodationContact={tripDay.accommodation_contact}
            accommodationConfirmation={tripDay.accommodation_confirmation}
          />
        </div>
      </CardContent>
    </Card>
  );
}
