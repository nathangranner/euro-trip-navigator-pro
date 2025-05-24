
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Map, Clock, MapPin, Phone } from "lucide-react";
import { TripDay } from "@/types/trip";

interface StaticItineraryDisplayProps {
  tripDays: TripDay[];
  onViewMap?: (day: TripDay) => void;
}

export const StaticItineraryDisplay: React.FC<StaticItineraryDisplayProps> = ({
  tripDays,
  onViewMap
}) => {
  if (!tripDays || tripDays.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No itinerary data available.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {tripDays.map((day) => (
        <Card key={day.id} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Day Header */}
            <div className="bg-slate-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    Day {day.dayNumber}: {day.city}
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
                </div>
              </div>

              {/* Weather Info */}
              {day.weather && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    Weather: {day.weather.condition} {day.weather.temp && `(${day.weather.temp})`}
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
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="border rounded-lg p-3 hover:bg-gray-50">
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
                          {activity.note && (
                            <p className="text-sm text-gray-600 mt-1">{activity.note}</p>
                          )}
                          {activity.duration && (
                            <p className="text-xs text-gray-500 mt-1">Duration: {activity.duration}</p>
                          )}
                          {activity.booked && (
                            <p className="text-xs text-orange-600 mt-1">⚠️ Booking required</p>
                          )}
                          {activity.contactInfo && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {activity.contactInfo}
                            </p>
                          )}
                        </div>
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
              {(day.accommodationName || day.accommodation?.name) ? (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    🏨 Accommodation
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-sm">{day.accommodationName || day.accommodation?.name}</p>
                    {(day.accommodationAddress || day.accommodation?.address) && (
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {day.accommodationAddress || day.accommodation?.address}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                      {(day.accommodationCheckIn || day.accommodation?.checkin) && (
                        <div>
                          <span className="text-gray-500">Check-in:</span> {day.accommodationCheckIn || day.accommodation?.checkin}
                        </div>
                      )}
                      {(day.accommodationCheckOut || day.accommodation?.checkout) && (
                        <div>
                          <span className="text-gray-500">Check-out:</span> {day.accommodationCheckOut || day.accommodation?.checkout}
                        </div>
                      )}
                      {(day.accommodationContact || day.accommodation?.contactPhone) && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-500">Contact:</span> {day.accommodationContact || day.accommodation?.contactPhone}
                        </div>
                      )}
                      {(day.accommodationConfirmation || day.accommodation?.confirmationNumber) && (
                        <div>
                          <span className="text-gray-500">Confirmation:</span> {day.accommodationConfirmation || day.accommodation?.confirmationNumber}
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
      ))}
    </div>
  );
};
