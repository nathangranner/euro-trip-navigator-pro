
import { TripDay, Activity } from "@/types/trip";

export const findTripDayById = (tripDays: TripDay[], id: string): TripDay | undefined => {
  return tripDays.find(day => day.id === id);
};

export const findTripDayByNumber = (tripDays: TripDay[], dayNumber: number): TripDay | undefined => {
  return tripDays.find(day => day.dayNumber === dayNumber);
};

export const getTripDuration = (tripDays: TripDay[]): number => {
  return tripDays.length;
};

export const getCompletedDaysCount = (tripDays: TripDay[]): number => {
  return tripDays.filter(day => 
    day.activities?.some(activity => activity.completed)
  ).length;
};

export const getCitiesWithDays = (tripDays: TripDay[]): Record<string, TripDay[]> => {
  return tripDays.reduce((cities, day) => {
    if (!cities[day.city]) {
      cities[day.city] = [];
    }
    cities[day.city].push(day);
    return cities;
  }, {} as Record<string, TripDay[]>);
};

export const getUniqueCities = (tripDays: TripDay[]): string[] => {
  return Array.from(new Set(tripDays.map(day => day.city)));
};

export const updateTripDayActivity = (
  tripDays: TripDay[], 
  dayId: string, 
  updatedActivity: Activity
): TripDay[] => {
  return tripDays.map(day => {
    if (day.id === dayId) {
      return {
        ...day,
        activities: day.activities?.map(activity => 
          activity.id === updatedActivity.id ? updatedActivity : activity
        ) || []
      };
    }
    return day;
  });
};

export const updateTripDay = (tripDays: TripDay[], updatedDay: TripDay): TripDay[] => {
  return tripDays.map(day => 
    day.id === updatedDay.id ? updatedDay : day
  );
};
