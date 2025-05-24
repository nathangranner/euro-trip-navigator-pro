
import React from "react";
import { TripDay } from "@/types/trip";
import { ItineraryTab } from "./ItineraryTab";
import { HotelsTab } from "./HotelsTab";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { PurchaseTracker } from "@/components/PurchaseTracker";
import { CityViewTab } from "./CityViewTab";
import { TranslationTab } from "./TranslationTab";
import { TabsContent } from "@/components/ui/tabs";

interface TripTabsContentProps {
  tripDays: TripDay[];
  onEditDay: (day: TripDay) => void;
  onEditActivity: (activity: any, dayId: string) => void;
}

export const TripTabsContent: React.FC<TripTabsContentProps> = ({
  tripDays,
  onEditDay,
  onEditActivity,
}) => {
  return (
    <>
      <ItineraryTab 
        tripDays={tripDays}
        onEditDay={onEditDay}
        onEditActivity={onEditActivity}
      />

      <HotelsTab tripDays={tripDays} />

      <TabsContent value="expenses">
        <ExpenseTracker 
          dayId={1}
          date={new Date().toISOString()}
          onSave={() => {}}
        />
      </TabsContent>

      <TabsContent value="purchases">
        <PurchaseTracker 
          dayId={1}
          date={new Date().toISOString()}
          countryName="Italy"
          onSave={() => {}}
        />
      </TabsContent>

      <CityViewTab tripDays={tripDays} />

      <TranslationTab />
    </>
  );
};
