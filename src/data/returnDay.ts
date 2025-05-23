
import { TripDay } from "@/types/trip";

export const returnDay: TripDay[] = [
  {
    id: "day-22",
    dayNumber: 22,
    date: "2025-06-26",
    city: "Los Angeles",
    country: "USA",
    description: "Return home - End of European adventure",
    title: "Los Angeles to Santa Maria (Return)",
    activities: [
      {
        id: "car-pickup-return",
        time: "1:30 AM",
        activity: "Pick up rental car at LAX",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Los Angeles Intl Airport, LAX, 5251 W 98th St, Los Angeles, CA 90045 US",
        note: "Confirmation: 23786281US1, Under name: NATHAN"
      },
      {
        id: "drive-home",
        time: "2:00 AM",
        activity: "Drive from LAX to Santa Maria",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Los Angeles to Santa Maria",
        note: "Approximately 3.5 hour drive - night driving"
      },
      {
        id: "car-return-final",
        time: "11:30 PM",
        activity: "Return rental car at Santa Maria Public Airport",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Santa Maria Public Airport, SMX, 3249 Terminal Dr, Santa Maria, CA 93455 US"
      }
    ],
    accommodation: {
      name: "Home",
      address: "Back home in Santa Maria"
    },
    warnings: [
      {
        type: "warning",
        message: "Night driving - be careful and well-rested for the journey home"
      }
    ]
  }
];
