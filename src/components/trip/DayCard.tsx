
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TripDay } from "@/data/tripData";
import { formatDate } from "./DateFormatter";
import { Map, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DayCardProps {
  day: TripDay;
  index: number;
  onViewMap: (day: TripDay) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, index, onViewMap }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          Day {day.dayNumber}: {day.city}
        </h3>
        <div className="flex space-x-2">
          {day.accommodation && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onViewMap(day)}
              className="flex items-center gap-1"
            >
              <Map className="h-4 w-4" />
              View Map
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/planner?day=${index}`)}
          >
            View Details
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">{formatDate(day.date)}</p>
      <p className="mt-2">{day.title}</p>
      
      {/* Only render activities section if day.activities exists */}
      {day.activities && day.activities.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {day.activities.slice(0, 4).map((activity, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-lg">{activity.icon}</span>
              <span className={activity.completed ? "line-through text-gray-500" : ""}>
                {activity.time}: {activity.activity}
              </span>
            </div>
          ))}
          {day.activities.length > 4 && (
            <div className="col-span-2 text-center text-sm text-gray-500 mt-2">
              + {day.activities.length - 4} more activities
            </div>
          )}
        </div>
      )}

      {/* Show accommodation info if available */}
      {day.accommodation && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-red-500 mt-1 mr-2" />
            <div>
              <p className="font-medium">{day.accommodation.name}</p>
              {day.accommodation.address && (
                <p className="text-sm text-gray-600">{day.accommodation.address}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
