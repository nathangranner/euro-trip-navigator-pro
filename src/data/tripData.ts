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
    
    // DAY 3: MILAN EXPLORATION
    {
      date: "2025-06-07",
      dayNumber: 3,
      city: "Milan",
      title: "Milan Exploration",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1574400971930-3dea69d47158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-amber-500 to-red-500",
      weather: { temp: "23°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "3-1",
          time: "09:00", 
          activity: "Visit Castello Sforzesco", 
          type: "sightseeing",
          icon: "🏰",
          image: "https://images.unsplash.com/photo-1591467359124-9adc4ed5d30f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Historic castle and museums",
          completed: false
        },
        { 
          id: "3-2",
          time: "12:30", 
          activity: "Lunch at Brera District", 
          type: "meal",
          icon: "🍕",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          district: "Bohemian art district",
          completed: false
        },
        { 
          id: "3-3",
          time: "14:30", 
          activity: "Pinacoteca di Brera", 
          type: "culture",
          icon: "🖼️",
          image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Famous art gallery",
          completed: false
        },
        { 
          id: "3-4",
          time: "17:00", 
          activity: "Aperitivo at Navigli", 
          type: "leisure",
          icon: "🍷",
          image: "https://images.unsplash.com/photo-1529333166437-7750a6dd064a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Canal district with vibrant nightlife",
          completed: false
        }
      ],
      accommodation: {
        name: "Milano City Center Apartment",
        address: "Via Paolo Sarpi 18, Milan",
        wifi: "MilanoGuest2025",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 4: TRAVEL TO VENICE
    {
      date: "2025-06-08",
      dayNumber: 4,
      city: "Venice",
      title: "Travel to Venice",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-500 to-cyan-500",
      activities: [
        { 
          id: "4-1",
          time: "08:00", 
          activity: "Drive Milan to Venice", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1552244940-c503219a18a8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "280 km (approximately 3 hours)",
          completed: false
        },
        { 
          id: "4-2",
          time: "11:30", 
          activity: "Park at Piazzale Roma", 
          type: "logistics",
          icon: "🅿️",
          image: "https://images.unsplash.com/photo-1572369525618-dd7cbd1c8158?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Last vehicle access point for Venice",
          warning: "Expensive parking - around €30/day",
          completed: false
        },
        { 
          id: "4-3",
          time: "13:00", 
          activity: "Water taxi to hotel", 
          type: "travel",
          icon: "🚤",
          image: "https://images.unsplash.com/photo-1605102997747-393edb1b9cb4?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "More expensive but faster than vaporetto",
          completed: false
        },
        { 
          id: "4-4",
          time: "15:00", 
          activity: "First glimpse of St. Mark's Square", 
          type: "sightseeing",
          icon: "⛪",
          image: "https://images.unsplash.com/photo-1610595428741-801adbd7c2e8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          famous: "Piazza San Marco",
          completed: false
        },
        { 
          id: "4-5",
          time: "19:00", 
          activity: "Seafood dinner", 
          type: "meal",
          icon: "🦑",
          image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          suggestions: ["Risotto al nero di seppia", "Fritto misto"],
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Rialto Venice",
        address: "Riva del Ferro, 5149, 30124 Venezia",
        checkin: "15:00",
        wifi: "RialtoGuest",
        image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      warnings: [
        { 
          type: "critical", 
          message: "NO CARS IN VENICE",
          fine: "€100+",
          image: "https://images.unsplash.com/photo-1570449942860-bb66578faf58?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ]
    },
    
    // DAY 5: VENICE EXPLORATION
    {
      date: "2025-06-09",
      dayNumber: 5,
      city: "Venice",
      title: "Venice Exploration",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-600 to-blue-400",
      weather: { temp: "24°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "5-1",
          time: "09:00", 
          activity: "St. Mark's Basilica", 
          type: "sightseeing",
          icon: "⛪",
          image: "https://images.unsplash.com/photo-1529875755139-ea7e5b81c0ca?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Byzantine masterpiece",
          tip: "Book ahead to skip the line",
          completed: false
        },
        { 
          id: "5-2",
          time: "11:30", 
          activity: "Doge's Palace", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1583853269687-0daaa24a8447?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Gothic style Venetian government palace",
          completed: false
        },
        { 
          id: "5-3",
          time: "14:00", 
          activity: "Gondola ride", 
          type: "experience",
          icon: "🚣",
          image: "https://images.unsplash.com/photo-1580694920128-2e89f84a3f04?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "30 minutes - €80 (day rate)",
          tip: "Negotiate price beforehand",
          completed: false
        },
        { 
          id: "5-4",
          time: "17:00", 
          activity: "Rialto Bridge & Market", 
          type: "sightseeing",
          icon: "🌉",
          image: "https://images.unsplash.com/photo-1642267315154-9664a61a6cdf?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          photoOp: "Classic Venice canal shot",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Rialto Venice",
        address: "Riva del Ferro, 5149, 30124 Venezia",
        wifi: "RialtoGuest",
        image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 6: TRAVEL TO FLORENCE
    {
      date: "2025-06-10",
      dayNumber: 6,
      city: "Florence",
      title: "Travel to Florence",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-orange-500 to-amber-400",
      activities: [
        { 
          id: "6-1",
          time: "08:30", 
          activity: "Water taxi to Piazzale Roma", 
          type: "travel",
          icon: "🚤",
          image: "https://images.unsplash.com/photo-1605102997747-393edb1b9cb4?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "6-2",
          time: "09:30", 
          activity: "Collect car from parking", 
          type: "logistics",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1548853769-c71e6a07887b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "6-3",
          time: "10:00", 
          activity: "Drive Venice to Florence", 
          type: "travel",
          icon: "🛣️",
          image: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "260 km (approximately 3 hours)",
          completed: false
        },
        { 
          id: "6-4",
          time: "14:00", 
          activity: "Check into Florence hotel", 
          type: "accommodation",
          icon: "🏨",
          image: "https://images.unsplash.com/photo-1551130751-9fbdcf05bc00?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "6-5",
          time: "16:00", 
          activity: "First view of Duomo", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1598040615216-f2e801079741?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Florence's iconic cathedral",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Brunelleschi",
        address: "Piazza Sant'Elisabetta, 3, 50122 Firenze FI",
        checkin: "14:00",
        wifi: "BrunelleschiGuest",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      warnings: [
        { 
          type: "critical", 
          message: "HISTORIC CENTER ZTL",
          fine: "€100+",
          image: "https://images.unsplash.com/photo-1575548393466-803d449b92ef?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          times: "7:30-19:30"
        }
      ]
    },
    
    // DAY 7: FLORENCE ART & CULTURE
    {
      date: "2025-06-11",
      dayNumber: 7,
      city: "Florence",
      title: "Florence Art & Culture",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1543429257-3eb0b65d9c58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-amber-600 to-yellow-500",
      weather: { temp: "26°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "7-1",
          time: "08:30", 
          activity: "Uffizi Gallery", 
          type: "art",
          icon: "🖼️",
          image: "https://images.unsplash.com/photo-1603720020604-e2cb80ef4bd3?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Botticelli, Leonardo, Michelangelo",
          tip: "Pre-booked tickets essential",
          completed: false
        },
        { 
          id: "7-2",
          time: "13:00", 
          activity: "Lunch at Mercato Centrale", 
          type: "meal",
          icon: "🍝",
          image: "https://images.unsplash.com/photo-1597343496490-a5cd4410abe1?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Gourmet food hall",
          completed: false
        },
        { 
          id: "7-3",
          time: "15:00", 
          activity: "Accademia Gallery - David", 
          type: "art",
          icon: "🗿",
          image: "https://images.unsplash.com/photo-1598550476938-8f33d58e1886?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Michelangelo's masterpiece",
          completed: false
        },
        { 
          id: "7-4",
          time: "17:30", 
          activity: "Ponte Vecchio", 
          type: "sightseeing",
          icon: "🌉",
          image: "https://images.unsplash.com/photo-1638696903899-67c8a7544316?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Famous bridge with jewelry shops",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Brunelleschi",
        address: "Piazza Sant'Elisabetta, 3, 50122 Firenze FI",
        wifi: "BrunelleschiGuest",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 8: TUSCANY COUNTRYSIDE 
    {
      date: "2025-06-12",
      dayNumber: 8,
      city: "Tuscany",
      title: "Tuscany Countryside",
      type: "rural",
      bgImage: "https://images.unsplash.com/photo-1566747738096-fbbfab0cc6b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-green-600 to-green-400",
      weather: { temp: "25°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "8-1",
          time: "09:00", 
          activity: "Drive to Chianti region", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Scenic route through vineyards",
          completed: false
        },
        { 
          id: "8-2",
          time: "11:00", 
          activity: "Wine tasting at Castello di Ama", 
          type: "experience",
          icon: "🍷",
          image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Historic winery and contemporary art",
          completed: false
        },
        { 
          id: "8-3",
          time: "13:30", 
          activity: "Lunch in Greve in Chianti", 
          type: "meal",
          icon: "🍖",
          image: "https://images.unsplash.com/photo-1538128844159-f08f41bafb4a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Traditional Tuscan food",
          completed: false
        },
        { 
          id: "8-4",
          time: "16:00", 
          activity: "Visit San Gimignano", 
          type: "sightseeing",
          icon: "🏙️",
          image: "https://images.unsplash.com/photo-1545081081-6e31dc7e610b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Medieval hill town with towers",
          completed: false
        },
        { 
          id: "8-5",
          time: "19:00", 
          activity: "Return to Florence", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1506293105742-747036977347?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Brunelleschi",
        address: "Piazza Sant'Elisabetta, 3, 50122 Firenze FI",
        wifi: "BrunelleschiGuest",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 9: TRAVEL TO ROME
    {
      date: "2025-06-13",
      dayNumber: 9,
      city: "Rome",
      title: "Travel to Rome",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-red-600 to-amber-500",
      activities: [
        { 
          id: "9-1",
          time: "08:30", 
          activity: "Check out from Florence hotel", 
          type: "logistics",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "9-2",
          time: "09:00", 
          activity: "Drive Florence to Rome", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1527189919029-aeb3d997547d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "280 km (approximately 3.5 hours)",
          route: "Via A1/E35",
          completed: false
        },
        { 
          id: "9-3",
          time: "13:00", 
          activity: "Check into Rome hotel", 
          type: "accommodation",
          icon: "🏨",
          image: "https://images.unsplash.com/photo-1560234077-bdcff7e4151c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "9-4",
          time: "15:00", 
          activity: "First glimpse of Colosseum", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1612099197070-2421a9b63a84?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          tip: "Evening light is best for photos",
          completed: false
        },
        { 
          id: "9-5",
          time: "19:00", 
          activity: "Dinner in Trastevere", 
          type: "meal",
          icon: "🍕",
          image: "https://images.unsplash.com/photo-1572913017567-02f0b618a8a1?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Charming neighborhood with restaurants",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Forum Roma",
        address: "Via Tor de' Conti, 25-30, 00184 Roma RM",
        checkin: "14:00",
        wifi: "ForumGuest",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      warnings: [
        { 
          type: "critical", 
          message: "ZTL ZONES ALL OVER ROME",
          fine: "€120+",
          image: "https://images.unsplash.com/photo-1575548393466-803d449b92ef?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ]
    },
    
    // DAY 10: ANCIENT ROME
    {
      date: "2025-06-14",
      dayNumber: 10,
      city: "Rome",
      title: "Ancient Rome",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1555992828-60c9bac0fa6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-yellow-500 to-yellow-700",
      weather: { temp: "28°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "10-1",
          time: "09:00", 
          activity: "Colosseum & Forum Tour", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1602097944182-c43423a8056d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Guided tour booked",
          duration: "3 hours",
          completed: false
        },
        { 
          id: "10-2",
          time: "13:00", 
          activity: "Lunch near Pantheon", 
          type: "meal",
          icon: "🍝",
          image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "10-3",
          time: "15:00", 
          activity: "Visit Pantheon", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1565437996152-8f19e8579c67?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Best preserved ancient Roman building",
          completed: false
        },
        { 
          id: "10-4",
          time: "17:00", 
          activity: "Trevi Fountain", 
          type: "sightseeing",
          icon: "⛲",
          image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          tip: "Throw a coin to ensure return to Rome",
          completed: false
        },
        { 
          id: "10-5",
          time: "18:30", 
          activity: "Spanish Steps", 
          type: "sightseeing",
          icon: "🪜",
          image: "https://images.unsplash.com/photo-1619696111623-7a73a0cd9afd?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Forum Roma",
        address: "Via Tor de' Conti, 25-30, 00184 Roma RM",
        wifi: "ForumGuest",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 11: VATICAN CITY
    {
      date: "2025-06-15",
      dayNumber: 11,
      city: "Rome",
      title: "Vatican City",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1634185489351-315a67a2a909?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-500 to-indigo-600",
      weather: { temp: "27°C", icon: "☀️", condition: "Sunny" },
      activities: [
        { 
          id: "11-1",
          time: "08:00", 
          activity: "Vatican Museums", 
          type: "museum",
          icon: "🖼️",
          image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Early access booked",
          tip: "Arrive 30 minutes before time slot",
          completed: false
        },
        { 
          id: "11-2",
          time: "10:30", 
          activity: "Sistine Chapel", 
          type: "art",
          icon: "🎨",
          image: "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Michelangelo's masterpiece",
          completed: false
        },
        { 
          id: "11-3",
          time: "12:00", 
          activity: "St. Peter's Basilica", 
          type: "sightseeing",
          icon: "⛪",
          image: "https://images.unsplash.com/photo-1561105895-ab4ff8c1b038?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "World's largest church",
          completed: false
        },
        { 
          id: "11-4",
          time: "15:00", 
          activity: "Castel Sant'Angelo", 
          type: "sightseeing",
          icon: "🏰",
          image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Former papal fortress",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Forum Roma",
        address: "Via Tor de' Conti, 25-30, 00184 Roma RM",
        wifi: "ForumGuest",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 12: TRAVEL TO LAKE COMO
    {
      date: "2025-06-16",
      dayNumber: 12,
      city: "Lake Como",
      title: "Travel to Lake Como",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1570868836776-753bacb4b7c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-500 to-emerald-500",
      activities: [
        { 
          id: "12-1",
          time: "08:00", 
          activity: "Check out from Rome hotel", 
          type: "logistics",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "12-2",
          time: "08:30", 
          activity: "Drive Rome to Lake Como", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "600 km (approximately 6-7 hours)",
          tip: "Break journey in Bologna or Parma",
          completed: false
        },
        { 
          id: "12-3",
          time: "12:30", 
          activity: "Lunch stop in Parma", 
          type: "meal",
          icon: "🧀",
          image: "https://images.unsplash.com/photo-1603728322607-a7b0d76d2270?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Try Parmigiano and prosciutto",
          completed: false
        },
        { 
          id: "12-4",
          time: "16:30", 
          activity: "Arrive at Lake Como", 
          type: "arrival",
          icon: "🏞️",
          image: "https://images.unsplash.com/photo-1560158435-2fa5efd0f7a9?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "12-5",
          time: "18:00", 
          activity: "Evening walk along lake", 
          type: "leisure",
          icon: "🚶",
          image: "https://images.unsplash.com/photo-1605937314293-198c2c145fb4?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Bellagio",
        address: "Piazza Mazzini, 32, 22021 Bellagio CO",
        checkin: "15:00",
        wifi: "BellagioGuest",
        image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 13: LAKE COMO
    {
      date: "2025-06-17",
      dayNumber: 13,
      city: "Lake Como",
      title: "Lake Como Exploration",
      type: "lake",
      bgImage: "https://images.unsplash.com/photo-1583392522931-d9d01a47855d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-400 to-green-400",
      weather: { temp: "24°C", icon: "⛅", condition: "Partly Cloudy" },
      activities: [
        { 
          id: "13-1",
          time: "09:30", 
          activity: "Ferry to Varenna", 
          type: "travel",
          icon: "⛴️",
          image: "https://images.unsplash.com/photo-1542532198692-4433673850c5?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Charming fishing village",
          completed: false
        },
        { 
          id: "13-2",
          time: "11:00", 
          activity: "Villa Monastero", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1476239976176-3926022cbd91?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Botanical gardens and museum",
          completed: false
        },
        { 
          id: "13-3",
          time: "14:00", 
          activity: "Lunch in Varenna", 
          type: "meal",
          icon: "🍽️",
          image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Lakeside dining",
          completed: false
        },
        { 
          id: "13-4",
          time: "16:00", 
          activity: "Ferry to Menaggio", 
          type: "travel",
          icon: "⛴️",
          image: "https://images.unsplash.com/photo-1580399550893-1352e2e1e939?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "13-5",
          time: "18:00", 
          activity: "Return to Bellagio", 
          type: "travel",
          icon: "⛴️",
          image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Bellagio",
        address: "Piazza Mazzini, 32, 22021 Bellagio CO",
        wifi: "BellagioGuest",
        image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 14: TRAVEL TO STUTTGART
    {
      date: "2025-06-18",
      dayNumber: 14,
      city: "Stuttgart",
      title: "Travel to Stuttgart",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1617865544128-50daa304f14d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-gray-600 to-gray-400",
      activities: [
        { 
          id: "14-1",
          time: "08:00", 
          activity: "Check out from Lake Como", 
          type: "logistics",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "14-2",
          time: "08:30", 
          activity: "Drive Lake Como to Stuttgart", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "400 km (approximately 5 hours)",
          route: "Via Switzerland (St. Gotthard Tunnel)",
          completed: false
        },
        { 
          id: "14-3",
          time: "12:30", 
          activity: "Lunch stop in Lucerne", 
          type: "meal",
          icon: "🍽️",
          image: "https://images.unsplash.com/photo-1541410053559-3a921c4d896c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Brief stop in beautiful Swiss city",
          completed: false
        },
        { 
          id: "14-4",
          time: "17:00", 
          activity: "Arrive in Stuttgart", 
          type: "arrival",
          icon: "🏙️",
          image: "https://images.unsplash.com/photo-1617862835337-28db2eff05c2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "14-5",
          time: "19:00", 
          activity: "Dinner near hotel", 
          type: "meal",
          icon: "🍖",
          image: "https://images.unsplash.com/photo-1544382267-9e39c10acf7e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Traditional German cuisine",
          completed: false
        },
        { 
          id: "14-6",
          time: "21:00", 
          activity: "Rest for audition", 
          type: "rest",
          icon: "😴",
          image: "https://images.unsplash.com/photo-1486591267513-8283070135ca?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Early night before busy days",
          completed: false
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart",
        checkin: "15:00",
        wifi: "AdinaGuest",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
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
          image: "https://images.unsplash.com/photo-1495214783466-803d449b92ef?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
          image: "https://images.unsplash.com/photo-1525857369687-0daaa24a8447?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
          image: "https://images.unsplash.com/photo-1481833769687-0509d3217039?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
    
    // DAY 17: POST-AUDITION & TRAVEL TO MUNICH
    {
      date: "2025-06-21",
      dayNumber: 17,
      city: "Munich",
      title: "Post-Audition & Travel to Munich",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-500 to-blue-700",
      activities: [
        { 
          id: "17-1",
          time: "09:00", 
          activity: "Check out from Stuttgart", 
          type: "logistics",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "17-2",
          time: "10:00", 
          activity: "Drive Stuttgart to Munich", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "220 km (approximately 2.5 hours)",
          completed: false
        },
        { 
          id: "17-3",
          time: "13:00", 
          activity: "Check into Munich hotel", 
          type: "accommodation",
          icon: "🏨",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "17-4",
          time: "15:00", 
          activity: "Marienplatz", 
          type: "sightseeing",
          icon: "🏛️",
          image: "https://images.unsplash.com/photo-1595867905947-8051afb2d962?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Main square with Glockenspiel",
          completed: false
        },
        { 
          id: "17-5",
          time: "18:00", 
          activity: "Dinner at Hofbräuhaus", 
          type: "meal",
          icon: "🍺",
          image: "https://images.unsplash.com/photo-1598232591956-150c706ccc1f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Famous beer hall",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Torbräu",
        address: "Tal 41, 80331 München",
        checkin: "15:00",
        wifi: "TorbrauGuest",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 18: MUNICH EXPLORATION
    {
      date: "2025-06-22",
      dayNumber: 18,
      city: "Munich",
      title: "Munich Exploration",
      type: "city",
      bgImage: "https://images.unsplash.com/photo-1599982890963-3aabd60064d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-600 to-indigo-500",
      weather: { temp: "23°C", icon: "⛅", condition: "Partly Cloudy" },
      activities: [
        { 
          id: "18-1",
          time: "09:00", 
          activity: "Nymphenburg Palace", 
          type: "sightseeing",
          icon: "🏰",
          image: "https://images.unsplash.com/photo-1603395764335-ba840fb878e8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Summer residence of Bavarian rulers",
          completed: false
        },
        { 
          id: "18-2",
          time: "12:30", 
          activity: "Viktualienmarkt lunch", 
          type: "meal",
          icon: "🥨",
          image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Gourmet food market",
          completed: false
        },
        { 
          id: "18-3",
          time: "14:00", 
          activity: "English Garden", 
          type: "leisure",
          icon: "🌳",
          image: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Larger than Central Park",
          completed: false
        },
        { 
          id: "18-4",
          time: "16:00", 
          activity: "BMW Museum", 
          type: "museum",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1550804630-25483c0576af?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Torbräu",
        address: "Tal 41, 80331 München",
        wifi: "TorbrauGuest",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 19: DACHAU & SALZBURG DAY TRIP
    {
      date: "2025-06-23",
      dayNumber: 19,
      city: "Munich/Salzburg",
      title: "Dachau & Salzburg Day Trip",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1575297306954-0be1a4d3749f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-green-600 to-green-700",
      weather: { temp: "22°C", icon: "⛅", condition: "Partly Cloudy" },
      activities: [
        { 
          id: "19-1",
          time: "08:30", 
          activity: "Drive to Dachau", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "25 km (approximately 30 minutes)",
          completed: false
        },
        { 
          id: "19-2",
          time: "09:30", 
          activity: "Dachau Memorial Site", 
          type: "memorial",
          icon: "🕯️",
          image: "https://images.unsplash.com/photo-1606593296595-1f21ed1d4a8e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Former concentration camp",
          completed: false
        },
        { 
          id: "19-3",
          time: "12:00", 
          activity: "Drive to Salzburg", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "145 km (approximately 1.5 hours)",
          completed: false
        },
        { 
          id: "19-4",
          time: "14:00", 
          activity: "Salzburg Old Town", 
          type: "sightseeing",
          icon: "🏰",
          image: "https://images.unsplash.com/photo-1575299684629-087ff64409d1?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Mozart's birthplace",
          completed: false
        },
        { 
          id: "19-5",
          time: "16:00", 
          activity: "Hohensalzburg Fortress", 
          type: "sightseeing",
          icon: "🏯",
          image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "19-6",
          time: "18:00", 
          activity: "Return to Munich", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        }
      ],
      accommodation: {
        name: "Hotel Torbräu",
        address: "Tal 41, 80331 München",
        wifi: "TorbrauGuest",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 20: TRAVEL TO MILAN
    {
      date: "2025-06-24",
      dayNumber: 20,
      city: "Milan",
      title: "Return to Milan",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1512470876302-972fce5c7943?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-red-500 to-orange-500",
      activities: [
        { 
          id: "20-1",
          time: "08:00", 
          activity: "Check out from Munich", 
          type: "logistics",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "20-2",
          time: "09:00", 
          activity: "Drive Munich to Milan", 
          type: "travel",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          distance: "500 km (approximately 6 hours)",
          route: "Via Innsbruck and St. Moritz",
          completed: false
        },
        { 
          id: "20-3",
          time: "12:30", 
          activity: "Lunch stop in St. Moritz", 
          type: "meal",
          icon: "🍽️",
          image: "https://images.unsplash.com/photo-1544698310-74ea9b1d19a0?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Scenic Swiss Alps town",
          completed: false
        },
        { 
          id: "20-4",
          time: "17:00", 
          activity: "Check into Milan hotel", 
          type: "accommodation",
          icon: "🏨",
          image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Near Malpensa Airport",
          completed: false
        },
        { 
          id: "20-5",
          time: "19:00", 
          activity: "Final Italian dinner", 
          type: "meal",
          icon: "🍝",
          image: "https://images.unsplash.com/photo-1628682183020-fee07923058b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Farewell meal",
          completed: false
        }
      ],
      accommodation: {
        name: "Malpensa Airport Hotel",
        address: "Via Gallarate 225, 20151 Milano",
        checkin: "15:00",
        wifi: "MalpensaGuest",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    },
    
    // DAY 21: RETURN FLIGHT TO LOS ANGELES
    {
      date: "2025-06-25",
      dayNumber: 21,
      city: "Milan to Los Angeles",
      title: "Return Flight to LA",
      type: "travel",
      bgImage: "https://images.unsplash.com/photo-1523292864699-1261bfb2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-sky-500 to-blue-600",
      activities: [
        { 
          id: "21-1",
          time: "07:00", 
          activity: "Check out from hotel", 
          type: "logistics",
          icon: "🧳",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "21-2",
          time: "08:00", 
          activity: "Return rental car", 
          type: "logistics",
          icon: "🚗",
          image: "https://images.unsplash.com/photo-1592859600972-1b0834d83747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          note: "Rental return at Malpensa Airport",
          completed: false
        },
        { 
          id: "21-3",
          time: "09:00", 
          activity: "Check-in at MXP Airport", 
          type: "travel",
          icon: "✈️",
          image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          completed: false
        },
        { 
          id: "21-4",
          time: "12:00", 
          activity: "Flight Milan → Los Angeles", 
          type: "travel",
          icon: "✈️",
          image: "https://images.unsplash.com/photo-1532299033752-9376aa1fed37?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          flightInfo: "Flight with 1 stop • Arrive 18:30 same day",
          completed: false
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

// Full itinerary now complete with all 22 days
