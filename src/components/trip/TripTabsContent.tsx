
import React from "react";
import { DatabaseTripDay } from "@/hooks/useTripData";
import { ItineraryTab } from "./ItineraryTab";
import { HotelsTab } from "./HotelsTab";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { PurchaseTracker } from "@/components/PurchaseTracker";
import { CityViewTab } from "./CityViewTab";
import { TranslationTab } from "./TranslationTab";
import { TabsContent } from "@/components/ui/tabs";

interface TripTabsContentProps {
  tripDays: DatabaseTripDay[];
  onEditDay: (day: DatabaseTripDay) => void;
  onEditActivity: (activity: any, dayId: string) => void;
}

export const TripTabsContent: React.FC<TripTabsContentProps> = ({
  tripDays,
  onEditDay,
  onEditActivity,
}) => {
  return (
    <>
      <TabsContent value="itinerary">
        <ItineraryTab 
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
        />
      </TabsContent>

      <TabsContent value="hotels">
        <HotelsTab tripDays={tripDays} />
      </TabsContent>

      <TabsContent value="expenses">
        <ExpenseTracker 
          dayId={tripDays[0]?.id || ''}
          date={tripDays[0]?.date || new Date().toISOString()}
          onSave={() => {}}
        />
      </TabsContent>

      <TabsContent value="purchases">
        <PurchaseTracker 
          dayId={tripDays[0]?.id || ''}
          date={tripDays[0]?.date || new Date().toISOString()}
          countryName={tripDays[0]?.country || "Unknown"}
          onSave={() => {}}
        />
      </TabsContent>

      <TabsContent value="cityview">
        <CityViewTab tripDays={tripDays} />
      </TabsContent>

      <TabsContent value="translation">
        <TranslationTab />
      </TabsContent>
    </>
  );
};
