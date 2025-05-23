
import { useCallback } from 'react';
import { TripDay } from '@/types/trip';

export const useMapHandlers = () => {
  const handleViewMap = useCallback((day: TripDay) => {
    if (day.accommodation?.address || day.accommodationAddress) {
      const address = encodeURIComponent(day.accommodation?.address || day.accommodationAddress || '');
      window.open(`https://www.google.com/maps?q=${address}`, '_blank');
    }
  }, []);

  const handleEditLocation = useCallback((dayIndex: number) => {
    console.log("Edit location for day:", dayIndex);
  }, []);

  return {
    handleViewMap,
    handleEditLocation
  };
};
