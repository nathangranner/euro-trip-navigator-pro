
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TripDay } from "@/types/trip";

interface HotelsTabProps {
  tripDays: TripDay[];
}

export const HotelsTab: React.FC<HotelsTabProps> = ({ tripDays }) => {
  return (
    <TabsContent value="hotels">
      <Card>
        <CardHeader>
          <CardTitle>Hotel Accommodations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tripDays.filter(day => day.accommodation || day.accommodationName).map((day) => (
              <div key={day.id} className="border rounded-lg p-4">
                <h3 className="font-medium">Day {day.dayNumber}: {day.city}</h3>
                <p className="text-lg">{day.accommodation?.name || day.accommodationName}</p>
                {(day.accommodation?.address || day.accommodationAddress) && (
                  <p className="text-gray-600">{day.accommodation?.address || day.accommodationAddress}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
