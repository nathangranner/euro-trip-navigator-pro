
import { Trip } from "@/types/trip";
import { departureDays } from "./departureDays";
import { florenceDays } from "./florenceDays";
import { bolognaDays } from "./bolognaDays";
import { lakeComoDays } from "./lakeComo";
import { stuttgartDays } from "./stuttgartDays";
import { blackForestDays } from "./blackForestDays";
import { returnJourneyDays } from "./returnJourneyDays";

export const europeTrip: Trip = {
  name: "Europe Trip 2025",
  description: "Nathan & Jamie Granner's European Adventure - A 23-day journey through Italy, Switzerland, and Germany",
  startDate: "2025-06-05",
  endDate: "2025-06-25",
  days: [
    ...departureDays,
    ...florenceDays,
    ...bolognaDays,
    ...lakeComoDays,
    ...stuttgartDays,
    ...blackForestDays,
    ...returnJourneyDays
  ]
};

// Export the days array as tripData for backward compatibility
export const tripData = europeTrip.days;
