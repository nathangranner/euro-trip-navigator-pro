
import { TripDay } from "@/types/trip";

export const bolognaDays: TripDay[] = [
  {
    id: "day-8",
    dayNumber: 8,
    date: "2025-06-12",
    city: "Bologna",
    country: "Italy",
    description: "Travel from Florence to Bologna",
    title: "Florence to Bologna",
    activities: [
      {
        id: "checkout-florence",
        time: "11:00 AM",
        activity: "Check-out from Florence accommodation",
        type: "travel",
        icon: "🏠",
        completed: false,
        location: "Via delle Porte Nuove, 34, Florence"
      },
      {
        id: "depart-florence",
        time: "12:30 PM",
        activity: "Depart Florence by car",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Florence",
        note: "115 km drive to Bologna, approximately 1.5 hours via A1 northbound"
      },
      {
        id: "arrive-bologna",
        time: "2:00 PM",
        activity: "Arrive in Bologna",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Bologna",
        note: "Exit Bologna Borgo Panigale, Via Marco Emilio Lepido → Via delle Lame"
      },
      {
        id: "checkin-bologna",
        time: "4:00 PM",
        activity: "Check-in Bologna accommodation",
        type: "travel",
        icon: "🏠",
        completed: false,
        location: "Via delle Lame 71/A, Bologna"
      },
      {
        id: "late-lunch",
        time: "3:00 PM",
        activity: "Late lunch en route",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "En route to Bologna"
      },
      {
        id: "piazza-maggiore-stroll",
        time: "5:30 PM",
        activity: "Evening stroll Piazza Maggiore",
        type: "sightseeing",
        icon: "🚶",
        completed: false,
        location: "Piazza Maggiore"
      },
      {
        id: "dinner-bologna",
        time: "8:00 PM",
        activity: "Traditional Bolognese dinner",
        type: "dining",
        icon: "🍝",
        completed: false,
        location: "Near Piazza Maggiore"
      }
    ],
    accommodation: {
      name: "SWING HOUSE - free parking, historic centre, NO ZTL",
      address: "Via delle Lame 71/A, Bologna, Emilia-Romagna 40122",
      checkin: "4:00 PM",
      checkout: "June 14, 10:00 AM",
      contactPhone: "Cristina +39 344 066 1776",
      confirmationNumber: "HMMDH5ZARB",
      wifi: "Free private parking 100m away (book 24h ahead), OUTSIDE ZTL"
    },
    warnings: [
      {
        type: "warning",
        message: "Via delle Lame is OUTSIDE ZTL - safe to drive! Call Cristina 24h ahead for parking"
      }
    ]
  },
  {
    id: "day-9",
    dayNumber: 9,
    date: "2025-06-13",
    city: "Bologna",
    country: "Italy",
    description: "Full day exploring Bologna",
    title: "Bologna",
    activities: [
      {
        id: "piazza-maggiore-basilica",
        time: "9:00 AM",
        activity: "Piazza Maggiore & Basilica San Petronio",
        type: "sightseeing",
        icon: "⛪",
        completed: false,
        location: "Piazza Maggiore",
        mustTry: true
      },
      {
        id: "two-towers",
        time: "10:30 AM",
        activity: "Two Towers (Torre Asinelli climb)",
        type: "sightseeing",
        icon: "🗼",
        completed: false,
        location: "Torre Asinelli",
        note: "498 steps to climb",
        mustTry: true
      },
      {
        id: "quadrilatero-market",
        time: "12:00 PM",
        activity: "Quadrilatero market area",
        type: "shopping",
        icon: "🛍️",
        completed: false,
        location: "Quadrilatero market"
      },
      {
        id: "lunch-mortadella",
        time: "1:00 PM",
        activity: "Mortadella at Quadrilatero market",
        type: "dining",
        icon: "🥩",
        completed: false,
        location: "Quadrilatero market",
        mustTry: true
      },
      {
        id: "university-tour",
        time: "2:00 PM",
        activity: "University of Bologna tour",
        type: "culture",
        icon: "🎓",
        completed: false,
        location: "University of Bologna"
      },
      {
        id: "porticoes-walk",
        time: "4:00 PM",
        activity: "Historic porticoes walk",
        type: "sightseeing",
        icon: "🚶",
        completed: false,
        location: "Bologna historic center"
      },
      {
        id: "dinner-tortellini",
        time: "8:00 PM",
        activity: "Dinner: Tortellini in brodo, Tagliatelle al ragù",
        type: "dining",
        icon: "🍝",
        completed: false,
        location: "Bologna",
        mustTry: true
      }
    ],
    accommodation: {
      name: "SWING HOUSE - free parking, historic centre, NO ZTL",
      address: "Via delle Lame 71/A, Bologna, Emilia-Romagna 40122",
      contactPhone: "Cristina +39 344 066 1776",
      confirmationNumber: "HMMDH5ZARB"
    },
    warnings: [
      {
        type: "warning",
        message: "Torre Asinelli has 498 steps - be prepared for the climb. All activities within walking distance"
      }
    ]
  }
];
