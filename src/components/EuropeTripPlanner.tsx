
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useTripState } from "@/hooks/useTripState";
import { TripBanner } from "./trip/TripBanner";
import { TripTabs } from "./trip/TripTabs";
import { TripTabsContent } from "./trip/TripTabsContent";
import { TripModals } from "./trip/TripModals";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";
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
    <div className="container mx-auto py-8 space-y-6">
      {/* Trip Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{europeTrip.name}</h1>
          <p className="text-gray-600 mt-1">{europeTrip.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(europeTrip.startDate).toLocaleDateString()} - {new Date(europeTrip.endDate).toLocaleDateString()}
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
