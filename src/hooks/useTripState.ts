
import { useState, useEffect, useCallback } from 'react';
import { TripDay, Activity } from '@/types/trip';
import { europeTrip } from '@/data/europeTrip';
import { loadStoredData, saveTripDays } from '@/utils/storageUtils';
import { updateTripDay, updateTripDayActivity, validateTripDayActivities } from '@/utils/tripDataUtils';

export const useTripState = () => {
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [editingDay, setEditingDay] = useState<TripDay | null>(null);
  const [editingActivity, setEditingActivity] = useState<{ activity: Activity; dayId: string } | null>(null);

  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData.tripDays && storedData.tripDays.length > 0) {
      // Validate and ensure activities array exists for each day
      const validatedTripDays = validateTripDayActivities(storedData.tripDays);
      setTripDays(validatedTripDays);
      console.log("Loaded trip days from storage:", validatedTripDays);
    } else {
      // Validate default data too
      const validatedDefaultTripDays = validateTripDayActivities(europeTrip.days);
      setTripDays(validatedDefaultTripDays);
      console.log("Using default trip days:", validatedDefaultTripDays);
    }
  }, []);

  const updateTripDays = useCallback((newTripDays: TripDay[]) => {
    // Ensure all trip days have an activities array before saving
    const validatedTripDays = validateTripDayActivities(newTripDays);
    setTripDays(validatedTripDays);
    saveTripDays(validatedTripDays);
  }, []);

  const handleEditDay = useCallback((day: TripDay) => {
    console.log("Editing day:", day);
    setEditingDay(day);
  }, []);

  const handleSaveDay = useCallback((updatedDay: TripDay) => {
    // Ensure the day has an activities array
    const dayWithActivities = {
      ...updatedDay,
      activities: updatedDay.activities || []
    };
    
    const updatedTripDays = updateTripDay(tripDays, dayWithActivities);
    updateTripDays(updatedTripDays);
    setEditingDay(null);
    console.log("Day saved with activities:", dayWithActivities.activities);
  }, [tripDays, updateTripDays]);

  const handleEditActivity = useCallback((activity: Activity, dayId: string) => {
    console.log("Editing activity:", activity, "for day:", dayId);
    setEditingActivity({ activity, dayId });
  }, []);

  const handleSaveActivity = useCallback((updatedActivity: Activity, dayId: string) => {
    const updatedTripDays = updateTripDayActivity(tripDays, dayId, updatedActivity);
    updateTripDays(updatedTripDays);
    setEditingActivity(null);
    console.log("Activity saved:", updatedActivity);
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
