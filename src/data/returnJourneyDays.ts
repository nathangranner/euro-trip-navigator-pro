
import { TripDay } from "@/types/trip";

export const returnJourneyDays: TripDay[] = [
  {
    id: "day-21",
    dayNumber: 21,
    date: "2025-06-25",
    city: "Black Forest to Milan",
    country: "Germany/Italy",
    description: "Begin return journey toward Milan",
    title: "Black Forest to Milan",
    activities: [
      {
        id: "lichtenstein-castle",
        time: "9:00 AM",
        activity: "Lichtenstein Castle",
        type: "sightseeing",
        icon: "🏰",
        completed: false,
        location: "Lichtenstein Castle",
        mustTry: true
      },
      {
        id: "ritter-sport",
        time: "11:30 AM",
        activity: "Waldenbuch Ritter Sport factory",
        type: "culture",
        icon: "🍫",
        completed: false,
        location: "Waldenbuch",
        mustTry: true
      },
      {
        id: "drive-milan",
        time: "1:00 PM",
        activity: "Drive toward Milan",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "En route to Milan",
        note: "Via Switzerland toward Milan - long driving day"
      },
      {
        id: "lindau-stop",
        time: "3:00 PM",
        activity: "Possible stop: Lindau on Bodensee",
        type: "sightseeing",
        icon: "🏞️",
        completed: false,
        location: "Lindau, Bodensee",
        note: "Optional scenic stop if time permits"
      },
      {
        id: "highway-dining",
        time: "6:00 PM",
        activity: "Dinner at highway rest stops",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Highway rest stop"
      }
    ],
    accommodation: {
      name: "NEEDS BOOKING",
      address: "En route to Milan"
    },
    warnings: [
      {
        type: "warning",
        message: "Long driving day - plan rest stops. Swiss vignette still required"
      }
    ]
  },
  {
    id: "day-22",
    dayNumber: 22,
    date: "2025-06-26",
    city: "Milan",
    country: "Italy",
    description: "Milan departure - Return to USA",
    title: "Milan Departure",
    activities: [
      {
        id: "hotel-checkout",
        time: "12:00 PM",
        activity: "Hotel check-out",
        type: "travel",
        icon: "🏨",
        completed: false,
        location: "Milan hotel"
      },
      {
        id: "car-return",
        time: "2:00 PM",
        activity: "Return rental car at MXP",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Budget MXP, Terminal 1",
        note: "Return car to Budget rental counter"
      },
      {
        id: "flight-departure-1",
        time: "3:20 PM",
        activity: "Depart MXP on UA415 to Chicago",
        type: "travel",
        icon: "✈️",
        completed: false,
        location: "Milan Malpensa (MXP) Terminal 1",
        note: "United Airlines flight UA415",
        flightInfo: "Confirmation: AD8JHZ"
      },
      {
        id: "arrive-chicago",
        time: "6:10 PM",
        activity: "Arrive Chicago ORD",
        type: "travel",
        icon: "✈️",
        completed: false,
        location: "Chicago O'Hare (ORD)",
        note: "Local Chicago time"
      },
      {
        id: "flight-departure-2",
        time: "9:40 PM",
        activity: "Depart ORD on UA1936",
        type: "travel",
        icon: "✈️",
        completed: false,
        location: "Chicago O'Hare (ORD)",
        note: "United Airlines flight UA1936 to final destination"
      }
    ],
    accommodation: {
      name: "N/A",
      address: "Travel day"
    },
    warnings: [
      {
        type: "critical",
        message: "Arrive 3 hours early for international flight. Confirm flight details"
      }
    ]
  }
];
