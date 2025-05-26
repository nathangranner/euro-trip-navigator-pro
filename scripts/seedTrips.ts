
import { createClient } from '@supabase/supabase-js';
import { europeTrip } from '../src/data/europeTrip';

const SUPABASE_URL = "https://sbfwklibckljutucscmr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZndrbGliY2tsanV0dWNzY21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjcyNzQsImV4cCI6MjA2MjkwMzI3NH0.swzngCUanO1WOAa4NAUPzxRsXRolYJAHOcbqZORkI9Q";

// Generate a consistent UUID for the trip
const TRIP_ID = "550e8400-e29b-41d4-a716-446655440000";
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {
  console.log('🌱 Starting seed process...');

  try {
    // 1) Upsert the Trip record
    const { data: trip, error: tripErr } = await supabase
      .from('trips')
      .upsert({
        id: TRIP_ID,
        user_id: DEMO_USER_ID,
        name: europeTrip.name,
        description: europeTrip.description,
        start_date: europeTrip.startDate,
        end_date: europeTrip.endDate,
      })
      .select()
      .single();

    if (tripErr) throw tripErr;
    console.log('✅ Trip created/updated:', trip.name);

    // 2) Upsert each Day
    for (const day of europeTrip.days) {
      const { error: dayErr } = await supabase
        .from('trip_days')
        .upsert({
          id: day.id,
          trip_id: TRIP_ID,
          day_number: day.dayNumber,
          date: day.date,
          city: day.city,
          country: day.country,
          title: day.title,
          description: day.description,
          accommodation_name: day.accommodationName || day.accommodation?.name,
          accommodation_address: day.accommodationAddress || day.accommodation?.address,
          accommodation_checkin: day.accommodationCheckIn || day.accommodation?.checkin,
          accommodation_checkout: day.accommodationCheckOut || day.accommodation?.checkout,
          accommodation_confirmation: day.accommodationConfirmation || day.accommodation?.confirmationNumber,
          accommodation_contact: day.accommodationContact || day.accommodation?.contactPhone,
          weather_temp: day.weather?.temp,
          weather_condition: day.weather?.condition,
        });

      if (dayErr) throw dayErr;
      console.log(`✅ Day ${day.dayNumber} (${day.city}) created/updated`);

      // 3) Upsert Activities for this day
      if (day.activities && day.activities.length > 0) {
        for (const activity of day.activities) {
          const { error: actErr } = await supabase
            .from('activities')
            .upsert({
              id: activity.id,
              trip_day_id: day.id,
              activity: activity.activity,
              time: activity.time,
              type: activity.type,
              location: activity.location,
              notes: activity.note,
              duration: activity.duration,
              completed: activity.completed || false,
              booking_required: activity.booked || false,
              contact_info: activity.contactInfo,
            });

          if (actErr) throw actErr;
        }
        console.log(`  → ${day.activities.length} activities added for ${day.city}`);
      }
    }

    console.log(`🎉 Seed complete! Trip ID: ${TRIP_ID}`);
    console.log(`📊 Summary: ${europeTrip.days.length} days, ${europeTrip.days.reduce((total, day) => total + (day.activities?.length || 0), 0)} activities`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
