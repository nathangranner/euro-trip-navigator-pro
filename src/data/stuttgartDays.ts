import { TripDay } from "@/types/trip";

export const stuttgartDays: TripDay[] = [
  {
    id: "day-13",
    dayNumber: 13,
    date: "2025-06-17",
    city: "Stuttgart",
    country: "Germany",
    description: "Travel from Zürich to Stuttgart",
    title: "Zürich to Stuttgart",
    activities: [
      {
        id: "depart-zurich",
        time: "11:00 AM",
        activity: "Depart Zürich by car",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Zürich",
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
    id: "day-14",
    dayNumber: 14,
    date: "2025-06-18",
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
    id: "day-15",
    dayNumber: 15,
    date: "2025-06-19",
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
    id: "day-16",
    dayNumber: 16,
    date: "2025-06-20",
    city: "Stuttgart",
    country: "Germany",
    description: "Opera audition day at Staatsoper Stuttgart",
    title: "Stuttgart (AUDITION DAY)",
    specialEvent: true,
    activities: [
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
      checkout: "June 21, 11:00 AM"
    },
    warnings: [
      {
        type: "critical",
        message: "AUDITION DAY: Bring extra copies of materials and business cards. Multiple routes to venue planned"
      }
    ]
  },
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
  },
  {
    id: "day-19",
    dayNumber: 19,
    date: "2025-06-23",
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
    id: "day-20",
    dayNumber: 20,
    date: "2025-06-24",
    city: "Milan",
    country: "Italy",
    description: "Return to Milan via Lucerne",
    title: "Return to Milan via Lucerne",
    activities: [
      {
        id: "morning-departure",
        time: "9:00 AM",
        activity: "Depart for Lucerne",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "En route to Lucerne",
        note: "A2 south through Switzerland to Milan"
      },
      {
        id: "lucerne-arrival",
        time: "12:00 PM",
        activity: "Arrive in Lucerne",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Lucerne, Switzerland"
      },
      {
        id: "chapel-bridge",
        time: "12:30 PM",
        activity: "Chapel Bridge visit",
        type: "sightseeing",
        icon: "🌉",
        completed: false,
        location: "Chapel Bridge, Lucerne",
        mustTry: true
      },
      {
        id: "lucerne-oldtown",
        time: "1:00 PM",
        activity: "Lucerne Old Town exploration",
        type: "sightseeing",
        icon: "🏘️",
        completed: false,
        location: "Lucerne Old Town",
        mustTry: true
      },
      {
        id: "lucerne-lunch",
        time: "1:30 PM",
        activity: "Quick lunch in Lucerne",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Lucerne restaurant"
      },
      {
        id: "depart-lucerne",
        time: "2:00 PM",
        activity: "Depart Lucerne for Milan",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Lucerne",
        note: "Continue A2 south to Milan"
      },
      {
        id: "arrive-milan",
        time: "Evening",
        activity: "Arrive Milan area",
        type: "travel",
        icon: "🚗",
        completed: false,
        location: "Near Milan airport"
      },
      {
        id: "pack-prepare",
        time: "8:00 PM",
        activity: "Pack and prepare for departure",
        type: "travel",
        icon: "🧳",
        completed: false,
        location: "Milan hotel"
      },
      {
        id: "milan-dinner",
        time: "9:00 PM",
        activity: "Final dinner in Milan",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Milan restaurant",
        mustTry: true
      }
    ],
    accommodation: {
      name: "NEEDS BOOKING",
      address: "Near Milan airport"
    },
    warnings: [
      {
        type: "warning",
        message: "Allow extra time for border crossing and traffic. Book hotel near MXP"
      }
    ]
  },
  {
    id: "day-21",
    dayNumber: 21,
    date: "2025-06-25",
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
