
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Wifi } from "lucide-react";
import { DatabaseTripDay } from "@/hooks/useTripData";

interface HotelsTabProps {
  tripDays: DatabaseTripDay[];
}

export const HotelsTab: React.FC<HotelsTabProps> = ({ tripDays }) => {
  const accommodations = tripDays.filter(day => day.accommodation_name);

  if (accommodations.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No accommodation details available.</p>
      </Card>
    );
  }

  const handleViewMap = (address: string) => {
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      {accommodations.map((day) => (
        <Card key={day.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{day.accommodation_name}</h3>
                <p className="text-sm text-gray-600">Day {day.day_number} - {day.city}</p>
              </div>
              {day.accommodation_address && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewMap(day.accommodation_address!)}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  View Map
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {day.accommodation_address && (
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                {day.accommodation_address}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              {day.accommodation_checkin && (
                <div>
                  <span className="text-sm font-medium">Check-in:</span>
                  <p className="text-sm text-gray-600">{day.accommodation_checkin}</p>
                </div>
              )}
              {day.accommodation_checkout && (
                <div>
                  <span className="text-sm font-medium">Check-out:</span>
                  <p className="text-sm text-gray-600">{day.accommodation_checkout}</p>
                </div>
              )}
              {day.accommodation_contact && (
                <div>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Contact:
                  </span>
                  <p className="text-sm text-gray-600">{day.accommodation_contact}</p>
                </div>
              )}
              {day.accommodation_confirmation && (
                <div>
                  <span className="text-sm font-medium">Confirmation:</span>
                  <p className="text-sm text-gray-600">{day.accommodation_confirmation}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
