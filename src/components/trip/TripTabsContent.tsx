
import React from "react";
import { TripDay, Activity } from "@/types/trip";
import { ItineraryTab } from "./ItineraryTab";
import { ActivitiesTab } from "./ActivitiesTab";
import { DiningTab } from "./DiningTab";
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
  onDeleteActivity: (activityId: string, dayId: string) => void;
  onCreateActivity: (newActivity: Omit<Activity, 'id'>, dayId: string) => void;
}

export const TripTabsContent: React.FC<TripTabsContentProps> = ({
  tripDays,
  onEditDay,
  onEditActivity,
  onDeleteActivity,
  onCreateActivity,
}) => {
  return (
    <>
      <TabsContent value="itinerary">
        <ItineraryTab 
          tripDays={tripDays}
          onEditDay={onEditDay}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
        />
      </TabsContent>

      <TabsContent value="activities">
        <ActivitiesTab 
          tripDays={tripDays}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onCreateActivity={onCreateActivity}
        />
      </TabsContent>

      <TabsContent value="dining">
        <DiningTab 
          tripDays={tripDays}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onCreateActivity={onCreateActivity}
        />
      </TabsContent>

      <TabsContent value="hotels">
        <HotelsTab tripDays={tripDays} />
      </TabsContent>

      <TabsContent value="expenses">
        <ExpenseTracker 
          dayId={tripDays[0]?.id || ''}
          date={tripDays[0]?.date || new Date().toISOString().split('T')[0]}
          onSave={() => {}}
        />
      </TabsContent>

      <TabsContent value="purchases">
        <PurchaseTracker 
          dayId={tripDays[0]?.id || ''}
          date={tripDays[0]?.date || new Date().toISOString().split('T')[0]}
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
