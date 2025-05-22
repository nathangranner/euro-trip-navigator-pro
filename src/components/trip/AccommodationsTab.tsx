
import React from "react";
import { TripDay } from "@/data/tripData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { formatDate } from "./DateFormatter";
import { Map } from "lucide-react";

interface AccommodationsTabProps {
  tripDays: TripDay[];
  onViewMap: (day: TripDay) => void;
  onEditLocation: (dayIndex: number) => void;
}

export const AccommodationsTab: React.FC<AccommodationsTabProps> = ({ 
  tripDays, 
  onViewMap, 
  onEditLocation 
}) => {
  const navigate = useNavigate();
  
  return (
    <TabsContent value="accommodations" className="space-y-6">
      {tripDays
        .filter(day => day.accommodation)
        .map((day, index) => (
          <Card key={index} className="p-6 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {day.accommodation?.image && (
                <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={day.accommodation.image} 
                    alt={day.accommodation.name} 
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{day.accommodation?.name}</h3>
                    <p className="text-gray-500">{day.city} - Day {day.dayNumber}</p>
                    <p className="text-gray-500 text-sm">{formatDate(day.date)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditLocation(tripDays.findIndex(d => d.dayNumber === day.dayNumber))}
                    >
                      Edit Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewMap(day)}
                      className="flex items-center gap-2"
                    >
                      <Map className="h-4 w-4" />
                      View Map
                    </Button>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {day.accommodation?.address && (
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p>{day.accommodation.address}</p>
                      </div>
                    )}
                    {day.accommodation?.contactPhone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{day.accommodation.contactPhone}</p>
                      </div>
                    )}
                    {day.accommodation?.confirmationNumber && (
                      <div>
                        <p className="text-sm text-gray-500">Confirmation</p>
                        <p className="font-mono">{day.accommodation.confirmationNumber}</p>
                      </div>
                    )}
                    {day.accommodation?.confirmationCode && (
                      <div>
                        <p className="text-sm text-gray-500">Confirmation Code</p>
                        <p className="font-mono">{day.accommodation.confirmationCode}</p>
                      </div>
                    )}
                    {day.accommodation?.checkin && (
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p>{day.accommodation.checkin}</p>
                      </div>
                    )}
                    {day.accommodation?.checkout && (
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p>{day.accommodation.checkout}</p>
                      </div>
                    )}
                    {day.accommodation?.wifi && (
                      <div>
                        <p className="text-sm text-gray-500">WiFi</p>
                        <p>{day.accommodation.wifi}</p>
                      </div>
                    )}
                    {day.accommodation?.parking && (
                      <div>
                        <p className="text-sm text-gray-500">Parking</p>
                        <p>{day.accommodation.parking}</p>
                      </div>
                    )}
                    {day.accommodation?.totalPrice && (
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-green-600 font-medium">{day.accommodation.totalPrice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      {!tripDays.some(day => day.accommodation) && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No accommodation information recorded yet.</p>
          <Button 
            onClick={() => navigate("/planner")} 
            className="mt-4"
          >
            Add Accommodation Details
          </Button>
        </Card>
      )}
    </TabsContent>
  );
};
