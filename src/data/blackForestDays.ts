
import { TripDay } from "@/types/trip";

export const blackForestDays: TripDay[] = [
  {
    id: "day-17",
    dayNumber: 17,
    date: "2025-06-21",
    city: "Black Forest",
    country: "Germany",
    description: "Stuttgart to Black Forest - Begin exploration",
    title: "Stuttgart to Black Forest",
    activities: [
      {
        id: "checkout-stuttgart",
        time: "11:00 AM",
        activity: "Check-out from Adina Hotel Stuttgart",
        type: "travel",
        icon: "🏨",
        completed: false,
        location: "Kopenhagener Strasse 3, Stuttgart"
      },
      {
        id: "depart-stuttgart",
        time: "11:30 AM",
        activity: "Depart Stuttgart for Black Forest",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Stuttgart",
        note: "B27 south toward Tübingen/Triberg"
      },
      {
        id: "burg-hohenzollern",
        time: "1:00 PM",
        activity: "Burg Hohenzollern castle",
        type: "sightseeing",
        icon: "🏰",
        completed: false,
        location: "Burg Hohenzollern",
        mustTry: true
      },
      {
        id: "triberg-arrival",
        time: "4:00 PM",
        activity: "Begin Black Forest exploration - Triberg area",
        type: "sightseeing",
        icon: "🌲",
        completed: false,
        location: "Triberg, Black Forest",
        mustTry: true
      },
      {
        id: "dinner-gasthaus",
        time: "7:00 PM",
        activity: "Dinner at traditional Black Forest gasthaus",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Black Forest area",
        mustTry: true
      }
    ],
    accommodation: {
      name: "NEEDS BOOKING",
      address: "Black Forest area"
    },
    warnings: [
      {
        type: "warning",
        message: "Book accommodation in advance. Mountain driving conditions"
      }
    ]
  },
  {
    id: "day-18",
    dayNumber: 18,
    date: "2025-06-22",
    city: "Black Forest",
    country: "Germany",
    description: "Full day exploring Black Forest attractions",
    title: "Black Forest Exploration",
    activities: [
      {
        id: "triberg-waterfalls",
        time: "9:00 AM",
        activity: "Triberg waterfalls",
        type: "sightseeing",
        icon: "💧",
        completed: false,
        location: "Triberg",
        mustTry: true
      },
      {
        id: "cuckoo-clocks",
        time: "11:00 AM",
        activity: "Cuckoo clock shops",
        type: "shopping",
        icon: "🕰️",
        completed: false,
        location: "Triberg",
        mustTry: true
      },
      {
        id: "schwarzwaldbahn",
        time: "1:00 PM",
        activity: "Schwarzwaldbahn scenic railway",
        type: "sightseeing",
        icon: "🚂",
        completed: false,
        location: "Black Forest",
        mustTry: true
      },
      {
        id: "black-forest-cake",
        time: "3:00 PM",
        activity: "Black Forest cake tasting",
        type: "dining",
        icon: "🎂",
        completed: false,
        location: "Black Forest café",
        mustTry: true
      },
      {
        id: "kinzig-valley",
        time: "4:30 PM",
        activity: "Kinzig valley to Freudenstadt",
        type: "sightseeing",
        icon: "🌄",
        completed: false,
        location: "Kinzig Valley",
        note: "B500 Black Forest High Road"
      },
      {
        id: "dinner-local",
        time: "7:00 PM",
        activity: "Dinner - local specialties",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Freudenstadt area"
      }
    ],
    accommodation: {
      name: "NEEDS BOOKING",
      address: "Black Forest area"
    },
    warnings: [
      {
        type: "warning",
        message: "Mountain driving conditions on B500 Black Forest High Road"
      }
    ]
  }
];
