
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Map, Edit, Clock, MapPin, Phone, Wifi } from "lucide-react";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface ItineraryTabProps {
  tripDays: DatabaseTripDay[];
  onEditDay?: (day: DatabaseTripDay) => void;
  onEditActivity?: (activity: any, dayId: string) => void;
  onViewMap?: (day: DatabaseTripDay) => void;
}

export const ItineraryTab: React.FC<ItineraryTabProps> = ({
  tripDays,
  onEditDay,
  onEditActivity,
  onViewMap
}) => {
  console.log("=== ITINERARY TAB RECEIVED DATA ===");
  console.log("Trip days received:", tripDays?.length || 0);
  console.log("Trip days array:", tripDays);
  console.log("First trip day:", tripDays?.[0]);
  console.log("First day activities:", tripDays?.[0]?.activities?.length || 0);

  if (!tripDays || tripDays.length === 0) {
    console.log("❌ No trip days data - showing empty state");
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No itinerary data available. Create a trip to get started!</p>
        <p className="text-sm text-gray-400 mt-2">Debug: Received {tripDays?.length || 0} days</p>
      </Card>
    );
  }

  console.log("✅ Rendering itinerary with", tripDays.length, "days");

  return (
    <div className="space-y-6">
      {tripDays.map((day, index) => {
        console.log(`📅 Rendering day ${day.day_number}:`, {
          city: day.city,
          activitiesCount: day.activities?.length || 0,
          hasAccommodation: !!day.accommodation_name
        });

        return (
          <Card key={day.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Day Header */}
              <div className="bg-slate-50 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">
                      Day {day.day_number}: {day.city}
                    </h3>
                    <p className="text-sm text-gray-600">{day.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {onViewMap && day.accommodation_address && (
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

                {/* Weather Info */}
                {(day.weather_temp || day.weather_condition) && (
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      Weather: {day.weather_condition} {day.weather_temp && `(${day.weather_temp})`}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {/* Description */}
                {day.description && (
                  <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-sm italic text-blue-800">{day.description}</p>
                  </div>
                )}
                
                {/* Activities */}
                {day.activities && day.activities.length > 0 ? (
                  <div className="mb-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Activities ({day.activities.length})
                    </h4>
                    <div className="space-y-3">
                      {day.activities.map((activity, i) => (
                        <div key={activity.id} className="flex justify-between items-start group border rounded-lg p-3 hover:bg-gray-50">
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
                              onClick={() => onEditActivity(activity, day.id)}
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
                {day.accommodation_name ? (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      🏨 Accommodation
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-sm">{day.accommodation_name}</p>
                      {day.accommodation_address && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {day.accommodation_address}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                        {day.accommodation_checkin && (
                          <div>
                            <span className="text-gray-500">Check-in:</span> {day.accommodation_checkin}
                          </div>
                        )}
                        {day.accommodation_checkout && (
                          <div>
                            <span className="text-gray-500">Check-out:</span> {day.accommodation_checkout}
                          </div>
                        )}
                        {day.accommodation_contact && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-500">Contact:</span> {day.accommodation_contact}
                          </div>
                        )}
                        {day.accommodation_confirmation && (
                          <div>
                            <span className="text-gray-500">Confirmation:</span> {day.accommodation_confirmation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No accommodation details available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
