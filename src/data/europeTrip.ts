
import { Trip } from "@/types/trip";
import { departureDays } from "./departureDays";
import { florenceDays } from "./florenceDays";
import { returnDay } from "./returnDay";

export const europeTrip: Trip = {
  name: "Europe Trip 2025",
  description: "Nathan & Jamie Granner's European Adventure - A 22-day journey through Italy, Switzerland, and Germany",
  startDate: "2025-06-05",
  endDate: "2025-06-26",
  days: [
    ...departureDays,
    ...florenceDays,
    ...returnDay
  ]
};

// Export the days array as tripData for backward compatibility
export const tripData = europeTrip.days;
