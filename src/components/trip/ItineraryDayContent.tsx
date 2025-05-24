
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Map, Edit, Clock, MapPin, Phone } from "lucide-react";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface ItineraryDayContentProps {
  tripDay: DatabaseTripDay;
  onEditDay?: (day: DatabaseTripDay) => void;
  onEditActivity?: (activity: any, dayId: string) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export default function ItineraryDayContent({ 
  tripDay,
  onEditDay,
  onEditActivity,
  onViewMap 
}: ItineraryDayContentProps) {
  return (
    <div className="bg-white rounded-lg border p-4">
      {/* Day Header */}
      <div className="bg-slate-50 p-4 -m-4 mb-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              Day {tripDay.day_number}: {tripDay.city}
            </h3>
            <p className="text-sm text-gray-600">{tripDay.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(tripDay.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
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

        {/* Weather Info */}
        {(tripDay.weather_temp || tripDay.weather_condition) && (
          <div className="mt-2 p-2 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              Weather: {tripDay.weather_condition} {tripDay.weather_temp && `(${tripDay.weather_temp})`}
            </p>
          </div>
        )}
      </div>
      
      {/* Description */}
      {tripDay.description && (
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm italic text-blue-800">{tripDay.description}</p>
        </div>
      )}
      
      {/* Activities */}
      {tripDay.activities && tripDay.activities.length > 0 ? (
        <div className="mb-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activities ({tripDay.activities.length})
          </h4>
          <div className="space-y-3">
            {tripDay.activities.map((activity, activityIdx) => (
              <div key={`activity-${activity.id}-${activityIdx}`} className="flex justify-between items-start group border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{activity.time}</span>
                    <span className="text-sm font-medium">{activity.activity}</span>
                    {activity.completed && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  {activity.location && (
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </p>
                  )}
                  {activity.notes && (
                    <p className="text-sm text-gray-600 mt-1">{activity.notes}</p>
                  )}
                  {activity.duration && (
                    <p className="text-xs text-gray-500 mt-1">Duration: {activity.duration}</p>
                  )}
                  {activity.booking_required && (
                    <p className="text-xs text-orange-600 mt-1">⚠️ Booking required</p>
                  )}
                  {activity.contact_info && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {activity.contact_info}
                    </p>
                  )}
                </div>
                {onEditActivity && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onEditActivity(activity, tripDay.id)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activities
          </h4>
          <p className="text-sm text-gray-500">No activities planned for this day.</p>
        </div>
      )}
      
      <Separator className="my-4" />
      
      {/* Accommodation */}
      {tripDay.accommodation_name ? (
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            🏨 Accommodation
          </h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-sm">{tripDay.accommodation_name}</p>
            {tripDay.accommodation_address && (
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {tripDay.accommodation_address}
              </p>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
              {tripDay.accommodation_checkin && (
                <div>
                  <span className="text-gray-500">Check-in:</span> {tripDay.accommodation_checkin}
                </div>
              )}
              {tripDay.accommodation_checkout && (
                <div>
                  <span className="text-gray-500">Check-out:</span> {tripDay.accommodation_checkout}
                </div>
              )}
              {tripDay.accommodation_contact && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-gray-500" />
                  <span className="text-gray-500">Contact:</span> {tripDay.accommodation_contact}
                </div>
              )}
              {tripDay.accommodation_confirmation && (
                <div>
                  <span className="text-gray-500">Confirmation:</span> {tripDay.accommodation_confirmation}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No accommodation details available.</p>
      )}
    </div>
  );
}
