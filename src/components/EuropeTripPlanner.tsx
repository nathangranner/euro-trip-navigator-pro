
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useTripState } from "@/hooks/useTripState";
import { TripBanner } from "./trip/TripBanner";
import { TripTabs } from "./trip/TripTabs";
import { TripTabsContent } from "./trip/TripTabsContent";
import { TripModals } from "./trip/TripModals";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";

export const EuropeTripPlanner: React.FC = () => {
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

  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    // Load banner image
    const savedBanner = loadBannerImage();
    if (savedBanner) {
      setBannerImage(savedBanner);
    }
  }, []);

  // Handle banner image change
  const handleBannerChange = (newBannerUrl: string) => {
    setBannerImage(newBannerUrl);
    saveBannerImage(newBannerUrl);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Banner Section */}
      <TripBanner bannerImage={bannerImage} onBannerChange={handleBannerChange} />

      <Tabs defaultValue="itinerary" className="w-full">
        <TripTabs />

        <TripTabsContent
          tripDays={tripDays}
          onEditDay={handleEditDay}
          onEditActivity={handleEditActivity}
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
