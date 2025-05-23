
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TripDay } from "@/data/tripData";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { CityBanner } from "./CityBanner";
import { loadCityBannerImages, saveCityBannerImage } from "@/utils/bannerUtils";

interface CityViewTabProps {
  tripDays: TripDay[];
  onViewMap?: (day: TripDay) => void;
}

export const CityViewTab: React.FC<CityViewTabProps> = ({ tripDays, onViewMap }) => {
  const [cityBanners, setCityBanners] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Load saved city banners
    const savedBanners = loadCityBannerImages();
    setCityBanners(savedBanners);
  }, []);

  // Group days by city
  const citiesWithDays = tripDays.reduce((cities, day) => {
    if (!cities[day.city]) {
      cities[day.city] = [];
    }
    cities[day.city].push(day);
    return cities;
  }, {} as Record<string, TripDay[]>);

  // Handle banner change for a specific city
  const handleCityBannerChange = (city: string, newBannerUrl: string) => {
    setCityBanners(prev => ({
      ...prev,
      [city]: newBannerUrl
    }));
    saveCityBannerImage(city, newBannerUrl);
  };

  return (
    <TabsContent value="city-view" className="space-y-6">
      {Object.entries(citiesWithDays).map(([city, days]) => (
        <div key={city} className="bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold mb-2 text-blue-800">{city}</h2>
          <CityBanner 
            city={city}
            bannerImage={cityBanners[city] || null}
            onBannerChange={handleCityBannerChange}
          />
          
          <div className="space-y-4">
            {days.map((day, index) => (
              <Card key={index} className="border border-blue-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-blue-700">Day {day.dayNumber}</h3>
                      <p className="text-sm text-gray-700">{day.title}</p>
                    </div>
                    {onViewMap && (day.accommodation?.address || day.accommodationAddress) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onViewMap(day)}
                        className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Map className="h-4 w-4" />
                        View Map
                      </Button>
                    )}
                  </div>
                  
                  {day.activities && day.activities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2 text-blue-600">Activities</h4>
                      <ul className="text-sm text-gray-700">
                        {day.activities.map((activity, i) => (
                          <li key={i} className="mb-1">{activity.activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(day.accommodation || day.accommodationName) && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-blue-600">Accommodation</h4>
                      <p className="text-sm text-gray-700">
                        {day.accommodation?.name || day.accommodationName}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator className="my-6 bg-blue-200" />
        </div>
      ))}
    </TabsContent>
  );
};
