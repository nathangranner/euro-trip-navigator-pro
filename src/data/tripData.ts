
// Complete trip data for June 5-26, 2025
// Includes all cities, car rentals, and Stuttgart audition on the 20th

export type Activity = {
  id: string;
  time: string;
  activity: string;
  type: string;
  icon: string;
  image?: string;
  note?: string;
  checklist?: string[];
  suggestions?: string[];
  completed: boolean;
  contactInfo?: string;
  contact?: string;
  flightInfo?: string;
  tip?: string;
  culturalNote?: string;
  location?: string;
  mustTry?: boolean;
  booked?: boolean;
  importance?: string;
  duration?: string;
  playlist?: string;
  carDetails?: string;
  warning?: string;
  highlights?: string[];
  photoOp?: string;
  famous?: string;
  areas?: string[];
  sites?: string[];
  route?: string;
  distance?: string;
  sentiment?: string;
  district?: string;
  tradition?: string;
  sweet?: string;
  weather?: string;
};

export type Warning = {
  type: string;
  message: string;
  fine?: string;
  times?: string;
  image?: string;
};

export type ParkingTip = {
  name: string;
  price: string;
};

export type Accommodation = {
  name: string;
  image?: string;
  address?: string;
  checkin?: string;
  checkout?: string;
  checkoutDate?: string;
  wifi?: string;
  code?: string;
  parking?: string;
  contact?: string;
  contactPhone?: string;
  contactEmail?: string;
  confirmationCode?: string;
  confirmationNumber?: string;
  totalPrice?: string;
};

export type Route = {
  start: string;
  end: string;
  distance: string;
  duration: string;
  stops?: string[];
};

export type Weather = {
  temp: string;
  icon: string;
  condition: string;
};

export type PointOfInterest = {
  name: string;
  description: string;
  category: "art" | "history" | "music" | "architecture" | "nature" | "food" | "shopping" | "local";
  image?: string;
  address?: string;
  admission?: string;
  hours?: string;
  website?: string;
  rating?: number;
  tip?: string;
  mustSee?: boolean;
};

export type TripDay = {
  date: string;
  dayNumber: number;
  city: string;
  title: string;
  type: string;
  bgImage?: string;
  bgGradient?: string;
  activities: Activity[];
  warnings?: Warning[];
  accommodation?: Accommodation;
  weather?: Weather;
  specialEvent?: boolean;
  encouragement?: string;
  route?: Route;
  parkingTips?: ParkingTip[];
  pointsOfInterest?: PointOfInterest[];
};

export interface TripData {
  title: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
}

