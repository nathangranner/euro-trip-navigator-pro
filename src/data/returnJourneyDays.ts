
import { TripDay } from "@/types/trip";

export const returnJourneyDays: TripDay[] = [
  {
    id: "day-21",
    dayNumber: 21,
    date: "2025-06-23",
    city: "Locarno",
    country: "Switzerland",
    description: "Travel to Locarno, Switzerland - Lake Maggiore region",
    title: "Black Forest to Locarno",
    activities: [
      {
        id: "travel-locarno",
        time: "10:00 AM",
        activity: "Drive from Black Forest to Locarno",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "En route to Locarno",
        note: "Scenic drive through Switzerland to Lake Maggiore"
      },
      {
        id: "apartment-checkin",
        time: "3:00 PM",
        activity: "Check-in to IVANA Apartment",
        type: "accommodation",
        icon: "🏠",
        completed: false,
        location: "Vicolo Belforte 2 nr 6, Minusio",
        note: "Self check-in via lockbox. Access via Via San Gottardo opposite Denner"
      },
      {
        id: "explore-locarno",
        time: "5:00 PM",
        activity: "Explore Locarno town center",
        type: "sightseeing",
        icon: "🚶",
        completed: false,
        location: "Locarno",
        note: "10 min walk to Locarno FFS station, shops nearby"
      },
      {
        id: "lake-maggiore-dinner",
        time: "7:00 PM",
        activity: "Dinner with lake view",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Locarno lakefront",
        note: "Enjoy Lake Maggiore views"
      }
    ],
    accommodation: {
      name: "IVANA Apartment, Minusio",
      address: "Vicolo Belforte 2 nr 6, 6648 Minusio TI, Switzerland",
      checkin: "15:00",
      checkout: "11:00",
      contactPhone: "Host: Renzo",
      confirmationNumber: "#HM2HSKZYNQ",
      wifi: "Free Wi-Fi included",
      parking: "Covered parking available (height 1.90m max)"
    },
    accommodationName: "IVANA Apartment, Minusio",
    accommodationAddress: "Vicolo Belforte 2 nr 6, 6648 Minusio TI, Switzerland",
    accommodationCheckIn: "15:00 Jun 23",
    accommodationCheckOut: "11:00 Jun 25",
    accommodationContact: "Host: Renzo",
    accommodationConfirmation: "#HM2HSKZYNQ",
    accommodationWifi: "Free Wi-Fi included",
    accommodationNotes: "Self check-in via lockbox. Access via Via San Gottardo opposite Denner. AC available CHF 5/day. EV charging on-site.",
    warnings: [
      {
        type: "warning",
        message: "Narrow lane access - notify host if bringing larger vehicle. Quiet hours 22:00-07:00"
      }
    ]
  },
  {
    id: "day-22",
    dayNumber: 22,
    date: "2025-06-24",
    city: "Locarno",
    country: "Switzerland",
    description: "Full day exploring Locarno and Lake Maggiore",
    title: "Locarno & Lake Maggiore",
    activities: [
      {
        id: "balcony-breakfast",
        time: "8:00 AM",
        activity: "Breakfast on apartment balcony",
        type: "dining",
        icon: "☕",
        completed: false,
        location: "IVANA Apartment balcony",
        note: "Lake & mountain views from balcony - perfect for breakfast"
      },
      {
        id: "lake-maggiore-boat",
        time: "10:00 AM",
        activity: "Lake Maggiore boat trip",
        type: "sightseeing",
        icon: "⛵",
        completed: false,
        location: "Lake Maggiore",
        mustTry: true
      },
      {
        id: "locarno-old-town",
        time: "2:00 PM",
        activity: "Explore Locarno Old Town",
        type: "sightseeing",
        icon: "🏛️",
        completed: false,
        location: "Locarno Old Town",
        note: "Historic town center and Piazza Grande"
      },
      {
        id: "shopping-local",
        time: "4:00 PM",
        activity: "Local shopping",
        type: "shopping",
        icon: "🛍️",
        completed: false,
        location: "Migros, Denner, Coop nearby",
        note: "Shops within 1 min walk from apartment"
      },
      {
        id: "swiss-dinner",
        time: "7:00 PM",
        activity: "Swiss cuisine dinner",
        type: "dining",
        icon: "🫕",
        completed: false,
        location: "Local restaurant",
        mustTry: true
      }
    ],
    accommodationName: "IVANA Apartment, Minusio",
    accommodationAddress: "Vicolo Belforte 2 nr 6, 6648 Minusio TI, Switzerland",
    accommodationCheckIn: "15:00 Jun 23",
    accommodationCheckOut: "11:00 Jun 25",
    accommodationContact: "Host: Renzo",
    accommodationConfirmation: "#HM2HSKZYNQ"
  },
  {
    id: "day-23",
    dayNumber: 23,
    date: "2025-06-25",
    city: "Locarno to Milan",
    country: "Switzerland/Italy",
    description: "Departure from Locarno to Milan for flight home",
    title: "Locarno to Milan Departure",
    activities: [
      {
        id: "apartment-checkout",
        time: "10:30 AM",
        activity: "Check out of IVANA Apartment",
        type: "accommodation",
        icon: "🏠",
        completed: false,
        location: "IVANA Apartment",
        note: "Gather towels, dispose trash at Migros container, leave keys on table",
        checklist: [
          "Gather used towels",
          "Trash to container near Migros",
          "Recycling to stairwell bins", 
          "Keys on table or return to lockbox"
        ]
      },
      {
        id: "drive-milan",
        time: "11:00 AM",
        activity: "Drive to Milan Malpensa Airport",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "En route to MXP",
        note: "Return rental car and prepare for departure"
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
