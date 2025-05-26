
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useTripData } from "@/hooks/useTripData";
import { useTrips, Trip } from "@/hooks/useTrips";
import { TripBanner } from "./trip/TripBanner";
import { TripTabs } from "./trip/TripTabs";
import { TripTabsContent } from "./trip/TripTabsContent";
import { TripModals } from "./trip/TripModals";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";

export const EuropeTripPlanner: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [editingDay, setEditingDay] = useState<any>(null);
  const [editingActivity, setEditingActivity] = useState<any>(null);

  const { trips, loading } = useTrips();
  const selectedTrip = trips[0]; // Always use the first trip
  const { 
    tripDays, 
    loading: tripDataLoading, 
    updateTripDay, 
    updateActivity, 
    createActivity 
  } = useTripData(selectedTrip?.id || null);

  useEffect(() => {
    const savedBanner = loadBannerImage();
    if (savedBanner) {
      setBannerImage(savedBanner);
    }
  }, [selectedTrip]);

  const handleBannerChange = (newBannerUrl: string) => {
    setBannerImage(newBannerUrl);
    saveBannerImage(newBannerUrl);
  };

  const handleEditDay = (day: any) => {
    setEditingDay(day);
  };

  const handleSaveDay = async (updatedDay: any) => {
    if (selectedTrip && updatedDay.id) {
      await updateTripDay(updatedDay.id, updatedDay);
      setEditingDay(null);
    }
  };

  const handleEditActivity = (activity: any, dayId: string) => {
    setEditingActivity({ activity, dayId });
  };

  const handleSaveActivity = async (updatedActivity: any, dayId: string) => {
    if (updatedActivity.id) {
      await updateActivity(updatedActivity.id, updatedActivity);
    } else {
      await createActivity(dayId, updatedActivity);
    }
    setEditingActivity(null);
  };

  // Show loading state while fetching trips
  if (loading || tripDataLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading your trip...</p>
        </div>
      </div>
    );
  }

  // Show message if no trip data available
  if (!selectedTrip || tripDays.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No trip data found. Please run the seed script to populate your itinerary.</p>
            <p className="text-sm text-gray-400">Run: npx ts-node scripts/seedTrips.ts</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Trip Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{selectedTrip.name}</h1>
          {selectedTrip.description && (
            <p className="text-gray-600 mt-1">{selectedTrip.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {new Date(selectedTrip.start_date).toLocaleDateString()} - {new Date(selectedTrip.end_date).toLocaleDateString()}
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
