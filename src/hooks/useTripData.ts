
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DatabaseTripDay {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  city: string;
  country: string;
  title?: string;
  description?: string;
  accommodation_name?: string;
  accommodation_address?: string;
  accommodation_checkin?: string;
  accommodation_checkout?: string;
  accommodation_confirmation?: string;
  accommodation_contact?: string;
  weather_temp?: string;
  weather_condition?: string;
  activities?: DatabaseActivity[];
}

export interface DatabaseActivity {
  id: string;
  trip_day_id: string;
  time: string;
  activity: string;
  type: string;
  location?: string;
  notes?: string;
  duration?: string;
  completed: boolean;
  booking_required: boolean;
  contact_info?: string;
}

export const useTripData = (tripId: string | null) => {
  const [tripDays, setTripDays] = useState<DatabaseTripDay[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTripData = async () => {
    if (!tripId) {
      setLoading(false);
      return;
    }

    try {
      const { data: daysData, error: daysError } = await supabase
        .from('trip_days')
        .select(`
          *,
          activities (*)
        `)
        .eq('trip_id', tripId)
        .order('day_number');

      if (daysError) throw daysError;

      setTripDays(daysData || []);
    } catch (error) {
      console.error('Error fetching trip data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch trip data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTripDay = async (dayId: string, updates: Partial<DatabaseTripDay>) => {
    try {
      const { error } = await supabase
        .from('trip_days')
        .update(updates)
        .eq('id', dayId);

      if (error) throw error;

      await fetchTripData();
      toast({
        title: "Success",
        description: "Day updated successfully"
      });
    } catch (error) {
      console.error('Error updating trip day:', error);
      toast({
        title: "Error",
        description: "Failed to update day",
        variant: "destructive"
      });
    }
  };

  const updateActivity = async (activityId: string, updates: Partial<DatabaseActivity>) => {
    try {
      const { error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', activityId);

      if (error) throw error;

      await fetchTripData();
      toast({
        title: "Success",
        description: "Activity updated successfully"
      });
    } catch (error) {
      console.error('Error updating activity:', error);
      toast({
        title: "Error",
        description: "Failed to update activity",
        variant: "destructive"
      });
    }
  };

  const createActivity = async (tripDayId: string, activityData: Omit<DatabaseActivity, 'id' | 'trip_day_id'>) => {
    try {
      const { error } = await supabase
        .from('activities')
        .insert([{
          ...activityData,
          trip_day_id: tripDayId
        }]);

      if (error) throw error;

      await fetchTripData();
      toast({
        title: "Success",
        description: "Activity created successfully"
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "Failed to create activity",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTripData();
  }, [tripId]);

  return {
    tripDays,
    loading,
    updateTripDay,
    updateActivity,
    createActivity,
    refetchData: fetchTripData
  };
};
