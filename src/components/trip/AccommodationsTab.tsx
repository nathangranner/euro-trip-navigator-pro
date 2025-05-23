import React from "react";
import { TripDay } from "@/types/trip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { formatDate } from "./DateFormatter";
import { Map } from "lucide-react";

interface AccommodationsTabProps {
  tripDays: TripDay[];
  onViewMap?: (day: TripDay) => void;
  onEditLocation?: (dayIndex: number) => void;
}

export const AccommodationsTab: React.FC<AccommodationsTabProps> = ({ 
  tripDays, 
  onViewMap, 
  onEditLocation 
}) => {
  
  return (
    <TabsContent value="accommodations" className="space-y-6">
      {tripDays
        .filter(day => day.accommodation || day.accommodationName)
        .map((day, index) => (
          <Card key={index} className="p-6 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {day.accommodation?.image && (
                <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={day.accommodation.image} 
                    alt={day.accommodation.name || day.accommodationName} 
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {day.accommodation?.name || day.accommodationName}
                    </h3>
                    <p className="text-gray-500">{day.city} - Day {day.dayNumber}</p>
                    <p className="text-gray-500 text-sm">{formatDate(day.date)}</p>
                  </div>
                  <div className="flex space-x-2">
                    {onEditLocation && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditLocation(tripDays.findIndex(d => d.dayNumber === day.dayNumber))}
                      >
                        Edit Details
                      </Button>
                    )}
                    {onViewMap && (day.accommodation?.address || day.accommodationAddress) && (
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

                <div className="mt-4 bg-gray-50 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(day.accommodation?.address || day.accommodationAddress) && (
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p>{day.accommodation?.address || day.accommodationAddress}</p>
                      </div>
                    )}
                    {(day.accommodation?.contactPhone || day.accommodationContact) && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{day.accommodation?.contactPhone || day.accommodationContact}</p>
                      </div>
                    )}
                    {(day.accommodation?.confirmationNumber || day.accommodationConfirmation) && (
                      <div>
                        <p className="text-sm text-gray-500">Confirmation</p>
                        <p className="font-mono">
                          {day.accommodation?.confirmationNumber || day.accommodationConfirmation}
                        </p>
                      </div>
                    )}
                    {day.accommodation?.confirmationCode && (
                      <div>
                        <p className="text-sm text-gray-500">Confirmation Code</p>
                        <p className="font-mono">{day.accommodation.confirmationCode}</p>
                      </div>
                    )}
                    {(day.accommodation?.checkin || day.accommodationCheckIn) && (
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p>{day.accommodation?.checkin || day.accommodationCheckIn}</p>
                      </div>
                    )}
                    {(day.accommodation?.checkout || day.accommodationCheckOut) && (
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p>{day.accommodation?.checkout || day.accommodationCheckOut}</p>
                      </div>
                    )}
                    {(day.accommodation?.wifi || day.accommodationWifi) && (
                      <div>
                        <p className="text-sm text-gray-500">WiFi</p>
                        <p>{day.accommodation?.wifi || day.accommodationWifi}</p>
                      </div>
                    )}
                    {day.accommodation?.parking && (
                      <div>
                        <p className="text-sm text-gray-500">Parking</p>
                        <p>{day.accommodation.parking}</p>
                      </div>
                    )}
                    {(day.accommodation?.totalPrice || day.accommodationPrice) && (
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-green-600 font-medium">
                          {day.accommodation?.totalPrice || 
                           `${day.accommodationPrice} ${day.accommodationCurrency || 'EUR'}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      {!tripDays.some(day => day.accommodation || day.accommodationName) && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No accommodation information recorded yet.</p>
        </Card>
      )}
    </TabsContent>
  );
};
