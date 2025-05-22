
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TripDay } from "@/data/tripData";
import { Map } from "lucide-react";
import { DayMemento } from "./DayMemento";
import { loadDayMementoImages, saveDayMementoImage } from "@/utils/mementoUtils";

interface DayCardProps {
  day: TripDay;
  index: number;
  onViewMap: (day: TripDay) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, index, onViewMap }) => {
  const [dayMementos, setDayMementos] = useState<Record<number, string>>({});
  
  useEffect(() => {
    // Load saved day mementos
    const savedMementos = loadDayMementoImages();
    setDayMementos(savedMementos);
  }, []);

  // Handle memento change for a specific day
  const handleMementoChange = (dayNumber: number, newMementoUrl: string) => {
    setDayMementos(prev => ({
      ...prev,
      [dayNumber]: newMementoUrl
    }));
    saveDayMementoImage(dayNumber, newMementoUrl);
  };

  return (
    <Card key={index} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-slate-50 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Day {day.dayNumber}: {day.city}</h3>
              <p className="text-sm text-gray-600">{day.title}</p>
            </div>
            {day.accommodation && day.accommodation.address && (
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
          </div>
          
          {/* Add day memento section */}
          <div className="mt-3">
            <DayMemento
              dayNumber={day.dayNumber}
              mementoImage={dayMementos[day.dayNumber] || null}
              onMementoChange={handleMementoChange}
            />
          </div>
        </div>
        
        <div className="p-4">
          {day.encouragement && (
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm italic text-blue-800">{day.encouragement}</p>
            </div>
          )}
          
          {day.activities && day.activities.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Activities</h4>
              <ul className="space-y-1">
                {day.activities.map((activity, i) => (
                  <li key={i} className="text-sm">
                    {activity.time && <span className="font-medium">{activity.time}: </span>}
                    {activity.activity}
                    {activity.location && <span className="text-gray-500"> @ {activity.location}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4">No activities planned for this day.</p>
          )}
          
          <Separator className="my-3" />
          
          {day.accommodation ? (
            <div>
              <h4 className="font-medium mb-2">Accommodation</h4>
              <p className="font-medium text-sm">{day.accommodation.name}</p>
              {day.accommodation.address && (
                <p className="text-sm text-gray-600">{day.accommodation.address}</p>
              )}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                {day.accommodation.checkin && (
                  <p><span className="text-gray-500">Check-in:</span> {day.accommodation.checkin}</p>
                )}
                {day.accommodation.checkout && (
                  <p><span className="text-gray-500">Check-out:</span> {day.accommodation.checkout}</p>
                )}
                {day.accommodation.wifi && (
                  <p><span className="text-gray-500">WiFi:</span> {day.accommodation.wifi}</p>
                )}
                {day.accommodation.contactPhone && (
                  <p><span className="text-gray-500">Contact:</span> {day.accommodation.contactPhone}</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No accommodation details available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
