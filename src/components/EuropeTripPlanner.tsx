
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditDayModal } from './EditDayModal';
import { EditActivityModal } from './EditActivityModal';
import { TripBanner } from './trip/TripBanner';
import { ItineraryTab } from './trip/ItineraryTab';
import { AccommodationsTab } from './trip/AccommodationsTab';
import { ExpensesTab } from './trip/ExpensesTab';
import { PurchasesTab } from './trip/PurchasesTab';
import { CityViewTab } from './trip/CityViewTab';
import { TranslationTool } from './TranslationTool';
import { TravelBuddySection } from './trip/TravelBuddySection';
import { useTripState } from '@/hooks/useTripState';
import { useTripCalculations } from '@/hooks/useTripCalculations';
import { useMapHandlers } from '@/hooks/useMapHandlers';

export const EuropeTripPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState("itinerary");
  
  const {
    tripDays,
    editingDay,
    editingActivity,
    handleEditDay,
    handleSaveDay,
    handleEditActivity,
    handleSaveActivity,
    setEditingDay,
    setEditingActivity
  } = useTripState();

  const { expensesByDay, purchasesByDay } = useTripCalculations(tripDays);
  const { handleViewMap, handleEditLocation } = useMapHandlers();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <TripBanner 
          bannerImage={null}
          onBannerChange={() => {}}
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="accommodations">Hotels</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="city-view">City View</TabsTrigger>
            <TabsTrigger value="translation">Translation</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary">
            <ItineraryTab 
              tripDays={tripDays}
              onEditDay={handleEditDay}
              onEditActivity={handleEditActivity}
            />
          </TabsContent>

          <TabsContent value="accommodations">
            <AccommodationsTab 
              tripDays={tripDays}
              onViewMap={handleViewMap}
              onEditLocation={handleEditLocation}
            />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpensesTab 
              expensesByDay={expensesByDay}
              tripDays={tripDays}
            />
          </TabsContent>

          <TabsContent value="purchases">
            <PurchasesTab 
              purchasesByDay={purchasesByDay}
              tripDays={tripDays}
            />
          </TabsContent>

          <TabsContent value="city-view">
            <CityViewTab 
              tripDays={tripDays}
              onViewMap={handleViewMap}
            />
          </TabsContent>

          <TabsContent value="translation">
            <div className="space-y-6">
              <TranslationTool />
              <TravelBuddySection />
            </div>
          </TabsContent>
        </Tabs>

        {editingDay && (
          <EditDayModal
            isOpen={!!editingDay}
            day={editingDay}
            onClose={() => setEditingDay(null)}
            onSave={handleSaveDay}
          />
        )}

        {editingActivity && (
          <EditActivityModal
            isOpen={!!editingActivity}
            activity={editingActivity.activity}
            onClose={() => setEditingActivity(null)}
            onSave={(updatedActivity) => handleSaveActivity(updatedActivity, editingActivity.dayId)}
          />
        )}
      </div>
    </div>
  );
};
