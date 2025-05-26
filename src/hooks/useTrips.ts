
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Trip {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          trip_days (
            *,
            activities (*)
          )
        `)
        .order('start_date', { ascending: true });

      if (error) throw error;
      console.log('📦 Fetched trips from Supabase:', data?.length || 0);
      setTrips(data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
      toast({
        title: "Error",
        description: "Failed to fetch trips from database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData: Omit<Trip, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([{
          ...tripData,
          user_id: '00000000-0000-0000-0000-000000000000' // Demo user for public access
        }])
        .select()
        .single();

      if (error) throw error;
      
      setTrips(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Trip created successfully"
      });
      
      return data;
    } catch (error) {
      console.error('Error creating trip:', error);
      toast({
        title: "Error",
        description: "Failed to create trip",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    loading,
    createTrip,
    refetchTrips: fetchTrips
  };
};
