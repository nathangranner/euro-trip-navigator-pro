
import { TripDay } from "@/types/trip";

export const stuttgartDays: TripDay[] = [
  {
    id: "day-15",
    dayNumber: 15,
    date: "2025-06-19",
    city: "Stuttgart",
    country: "Germany",
    description: "Travel from Baden to Stuttgart",
    title: "Baden to Stuttgart",
    activities: [
      {
        id: "depart-baden",
        time: "11:00 AM",
        activity: "Depart Baden by car",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Baden",
        note: "220 km drive to Stuttgart, approximately 3 hours via A1 toward Winterthur"
      },
      {
        id: "border-crossing",
        time: "12:00 PM",
        activity: "Cross border near Schaffhausen",
        type: "travel",
        icon: "🛂",
        completed: false,
        location: "Swiss-German border",
        note: "A81 to Stuttgart, Exit Stuttgart-Zuffenhausen"
      },
      {
        id: "arrive-stuttgart",
        time: "2:00 PM",
        activity: "Arrive in Stuttgart",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Stuttgart"
      },
      {
        id: "checkin-stuttgart",
        time: "3:00 PM",
        activity: "Check-in Stuttgart accommodation",
        type: "travel",
        icon: "🏠",
        completed: false,
        location: "Kopenhagener Strasse 3, Stuttgart"
      },
      {
        id: "explore-center",
        time: "4:00 PM",
        activity: "Explore Stuttgart center",
        type: "sightseeing",
        icon: "🚶",
        completed: false,
        location: "Stuttgart city center"
      },
      {
        id: "schlossplatz",
        time: "6:00 PM",
        activity: "Schlossplatz & Königstrasse",
        type: "sightseeing",
        icon: "🏰",
        completed: false,
        location: "Schlossplatz",
        mustTry: true
      },
      {
        id: "dinner-german",
        time: "8:00 PM",
        activity: "Dinner at local German restaurant",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Stuttgart",
        mustTry: true
      }
    ],
    accommodation: {
      name: "Adina Apartment Hotel Stuttgart",
      address: "Kopenhagener Strasse 3, Stuttgart, Baden-Württemberg 70173",
      checkin: "3:00 PM",
      checkout: "June 21, 11:00 AM",
      contactPhone: "+49-711-4909290",
      confirmationNumber: "CI5EKCQU",
      wifi: "One Bedroom King Apartment (27-38 sq m), full kitchen, washer-dryer",
      totalPrice: "EUR 623.32 total"
    },
    warnings: [
      {
        type: "warning",
        message: "City center parking €15-25/day"
      }
    ]
  },
  {
    id: "day-16",
    dayNumber: 16,
    date: "2025-06-20",
    city: "Stuttgart",
    country: "Germany",
    description: "Full day exploring Stuttgart museums",
    title: "Stuttgart Museums",
    activities: [
      {
        id: "mercedes-museum",
        time: "9:00 AM",
        activity: "Mercedes-Benz Museum",
        type: "culture",
        icon: "🚗",
        completed: false,
        location: "Mercedes-Benz Museum",
        mustTry: true
      },
      {
        id: "lunch-break",
        time: "1:00 PM",
        activity: "Lunch break",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Museum café"
      },
      {
        id: "porsche-museum",
        time: "2:30 PM",
        activity: "Porsche Museum",
        type: "culture",
        icon: "🏎️",
        completed: false,
        location: "Porsche Museum",
        mustTry: true
      },
      {
        id: "staatsgalerie",
        time: "5:00 PM",
        activity: "Staatsgalerie Stuttgart",
        type: "culture",
        icon: "🎨",
        completed: false,
        location: "Staatsgalerie Stuttgart"
      },
      {
        id: "dinner-local",
        time: "8:00 PM",
        activity: "Dinner at local restaurant",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Stuttgart"
      }
    ],
    accommodation: {
      name: "Adina Apartment Hotel Stuttgart",
      address: "Kopenhagener Strasse 3, Stuttgart, Baden-Württemberg 70173",
      contactPhone: "+49-711-4909290",
      confirmationNumber: "CI5EKCQU"
    },
    warnings: [
      {
        type: "warning",
        message: "Museums closed Mondays. Use U-Bahn/S-Bahn for transportation"
      }
    ]
  },
  {
    id: "day-17",
    dayNumber: 17,
    date: "2025-06-21",
    city: "Stuttgart",
    country: "Germany",
    description: "Pre-audition preparation day",
    title: "Stuttgart (Pre-Audition)",
    activities: [
      {
        id: "visit-staatsoper",
        time: "10:00 AM",
        activity: "Visit Staatsoper Stuttgart",
        type: "culture",
        icon: "🎭",
        completed: false,
        location: "Oberer Schlossgarten 6",
        mustTry: true
      },
      {
        id: "venue-walkthrough",
        time: "11:00 AM",
        activity: "Venue walkthrough",
        type: "culture",
        icon: "🚶",
        completed: false,
        location: "Staatsoper Stuttgart",
        note: "Familiarize with audition venue"
      },
      {
        id: "vocal-warmups",
        time: "2:00 PM",
        activity: "Vocal warm-ups in apartment",
        type: "culture",
        icon: "🎵",
        completed: false,
        location: "Adina Hotel apartment"
      },
      {
        id: "light-rehearsal",
        time: "4:00 PM",
        activity: "Light rehearsal",
        type: "culture",
        icon: "🎼",
        completed: false,
        location: "Adina Hotel apartment"
      },
      {
        id: "early-dinner",
        time: "6:00 PM",
        activity: "Early dinner",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Stuttgart",
        note: "Light, voice-friendly meals"
      },
      {
        id: "rest-time",
        time: "8:00 PM",
        activity: "Rest and preparation",
        type: "culture",
        icon: "😴",
        completed: false,
        location: "Adina Hotel apartment"
      }
    ],
    accommodation: {
      name: "Adina Apartment Hotel Stuttgart",
      address: "Kopenhagener Strasse 3, Stuttgart, Baden-Württemberg 70173",
      contactPhone: "+49-711-4909290",
      confirmationNumber: "CI5EKCQU"
    },
    warnings: [
      {
        type: "warning",
        message: "Avoid dairy and heavy foods. Focus on voice preparation"
      }
    ]
  },
  {
    id: "day-18",
    dayNumber: 18,
    date: "2025-06-22",
    city: "Stuttgart",
    country: "Germany", 
    description: "Opera audition day at Staatsoper Stuttgart",
    title: "Stuttgart Opera Audition Day",
    activities: [
      {
        id: "audition-prep",
        time: "9:00 AM",
        activity: "Final audition preparation and warm-up",
        type: "culture",
        icon: "🎭",
        completed: false,
        location: "Hotel or nearby practice room"
      },
      {
        id: "staatsoper-arrival",
        time: "Morning",
        activity: "Stuttgart Opera Audition at Staatsoper Stuttgart",
        type: "culture", 
        icon: "🎭",
        completed: false,
        location: "Staatsoper Stuttgart",
        mustTry: true,
        note: "Key contacts: Viktor Schoner (Intendant), Cornelius Meister (GMD), Boris Ignatov (Casting Director)"
      },
      {
        id: "final-preparation",
        time: "Morning",
        activity: "Final preparation",
        type: "culture",
        icon: "🎵",
        completed: false,
        location: "Adina Hotel apartment",
        note: "Last-minute vocal preparation and materials review"
      },
      {
        id: "opera-audition",
        time: "TBD",
        activity: "OPERA AUDITION at Staatsoper Stuttgart",
        type: "culture",
        icon: "🎭",
        completed: false,
        location: "Staatsoper Stuttgart",
        mustTry: true,
        note: "Meet: Viktor Schoner (Intendant), Cornelius Meister (GMD), Boris Ignatov (Casting)"
      },
      {
        id: "audition-targets",
        time: "During audition",
        activity: "Target venues: Hamburg State Opera, Berlin State Opera, Bavarian State Opera, Deutsche Oper Berlin, Semperoper Dresden",
        type: "culture",
        icon: "🎯",
        completed: false,
        location: "Staatsoper Stuttgart",
        note: "Networking opportunities with industry professionals"
      },
      {
        id: "celebration-dinner",
        time: "Evening",
        activity: "Post-audition celebration dinner",
        type: "dining",
        icon: "🥂",
        completed: false,
        location: "Stuttgart",
        mustTry: true
      }
    ],
    accommodation: {
      name: "Adina Apartment Hotel Stuttgart",
      address: "Kopenhagener Strasse 3, Stuttgart, Baden-Württemberg 70173",
      contactPhone: "+49-711-4909290",
      confirmationNumber: "CI5EKCQU",
      checkout: "June 23, 11:00 AM"
    },
    warnings: [
      {
        type: "critical",
        message: "AUDITION DAY: Bring extra copies of materials and business cards. Multiple routes to venue planned"
      }
    ]
  }
];
