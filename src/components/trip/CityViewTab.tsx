
import React, { useState } from "react";
import { TripDay } from "@/data/tripData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { formatDate } from "./DateFormatter";
import { Map, MapPin } from "lucide-react";

interface CityViewTabProps {
  tripDays: TripDay[];
  onViewMap: (day: TripDay) => void;
}

export const CityViewTab: React.FC<CityViewTabProps> = ({ tripDays, onViewMap }) => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Group trip days by city
  const getCitiesList = () => {
    const cities: Record<string, TripDay[]> = {};
    tripDays.forEach(day => {
      const cityName = day.city.split(',')[0].trim();
      if (!cities[cityName]) {
        cities[cityName] = [];
      }
      cities[cityName].push(day);
    });
    return cities;
  };

  const cities = getCitiesList();

  return (
    <TabsContent value="cityview">
      {selectedCity ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">{selectedCity}</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedCity(null)}
            >
              Back to All Cities
            </Button>
          </div>
          <div className="space-y-4">
            {cities[selectedCity].map((day, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">
                    Day {day.dayNumber} - {formatDate(day.date)}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/planner?day=${tripDays.findIndex(d => d.dayNumber === day.dayNumber)}`)}
                  >
                    View Details
                  </Button>
                </div>
                <p className="mt-2">{day.title}</p>
                
                {day.accommodation && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-red-500 mt-1 mr-2" />
                      <div>
                        <p className="font-medium">{day.accommodation.name}</p>
                        {day.accommodation.address && (
                          <p className="text-sm text-gray-600">{day.accommodation.address}</p>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onViewMap(day)}
                          className="flex items-center gap-1 mt-1 p-0"
                        >
                          <Map className="h-4 w-4" />
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(cities).map(([cityName, days]) => (
            <Card 
              key={cityName} 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCity(cityName)}
            >
              <h3 className="text-xl font-semibold">{cityName}</h3>
              <p className="text-sm text-gray-500">{days.length} days</p>
              <p className="text-sm text-gray-500">
                {formatDate(days[0].date)} - {formatDate(days[days.length - 1].date)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </TabsContent>
  );
};
