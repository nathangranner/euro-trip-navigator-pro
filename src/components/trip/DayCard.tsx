
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TripDay, Activity } from "@/types/trip";
import { Map } from "lucide-react";
import { DayMemento } from "./DayMemento";
import { loadDayMementoImages, saveDayMementoImage } from "@/utils/mementoUtils";

interface DayCardProps {
  day: TripDay;
  index: number;
  onViewMap?: (day: TripDay) => void;
  onEditDay?: (day: TripDay) => void;
  onEditActivity?: (activity: Activity, dayId: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  index,
  onViewMap,
  onEditDay,
  onEditActivity
}) => {
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

  // Debug function to log activities
  useEffect(() => {
    if (day.activities) {
      console.log(`Day ${day.dayNumber} activities:`, day.activities);
    } else {
      console.log(`Day ${day.dayNumber} has no activities defined`);
    }
  }, [day]);

  return (
    <Card key={index} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 bg-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">Day {day.dayNumber}: {day.city}</h3>
              <p className="text-sm text-gray-300">{day.title}</p>
            </div>
            {onViewMap && day.accommodation && day.accommodation.address && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewMap(day)} 
                className="flex items-center gap-2 border-slate-600 text-white hover:bg-slate-700"
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
                className="ml-2 border-slate-600 text-white hover:bg-slate-700"
              >
                Edit Day
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
        
        <div className="p-4 bg-slate-900">
          {day.encouragement && (
            <div className="mb-4 p-3 bg-blue-900/50 border-l-4 border-amber-500 rounded">
              <p className="text-sm italic text-blue-200">{day.encouragement}</p>
            </div>
          )}
          
          {day.activities && day.activities.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-white">Activities</h4>
              <ul className="space-y-2">
                {day.activities.map((activity, i) => (
                  <li key={i} className="text-sm flex justify-between items-center group bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <div>
                      {activity.time && <span className="font-medium text-amber-400">{activity.time}: </span>}
                      <span className="text-white">{activity.activity}</span>
                      {activity.location && <span className="text-gray-300"> @ {activity.location}</span>}
                    </div>
                    {onEditActivity && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditActivity(activity, day.id)} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white bg-amber-600 hover:bg-amber-500 mx-0 px-2 py-1 my-[4px] font-normal"
                      >
                        Edit
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-4">No activities planned for this day.</p>
          )}
          
          <Separator className="my-3 bg-slate-700" />
          
          {day.accommodation ? (
            <div>
              <h4 className="font-medium mb-2 text-white">Accommodation</h4>
              <p className="font-medium text-sm text-white">{day.accommodation.name}</p>
              {day.accommodation.address && <p className="text-sm text-gray-300">{day.accommodation.address}</p>}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                {day.accommodation.checkin && (
                  <p><span className="text-gray-400">Check-in:</span> <span className="text-white">{day.accommodation.checkin}</span></p>
                )}
                {day.accommodation.checkout && (
                  <p><span className="text-gray-400">Check-out:</span> <span className="text-white">{day.accommodation.checkout}</span></p>
                )}
                {day.accommodation.wifi && (
                  <p><span className="text-gray-400">WiFi:</span> <span className="text-white">{day.accommodation.wifi}</span></p>
                )}
                {day.accommodation.contactPhone && (
                  <p><span className="text-gray-400">Contact:</span> <span className="text-white">{day.accommodation.contactPhone}</span></p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No accommodation details available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