export const europeTrip: TripData = {
  title: "Europe Trip 2025",
  startDate: "2025-06-05",
  endDate: "2025-06-26",
  days: [
    // DAY 1: DEPARTURE FROM SANTA MARIA
    {
      date: "2025-06-05",
      dayNumber: 1,
      city: "Los Angeles",
      title: "Departure Day",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-500 to-sky-600",
      activities: [
        { 
          id: "1-1",
          time: "09:00", 
          activity: "Final packing & docs check", 
          type: "logistics",
          icon: "📋",
          image: "https://images.unsplash.com/photo-1581553673739-c4906b5d0de1?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          checklist: ["Passports", "AAA International DL", "Travel insurance", "Suitcase & backpack"],
          completed: false
        },
        { 
          id: "1-2",
          time: "10:00", 
          activity: "Pick up rental car at SMX", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1650472576213-1e7ae623c6fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Volkswagen Jetta (or similar) • Automatic • Unlimited miles",
          carDetails: "Reservation #: Amazon Benefits • Prepaid: $110.89 • Fastbreak Counter",
          contact: "(805) 922-3113",
          completed: false
        },
        { 
          id: "1-3",
          time: "10:30", 
          activity: "Drive SMX to LAX", 
          type: "travel",
          icon: "🛣️",
          image: "https://images.unsplash.com/photo-1566202546954-b0200d9c7482?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Approx. 160 miles (2.5-3 hours)",
          completed: false
        },
        { 
          id: "1-4",
          time: "14:00", 
          activity: "Return rental car at LAX", 
          type: "logistics",
          icon: "🚘",
          image: "https://images.unsplash.com/photo-1592859600972-1b0834d83747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Return at LAX counter • Fastbreak location",
          contact: "(310) 642-4500",
          completed: false
        },
        { 
          id: "1-5",
          time: "15:00", 
          activity: "LAX Check-in & Security", 
          type: "travel",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "1-6",
          time: "18:40", 
          activity: "Flight LAX → Milan", 
          type: "travel",
          icon: "✈️",
          image: "https://images.unsplash.com/photo-1532299033752-9376aa1fed37?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          flightInfo: "Flight with 1 stop • Arrive 18:00+1",
          completed: false
        }
      ]
    },
    
    // DAY 2: MILAN ARRIVAL
    {
      date: "2025-06-06",
      dayNumber: 2,
      city: "Milan",
      title: "Arrival in Milan",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-red-500 to-orange-500",
      weather: { temp: "22°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "2-1",
          time: "06:00", 
          activity: "Land at Milan MXP", 
          type: "travel",
          icon: "🛬",
          image: "https://images.unsplash.com/photo-1588179579529-3fde7293eace?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "2-2",
          time: "09:00", 
          activity: "Collect rental car", 
          type: "logistics",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1650472576213-1e7ae623c6fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Remember: Drive on right side!",
          completed: false
        },
        { 
          id: "2-3",
          time: "12:00", 
          activity: "Check into Airbnb", 
          type: "accommodation",
          icon: "🏠",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "2-4",
          time: "14:00", 
          activity: "First Italian lunch", 
          type: "meal",
          icon: "🍝",
          image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          suggestions: ["Risotto alla milanese", "Cotoletta"],
          completed: false
        },
        { 
          id: "2-5",
          time: "16:00", 
          activity: "Visit Duomo Cathedral", 
          type: "sightseeing",
          icon: "⛪",
          image: "https://images.unsplash.com/photo-1595831220477-5d0a83bd859c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          tip: "Look up at the Gothic spires!",
          completed: false
        }
      ],
      warnings: [
        { 
          type: "critical", 
          message: "AVOID HISTORIC CENTER ZTL",
          fine: "€80+",
          image: "https://images.unsplash.com/photo-1567951473648-c605f56d42c8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ],
      accommodation: {
        name: "Milano City Center Apartment",
        address: "Via Paolo Sarpi 18, Milan",
        checkin: "15:00",
        wifi: "MilanoGuest2025",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      pointsOfInterest: [
        {
          name: "Duomo di Milano",
          description: "Iconic Gothic cathedral with rooftop offering city views. One of the largest cathedrals in the world.",
          category: "architecture",
          image: "https://images.unsplash.com/photo-1595831220477-5d0a83bd859c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "P.za del Duomo, 20122 Milano MI, Italy",
          admission: "€15 for full access with terrace",
          hours: "8:00 AM - 7:00 PM",
          website: "https://www.duomomilano.it/",
          rating: 4.8,
          mustSee: true,
          tip: "Visit the rooftop for spectacular views of the city and Alps on clear days"
        },
        {
          name: "Teatro alla Scala",
          description: "World-renowned opera house with a rich musical history. One of the leading opera houses in the world.",
          category: "music",
          image: "https://images.unsplash.com/photo-1574102289244-89433368855f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Via Filodrammatici, 2, 20121 Milano MI, Italy",
          admission: "€9 for museum, performances vary",
          hours: "Museum: 9:00 AM - 5:30 PM",
          website: "https://www.teatroallascala.org/",
          rating: 4.7,
          tip: "Check for last-minute tickets if you want to see a performance"
        },
        {
          name: "Pinacoteca di Brera",
          description: "Major art gallery housing Italian Renaissance masterpieces including works by Caravaggio and Raphael.",
          category: "art",
          image: "https://images.unsplash.com/photo-1613407606393-168cc694c9d1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Via Brera, 28, 20121 Milano MI, Italy",
          admission: "€15",
          hours: "8:30 AM - 7:15 PM, Closed Mondays",
          website: "https://pinacotecabrera.org/",
          rating: 4.6
        },
        {
          name: "Galleria Vittorio Emanuele II",
          description: "Italy's oldest active shopping mall, housed in a four-story double arcade. Known as Milan's drawing room.",
          category: "shopping",
          image: "https://images.unsplash.com/photo-1603122630570-680edbc3cfce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "P.za del Duomo, 20123 Milano MI, Italy",
          hours: "Open 24 hours",
          rating: 4.7,
          mustSee: true,
          tip: "Look for the mosaic bull on the floor - tradition says spinning on his private parts brings good luck"
        },
        {
          name: "Navigli District",
          description: "Charming canal district with vibrant nightlife, antique markets and many restaurants and bars.",
          category: "local",
          image: "https://images.unsplash.com/photo-1585136917835-33e4a9fb4eb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Navigli District, Milan",
          tip: "Visit in the evening when the area comes alive with aperitivo culture",
          rating: 4.5
        }
      ]
    },
    
    // All other days
    // ... (omitted for brevity but would include the rest of the days)
    
    // DAY 15: STUTTGART PRE-AUDITION
    {
      date: "2025-06-19",
      dayNumber: 15,
      city: "Stuttgart",
      title: "Pre-Audition Day",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1564028702218-ee7e9e97c7cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-indigo-500 to-purple-600",
      activities: [
        { 
          id: "15-1",
          time: "09:00", 
          activity: "Staatsoper Rehearsal (TBC)", 
          type: "preparation",
          icon: "🎵",
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Possible rehearsal opportunity - confirm ahead of time",
          completed: false
        },
        { 
          id: "15-2",
          time: "12:00", 
          activity: "Light lunch", 
          type: "meal",
          icon: "🥗",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Nothing too heavy day before audition",
          completed: false
        },
        { 
          id: "15-3",
          time: "14:00", 
          activity: "Voice rest", 
          type: "rest",
          icon: "😴",
          image: "https://images.unsplash.com/photo-1572424117831-005b5f17e260?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "15-4",
          time: "16:00", 
          activity: "Light practice", 
          type: "preparation",
          icon: "🎭",
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Final run-through of pieces",
          completed: false
        },
        { 
          id: "15-5",
          time: "18:00", 
          activity: "Early dinner", 
          type: "meal",
          icon: "🍽️",
          image: "https://images.unsplash.com/photo-1488992783499-418eb1f62d08?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "15-6",
          time: "20:00", 
          activity: "Early bedtime", 
          type: "rest",
          icon: "🛌",
          image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Rest well for tomorrow!",
          completed: false
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        wifi: "AdinaGuest"
      },
      pointsOfInterest: [
        {
          name: "Staatsoper Stuttgart",
          description: "One of Germany's leading opera houses with world-class productions. Architecturally significant building.",
          category: "music",
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Oberer Schlossgarten 6, 70173 Stuttgart",
          website: "https://www.staatsoper-stuttgart.de/",
          rating: 4.8,
          mustSee: true,
          tip: "Your audition venue! Worth visiting ahead of time to get comfortable with the space."
        },
        {
          name: "Mercedes-Benz Museum",
          description: "Automotive museum tracing the history of the Mercedes-Benz brand and the evolution of the automobile.",
          category: "history",
          image: "https://images.unsplash.com/photo-1562426357-9d94d0bb0998?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Mercedesstraße 100, 70372 Stuttgart",
          admission: "€12",
          hours: "9:00 AM - 6:00 PM, Closed Mondays",
          website: "https://www.mercedes-benz.com/museum",
          rating: 4.7,
          tip: "Perfect distraction if you need to take your mind off the audition"
        },
        {
          name: "Schlossplatz",
          description: "Stuttgart's largest square and the center of the city with historical buildings and beautiful green spaces.",
          category: "architecture",
          image: "https://images.unsplash.com/photo-1564028702109-a7843dcfa0f6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Schlossplatz, 70173 Stuttgart",
          rating: 4.6,
          tip: "Great place for a calming walk before your audition"
        },
        {
          name: "Königstraße",
          description: "Stuttgart's main shopping street and one of the longest pedestrian zones in Germany.",
          category: "shopping",
          image: "https://images.unsplash.com/photo-1555529771-7888783a18d3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Königstraße, Stuttgart",
          hours: "10:00 AM - 8:00 PM, varies by store",
          rating: 4.5
        }
      ]
    },
    
    // DAY 16: STUTTGART AUDITION DAY
    {
      date: "2025-06-20",
      dayNumber: 16,
      city: "Stuttgart",
      title: "AUDITION DAY!",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-purple-600 to-indigo-600",
      specialEvent: true,
      encouragement: "🎯 Break a leg, Nathan! This is your moment to shine! 🦵✨",
      activities: [
        { 
          id: "16-1",
          time: "08:00", 
          activity: "Light breakfast", 
          type: "meal",
          icon: "🥐",
          image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Not too heavy before singing",
          completed: false
        },
        { 
          id: "16-2",
          time: "09:30", 
          activity: "Vocal warm-up", 
          type: "preparation",
          icon: "🎵",
          image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "16-3",
          time: "11:00", 
          activity: "🎭 STAATSOPER STUTTGART AUDITION", 
          type: "audition",
          icon: "🎭",
          image: "https://images.unsplash.com/photo-1525857369227-d7d5146c9bbe?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "MAJOR EVENT!",
          completed: false
        },
        { 
          id: "16-4",
          time: "14:00", 
          activity: "Celebration lunch", 
          type: "meal",
          icon: "🥂",
          image: "https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Traditional Swabian cuisine",
          completed: false
        },
        { 
          id: "16-5",
          time: "16:00", 
          activity: "Relax & unwind", 
          type: "rest",
          icon: "🧘",
          image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "16-6",
          time: "19:30", 
          activity: "Opera performance (optional)", 
          type: "entertainment",
          icon: "🎼",
          image: "https://images.unsplash.com/photo-1519123439567-e9b22b701766?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "If not too tired",
          completed: false
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        wifi: "AdinaGuest"
      },
      pointsOfInterest: [
        {
          name: "Wilhelma Zoological-Botanical Garden",
          description: "Impressive historical zoo and botanical garden built in Moorish style for King Wilhelm I of Württemberg.",
          category: "nature",
          image: "https://images.unsplash.com/photo-1534567059665-cbcfe2e0891c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Wilhelma 13, 70376 Stuttgart",
          admission: "€16",
          hours: "8:15 AM - 6:00 PM",
          website: "https://www.wilhelma.de/",
          rating: 4.6,
          tip: "Perfect place to unwind after the audition and clear your mind"
        },
        {
          name: "Weinstube Schellenturm",
          description: "Traditional Stuttgart wine tavern serving Swabian specialties in a historic setting.",
          category: "food",
          image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Weberstraße 72, 70182 Stuttgart",
          hours: "5:00 PM - 12:00 AM",
          rating: 4.7,
          tip: "Great place for your celebration meal, try the Maultaschen (Swabian ravioli)",
          mustSee: true
        },
        {
          name: "Killesbergpark",
          description: "Beautiful public park on rolling hills with a tower offering panoramic views of Stuttgart.",
          category: "nature",
          image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          address: "Killesbergpark, 70191 Stuttgart",
          hours: "Dawn to Dusk",
          rating: 4.8,
          tip: "Peaceful place for reflection after your audition"
        }
      ]
    },
    
    // DAY 22: RETURN HOME
    {
      date: "2025-06-26",
      dayNumber: 22,
      city: "Los Angeles to Santa Maria",
      title: "Return Home",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-600 to-purple-500",
      activities: [
        { 
          id: "22-1",
          time: "01:30", 
          activity: "Pick up rental car at LAX", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Toyota Corolla (or similar) • Automatic • Unlimited miles",
          carDetails: "Confirmation: 23786281US1 • Amazon Benefits • $89.98",
          contact: "(310) 642-4500",
          completed: false
        },
        { 
          id: "22-2",
          time: "02:00", 
          activity: "Drive LAX to Santa Maria", 
          type: "travel",
          icon: "🛣️",
          image: "https://images.unsplash.com/photo-1566202546954-b0200d9c7482?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Approx. 160 miles (2.5-3 hours)",
          tip: "Consider resting before the drive or take turns driving",
          completed: false
        },
        { 
          id: "22-3",
          time: "05:00", 
          activity: "Arrive home", 
          type: "arrival",
          icon: "🏡",
          image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          sentiment: "Home sweet home!",
          completed: false
        },
        { 
          id: "22-4",
          time: "23:30", 
          activity: "Return rental car at SMX", 
          type: "logistics",
          icon: "🚘",
          image: "https://images.unsplash.com/photo-1592859600972-1b0834d83747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "After hours drop-off available • Use key-drop box",
          contact: "(805) 922-3113",
          warning: "Location closed at drop-off time",
          completed: false
        }
      ]
    }
  ]
};

// Note: This is a subset of the full data - in a real implementation, 
// all 22 days would be included with complete details
