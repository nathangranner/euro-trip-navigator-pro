
import { TripDay } from "@/types/trip";

export const lakeComoDays: TripDay[] = [
  {
    id: "day-10",
    dayNumber: 10,
    date: "2025-06-14",
    city: "Lake Como",
    country: "Italy",
    description: "Travel from Bologna to Lake Como",
    title: "Bologna to Lake Como",
    activities: [
      {
        id: "checkout-bologna",
        time: "10:00 AM",
        activity: "Check-out from Bologna accommodation",
        type: "travel",
        icon: "🏠",
        completed: false,
        location: "Via delle Lame 71/A, Bologna"
      },
      {
        id: "depart-bologna",
        time: "10:30 AM",
        activity: "Depart Bologna by car",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Bologna",
        note: "300 km drive to Vezio, approximately 3.5 hours via A1 north to A22, A4 toward Milano"
      },
      {
        id: "arrive-vezio",
        time: "2:00 PM",
        activity: "Arrive in Vezio",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Vezio",
        note: "Exit Bergamo, SS342 to Lecco, SP72 along lake to Vezio"
      },
      {
        id: "checkin-como",
        time: "3:00 PM",
        activity: "Check-in Lake Como accommodation",
        type: "travel",
        icon: "🏠",
        completed: false,
        location: "Via del Castellano, 9, Vezio"
      },
      {
        id: "explore-vezio",
        time: "4:00 PM",
        activity: "Explore Vezio & castle ruins",
        type: "sightseeing",
        icon: "🏰",
        completed: false,
        location: "Vezio"
      },
      {
        id: "sunset-lake",
        time: "6:00 PM",
        activity: "Sunset lake views",
        type: "sightseeing",
        icon: "🌅",
        completed: false,
        location: "Lake Como",
        mustTry: true
      },
      {
        id: "dinner-varenna",
        time: "8:00 PM",
        activity: "Dinner at restaurant in Varenna village",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Varenna village"
      }
    ],
    accommodation: {
      name: "Casa Chicca, relax and lake",
      address: "Via del Castellano, 9, Vezio, Lombardia 23828",
      checkin: "3:00 PM",
      checkout: "June 16, 11:00 AM",
      contactPhone: "Walter (Co-host: Fabio) +39 335 129 7553",
      confirmationNumber: "HM4K483EX2",
      wifi: "Lake views"
    },
    warnings: [
      {
        type: "warning",
        message: "Mountain roads, drive carefully"
      }
    ]
  },
  {
    id: "day-11",
    dayNumber: 11,
    date: "2025-06-15",
    city: "Lake Como",
    country: "Italy",
    description: "Full day exploring Lake Como",
    title: "Lake Como",
    activities: [
      {
        id: "varenna-walk",
        time: "9:00 AM",
        activity: "Varenna village walk",
        type: "sightseeing",
        icon: "🚶",
        completed: false,
        location: "Varenna"
      },
      {
        id: "villa-monastero",
        time: "10:00 AM",
        activity: "Villa Monastero",
        type: "culture",
        icon: "🏛️",
        completed: false,
        location: "Villa Monastero",
        mustTry: true
      },
      {
        id: "ferry-bellagio",
        time: "12:00 PM",
        activity: "Ferry to Bellagio",
        type: "travel",
        icon: "⛵",
        completed: false,
        location: "Varenna to Bellagio",
        note: "Check ferry timetables"
      },
      {
        id: "explore-bellagio",
        time: "2:00 PM",
        activity: "Explore Bellagio",
        type: "sightseeing",
        icon: "🏘️",
        completed: false,
        location: "Bellagio",
        mustTry: true
      },
      {
        id: "villa-balbianello",
        time: "4:00 PM",
        activity: "Villa del Balbianello",
        type: "culture",
        icon: "🏛️",
        completed: false,
        location: "Villa del Balbianello",
        mustTry: true
      },
      {
        id: "como-cathedral",
        time: "6:00 PM",
        activity: "Como town & cathedral",
        type: "sightseeing",
        icon: "⛪",
        completed: false,
        location: "Como"
      },
      {
        id: "brunate-cable",
        time: "7:30 PM",
        activity: "Brunate cable car",
        type: "sightseeing",
        icon: "🚠",
        completed: false,
        location: "Brunate",
        mustTry: true
      },
      {
        id: "lunch-bellagio",
        time: "1:00 PM",
        activity: "Lunch at Bellagio waterfront",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Bellagio waterfront"
      },
      {
        id: "dinner-como",
        time: "8:00 PM",
        activity: "Dinner in Como",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Como"
      }
    ],
    accommodation: {
      name: "Casa Chicca, relax and lake",
      address: "Via del Castellano, 9, Vezio, Lombardia 23828",
      contactPhone: "Walter (Co-host: Fabio) +39 335 129 7553",
      confirmationNumber: "HM4K483EX2"
    },
    warnings: [
      {
        type: "warning",
        message: "Varenna has free parking on Via Croce; Bellagio parking €15/day. Check ferry timetables"
      }
    ]
  }
];
