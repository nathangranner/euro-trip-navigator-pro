
import { useState, useEffect, useCallback } from 'react';
import { TripDay, Activity } from '@/types/trip';
import { europeTrip } from '@/data/europeTrip';
import { loadStoredData, saveTripDays } from '@/utils/storageUtils';
import { updateTripDay, updateTripDayActivity } from '@/utils/tripDataUtils';

export const useTripState = () => {
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [editingDay, setEditingDay] = useState<TripDay | null>(null);
  const [editingActivity, setEditingActivity] = useState<{ activity: Activity; dayId: string } | null>(null);

  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData.tripDays && storedData.tripDays.length > 0) {
      setTripDays(storedData.tripDays);
    } else {
      setTripDays(europeTrip.days);
    }
  }, []);

  const updateTripDays = useCallback((newTripDays: TripDay[]) => {
    setTripDays(newTripDays);
    saveTripDays(newTripDays);
  }, []);

  const handleEditDay = useCallback((day: TripDay) => {
    setEditingDay(day);
  }, []);

  const handleSaveDay = useCallback((updatedDay: TripDay) => {
    const updatedTripDays = updateTripDay(tripDays, updatedDay);
    updateTripDays(updatedTripDays);
    setEditingDay(null);
  }, [tripDays, updateTripDays]);

  const handleEditActivity = useCallback((activity: Activity, dayId: string) => {
    setEditingActivity({ activity, dayId });
  }, []);

  const handleSaveActivity = useCallback((updatedActivity: Activity, dayId: string) => {
    const updatedTripDays = updateTripDayActivity(tripDays, dayId, updatedActivity);
    updateTripDays(updatedTripDays);
    setEditingActivity(null);
  }, [tripDays, updateTripDays]);

  return {
    tripDays,
    editingDay,
    editingActivity,
    handleEditDay,
    handleSaveDay,
    handleEditActivity,
    handleSaveActivity,
    setEditingDay,
    setEditingActivity
  };
};
