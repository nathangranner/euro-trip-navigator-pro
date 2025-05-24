
import { DatabaseTripDay } from "@/hooks/useTripData";
import { TripDay } from "@/types/trip";

export const convertDatabaseTripDayToTripDay = (dbDay: DatabaseTripDay): TripDay => {
  return {
    id: dbDay.id,
    dayNumber: dbDay.day_number,
    date: dbDay.date,
    city: dbDay.city,
    country: dbDay.country,
    title: dbDay.title || '',
    description: dbDay.description || '',
    activities: dbDay.activities?.map(activity => ({
      id: activity.id,
      time: activity.time,
      activity: activity.activity,
      type: activity.type,
      icon: 'clock', // default icon
      completed: activity.completed,
      location: activity.location,
      note: activity.notes,
      duration: activity.duration,
      booked: activity.booking_required,
      contactInfo: activity.contact_info
    })) || [],
    accommodation: dbDay.accommodation_name ? {
      name: dbDay.accommodation_name,
      address: dbDay.accommodation_address,
      checkin: dbDay.accommodation_checkin,
      checkout: dbDay.accommodation_checkout,
      confirmationNumber: dbDay.accommodation_confirmation,
      contactPhone: dbDay.accommodation_contact
    } : undefined,
    accommodationName: dbDay.accommodation_name,
    accommodationAddress: dbDay.accommodation_address,
    accommodationCheckIn: dbDay.accommodation_checkin,
    accommodationCheckOut: dbDay.accommodation_checkout,
    accommodationConfirmation: dbDay.accommodation_confirmation,
    accommodationContact: dbDay.accommodation_contact,
    weather: (dbDay.weather_temp || dbDay.weather_condition) ? {
      temp: dbDay.weather_temp || '',
      condition: dbDay.weather_condition || '',
      icon: 'sun' // default icon
    } : undefined
  };
};

export const convertTripDayToDatabaseTripDay = (tripDay: TripDay, tripId: string): Partial<DatabaseTripDay> => {
  return {
    trip_id: tripId,
    day_number: tripDay.dayNumber,
    date: tripDay.date,
    city: tripDay.city,
    country: tripDay.country,
    title: tripDay.title,
    description: tripDay.description,
    accommodation_name: tripDay.accommodationName || tripDay.accommodation?.name,
    accommodation_address: tripDay.accommodationAddress || tripDay.accommodation?.address,
    accommodation_checkin: tripDay.accommodationCheckIn || tripDay.accommodation?.checkin,
    accommodation_checkout: tripDay.accommodationCheckOut || tripDay.accommodation?.checkout,
    accommodation_confirmation: tripDay.accommodationConfirmation || tripDay.accommodation?.confirmationNumber,
    accommodation_contact: tripDay.accommodationContact || tripDay.accommodation?.contactPhone,
    weather_temp: tripDay.weather?.temp,
    weather_condition: tripDay.weather?.condition
  };
};
