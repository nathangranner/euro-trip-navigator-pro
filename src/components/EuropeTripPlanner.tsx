
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useTripData } from "@/hooks/useTripData";
import { useTrips, Trip } from "@/hooks/useTrips";
import { TripBanner } from "./trip/TripBanner";
import { TripTabs } from "./trip/TripTabs";
import { TripTabsContent } from "./trip/TripTabsContent";
import { TripModals } from "./trip/TripModals";
import { TripSelector } from "./TripSelector";
import { CreateTripModal } from "./CreateTripModal";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";

export const EuropeTripPlanner: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [editingDay, setEditingDay] = useState<any>(null);
  const [editingActivity, setEditingActivity] = useState<any>(null);

  const { trips } = useTrips();
  const { 
    tripDays, 
    loading, 
    updateTripDay, 
    updateActivity, 
    createActivity 
  } = useTripData(selectedTrip?.id || null);

  useEffect(() => {
    // Auto-select first trip if no trip is selected
    if (trips.length > 0 && !selectedTrip) {
      setSelectedTrip(trips[0]);
    }
  }, [trips, selectedTrip]);

  useEffect(() => {
    // Load banner image for selected trip
    const savedBanner = loadBannerImage();
    if (savedBanner) {
      setBannerImage(savedBanner);
    }
  }, [selectedTrip]);

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleTripCreated = (trip: Trip) => {
    setSelectedTrip(trip);
  };

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

  // Show trip selector if no trip is selected
  if (!selectedTrip) {
    return (
      <div className="container mx-auto py-8">
        <TripSelector
          onSelectTrip={handleSelectTrip}
          onCreateTrip={() => setShowCreateModal(true)}
          selectedTripId={selectedTrip?.id}
        />
        <CreateTripModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onTripCreated={handleTripCreated}
        />
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
        </div>
        <div className="flex gap-2">
          <TripSelector
            onSelectTrip={handleSelectTrip}
            onCreateTrip={() => setShowCreateModal(true)}
            selectedTripId={selectedTrip.id}
          />
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

      <CreateTripModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTripCreated={handleTripCreated}
      />
    </div>
  );
};
