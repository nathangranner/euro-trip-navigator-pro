
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useTripState } from "@/hooks/useTripState";
import { TripBanner } from "./trip/TripBanner";
import { TripTabs } from "./trip/TripTabs";
import { TripTabsContent } from "./trip/TripTabsContent";
import { TripModals } from "./trip/TripModals";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";
import { parseLocalDate } from "@/utils/dateUtils";
import { europeTrip } from "@/data/europeTrip";

export const EuropeTripPlanner: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const {
    tripDays,
    editingDay,
    editingActivity,
    handleEditDay,
    handleSaveDay,
    handleEditActivity,
    handleSaveActivity,
    handleDeleteActivity,
    handleCreateActivity,
    setEditingDay,
    setEditingActivity
  } = useTripState();

  useEffect(() => {
    const savedBanner = loadBannerImage();
    if (savedBanner) {
      setBannerImage(savedBanner);
    }
  }, []);

  const handleBannerChange = (newBannerUrl: string) => {
    setBannerImage(newBannerUrl);
    saveBannerImage(newBannerUrl);
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 space-y-4 sm:space-y-6 bg-slate-800 min-h-screen px-3 sm:px-4">
      {/* Trip Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 text-center sm:text-left">{europeTrip.name}</h1>
          <p className="mt-1 text-center sm:text-left text-amber-400 text-sm sm:text-base">{europeTrip.description}</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center sm:text-left">
            {parseLocalDate(europeTrip.startDate).toLocaleDateString()} - {parseLocalDate(europeTrip.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Banner Section */}
      <TripBanner bannerImage={bannerImage} onBannerChange={handleBannerChange} />

      <Tabs defaultValue="itinerary" className="w-full">
        <TripTabs />

        <TripTabsContent 
          tripDays={tripDays} 
          onEditDay={handleEditDay} 
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
          onCreateActivity={handleCreateActivity}
        />
      </Tabs>

      {/* Modals */}
      <TripModals 
        editingDay={editingDay} 
        editingActivity={editingActivity} 
        onSaveDay={handleSaveDay} 
        onSaveActivity={handleSaveActivity} 
        onCloseDay={() => setEditingDay(null)} 
        onCloseActivity={() => setEditingActivity(null)} 
      />
    </div>
  );
};
