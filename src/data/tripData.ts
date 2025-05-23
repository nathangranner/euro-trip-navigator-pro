
export interface PointOfInterest {
  name: string;
  description: string;
  category: string;
  image?: string;
  address?: string;
  website?: string;
  phone?: string;
  hours?: string;
  price?: string;
  mustSee?: boolean;
}

export interface Activity {
  id: string;
  time: string;
  activity: string;
  type: string;
  icon: string;
  completed: boolean;
  image?: string;
  location?: string;
  note?: string;
  duration?: string;
  booked?: boolean;
  mustTry?: boolean;
  tip?: string;
  culturalNote?: string;
  contact?: string;
  contactInfo?: string;
  carDetails?: string;
  warning?: string;
  sentiment?: string;
  distance?: string;
  checklist?: string[];
  suggestions?: string[];
  sites?: string[];
  highlights?: string[];
  areas?: string[];
  playlist?: string;
  flightInfo?: string;
  importance?: string;
}

export interface Accommodation {
  name: string;
  address?: string;
  image?: string;
  wifi?: string;
  checkin?: string;
  checkout?: string;
  contactPhone?: string;
  totalPrice?: string;
  confirmationNumber?: string;
  confirmationCode?: string;
  parking?: string;
}

export interface Weather {
  temp: string;
  icon: string;
  condition: string;
}

export interface Warning {
  type: 'critical' | 'warning' | 'safe';
  message: string;
  image?: string;
  fine?: string;
  times?: string;
}

export interface ParkingTip {
  name: string;
  price: string;
}

export interface Route {
  start: string;
  end: string;
  distance: string;
  duration: string;
  stops?: string[];
}

export interface TripDay {
  id: string;
  dayNumber: number;
  date: string;
  city: string;
  country: string;
  description: string;
  title?: string;
  encouragement?: string;
  bgImage?: string;
  weather?: Weather;
  specialEvent?: boolean;
  warnings?: Warning[];
  parkingTips?: ParkingTip[];
  route?: Route;
  activities?: Activity[];
  accommodation?: Accommodation;
  accommodationName?: string;
  accommodationAddress?: string;
  accommodationCheckIn?: string;
  accommodationCheckOut?: string;
  accommodationConfirmation?: string;
  accommodationNotes?: string;
  accommodationContact?: string;
  accommodationWifi?: string;
  accommodationPrice?: number;
  accommodationCurrency?: string;
  accommodationEmail?: string;
  pointsOfInterest?: PointOfInterest[];
}

export interface Trip {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
}

// Create trip days based on the correct dates from June 5-26, 2025
export const europeTrip: Trip = {
  name: "Europe Trip 2025",
  description: "A 21-day journey through Italy, Switzerland, and Germany",
  startDate: "2025-06-05",
  endDate: "2025-06-26",
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      date: "2025-06-05",
      city: "Santa Maria to Los Angeles",
      country: "USA",
      description: "Departure day - Start of the trip",
      title: "Begin the Journey",
      accommodationName: "Flight",
      accommodationNotes: "Overnight flight to Europe",
      activities: []
    },
    {
      id: "day-2",
      dayNumber: 2,
      date: "2025-06-06",
      city: "Milan",
      country: "Italy",
      description: "Arrival in Milan, Italy",
      title: "Hello Milano",
      accommodationName: "Milano City Center Apartment",
      accommodationAddress: "Via Paolo Sarpi 18, Milan",
      accommodationCheckIn: "2025-06-06",
      accommodationCheckOut: "2025-06-08",
      accommodationConfirmation: "TBD",
      accommodationWifi: "MilanoGuest2025",
      bgImage: "https://images.unsplash.com/photo-1574203419920-f74e7d79e87c?w=800&auto=format&fit=crop",
      activities: [],
      pointsOfInterest: [
        {
          name: "Duomo di Milano",
          description: "Gothic cathedral in the heart of Milan",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1574203419920-f74e7d79e87c?w=800&auto=format&fit=crop",
          mustSee: true
        },
        {
          name: "Galleria Vittorio Emanuele II",
          description: "Historic shopping arcade near the Duomo",
          category: "Shopping",
          image: "https://images.unsplash.com/photo-1585132758447-5cf5db365524?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-3",
      dayNumber: 3,
      date: "2025-06-07",
      city: "Milan",
      country: "Italy",
      description: "Exploring Milan",
      title: "Discover Milan",
      accommodationName: "Milano City Center Apartment",
      accommodationAddress: "Via Paolo Sarpi 18, Milan",
      activities: [],
      pointsOfInterest: [
        {
          name: "La Scala Opera House",
          description: "World-renowned opera house in Milan",
          category: "Culture",
          image: "https://images.unsplash.com/photo-1581873372796-635b67ca2008?w=800&auto=format&fit=crop"
        },
        {
          name: "Sforza Castle",
          description: "15th-century citadel that now houses museums and art collections",
          category: "History",
          image: "https://images.unsplash.com/photo-1634219418498-9d929327ea8f?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-4",
      dayNumber: 4,
      date: "2025-06-08",
      city: "Florence",
      country: "Italy",
      description: "Travel to Florence",
      title: "Welcome to Firenze",
      accommodationName: "Graziosa dimora +garage",
      accommodationAddress: "Via delle Porte Nuove, 34, Florence, Toscana 50144",
      accommodationCheckIn: "2025-06-08",
      accommodationCheckOut: "2025-06-12",
      accommodationConfirmation: "HMXCEBRDD8",
      activities: [],
      pointsOfInterest: [
        {
          name: "Ponte Vecchio",
          description: "Medieval stone bridge spanning the Arno River",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop",
          mustSee: true
        }
      ]
    },
    {
      id: "day-5",
      dayNumber: 5,
      date: "2025-06-09",
      city: "Florence",
      country: "Italy",
      description: "Exploring Florence",
      title: "Art Day in Florence",
      accommodationName: "Graziosa dimora +garage",
      activities: [],
      pointsOfInterest: [
        {
          name: "Uffizi Gallery",
          description: "Art museum with a vast collection of Renaissance masterpieces",
          category: "Museum",
          image: "https://images.unsplash.com/photo-1579198060175-32362e3f91f3?w=800&auto=format&fit=crop",
          mustSee: true
        },
        {
          name: "Piazza della Signoria",
          description: "Historic square with outdoor sculpture gallery",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1626155934850-066a8a471f58?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-6",
      dayNumber: 6,
      date: "2025-06-10",
      city: "Florence",
      country: "Italy",
      description: "Day trip to Tuscany countryside",
      title: "Tuscany Exploration",
      accommodationName: "Graziosa dimora +garage",
      activities: [],
      pointsOfInterest: [
        {
          name: "Siena",
          description: "Medieval hill town in Tuscany known for its fan-shaped central square",
          category: "Day Trip",
          image: "https://images.unsplash.com/photo-1557110377-ae38e07e6ad7?w=800&auto=format&fit=crop"
        },
        {
          name: "San Gimignano",
          description: "Small walled medieval town known for its tower houses",
          category: "Day Trip",
          image: "https://images.unsplash.com/photo-1598867559312-754c7b0b3d21?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-7",
      dayNumber: 7,
      date: "2025-06-11",
      city: "Florence",
      country: "Italy",
      description: "Final day in Florence",
      title: "Florence Finale",
      accommodationName: "Graziosa dimora +garage",
      activities: [],
      pointsOfInterest: [
        {
          name: "Galleria dell'Accademia",
          description: "Home to Michelangelo's David and other Renaissance masterpieces",
          category: "Museum",
          image: "https://images.unsplash.com/photo-1628370091655-8200e49d0a2f?w=800&auto=format&fit=crop",
          mustSee: true
        },
        {
          name: "Piazzale Michelangelo",
          description: "Square offering panoramic views of Florence",
          category: "Viewpoint",
          image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-8",
      dayNumber: 8,
      date: "2025-06-12",
      city: "Bologna",
      country: "Italy",
      description: "Travel to Bologna",
      title: "Bologna Adventure",
      accommodationName: "SWING HOUSE",
      accommodationAddress: "Via delle Lame 71/A, Bologna",
      accommodationCheckIn: "2025-06-12",
      accommodationCheckOut: "2025-06-14",
      accommodationConfirmation: "HMMDH5ZARB",
      accommodationNotes: "Free parking 100m away (book 24h in advance)",
      accommodationContact: "Cristina +39 344 066 1776",
      activities: [],
      pointsOfInterest: [
        {
          name: "Two Towers",
          description: "Iconic leaning towers in the center of Bologna",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1581604893136-031bd5bd1414?w=800&auto=format&fit=crop",
          mustSee: true
        },
        {
          name: "Quadrilatero",
          description: "Medieval market district with food stalls and restaurants",
          category: "Food",
          image: "https://images.unsplash.com/photo-1631881383186-fa0a1c0acbbd?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-9",
      dayNumber: 9,
      date: "2025-06-13",
      city: "Como",
      country: "Italy",
      description: "Travel to Lake Como",
      title: "Lake Como Getaway",
      accommodationName: "TBD",
      accommodationCheckIn: "2025-06-14",
      accommodationCheckOut: "2025-06-15",
      accommodationConfirmation: "TBD",
      activities: [],
      pointsOfInterest: [
        {
          name: "Lake Como",
          description: "Beautiful lake surrounded by mountains and luxury villas",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=800&auto=format&fit=crop",
          mustSee: true
        },
        {
          name: "Villa del Balbianello",
          description: "Elegant historic villa on the shore of Lake Como",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1658340498981-c051f3cef537?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-10",
      dayNumber: 10,
      date: "2025-06-14",
      city: "Lucerne",
      country: "Switzerland",
      description: "Travel to Lucerne, Switzerland",
      title: "Hello Switzerland",
      accommodationName: "TBD",
      accommodationCheckIn: "2025-06-15",
      accommodationCheckOut: "2025-06-17",
      accommodationConfirmation: "TBD",
      activities: [],
      pointsOfInterest: [
        {
          name: "Chapel Bridge",
          description: "Iconic wooden covered bridge in Lucerne",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1559886367-694dce0850cc?w=800&auto=format&fit=crop",
          mustSee: true
        }
      ]
    },
    {
      id: "day-11",
      dayNumber: 11,
      date: "2025-06-15",
      city: "Lucerne",
      country: "Switzerland",
      description: "Exploring Lucerne",
      accommodationName: "TBD",
      pointsOfInterest: [
        {
          name: "Lake Lucerne",
          description: "Scenic lake surrounded by mountains",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1542046272227-d247df21628a?w=800&auto=format&fit=crop"
        },
        {
          name: "Mount Pilatus",
          description: "Mountain offering panoramic views, accessible by cable car",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1613484619036-94596b7af073?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-12",
      dayNumber: 12,
      date: "2025-06-16",
      city: "Lucerne",
      country: "Switzerland",
      description: "Day trip to the Swiss Alps",
      accommodationName: "TBD",
      pointsOfInterest: [
        {
          name: "Mount Titlis",
          description: "Year-round snow and glacier experiences",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1575398242121-94896e7bf9c5?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-13",
      dayNumber: 13,
      date: "2025-06-17",
      city: "Stuttgart",
      country: "Germany",
      description: "Travel to Stuttgart, Germany",
      accommodationName: "Adina Apartment Hotel Stuttgart",
      accommodationAddress: "Kriegsbergstraße 24, 70174 Stuttgart",
      accommodationCheckIn: "2025-06-17",
      accommodationCheckOut: "2025-06-21",
      accommodationConfirmation: "CI5EKCQU",
      accommodationContact: "+49-711-4909290",
      accommodationPrice: 623.32,
      accommodationCurrency: "EUR",
      accommodationEmail: "stuttgart@adina.eu",
      pointsOfInterest: [
        {
          name: "Mercedes-Benz Museum",
          description: "Museum showcasing the history of Mercedes-Benz",
          category: "Museum",
          image: "https://images.unsplash.com/photo-1562426209-1488d598648d?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-14",
      dayNumber: 14,
      date: "2025-06-18",
      city: "Stuttgart",
      country: "Germany",
      description: "Exploring Stuttgart",
      accommodationName: "Adina Apartment Hotel Stuttgart",
      pointsOfInterest: [
        {
          name: "Porsche Museum",
          description: "Museum dedicated to Porsche sports cars",
          category: "Museum",
          image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&auto=format&fit=crop"
        },
        {
          name: "Schlossplatz",
          description: "Large square in the center of Stuttgart with the New Palace",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1564520017466-903bbd9a3d43?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-15",
      dayNumber: 15,
      date: "2025-06-19",
      city: "Stuttgart",
      country: "Germany",
      description: "Day trip from Stuttgart",
      accommodationName: "Adina Apartment Hotel Stuttgart",
      pointsOfInterest: [
        {
          name: "Hohenzollern Castle",
          description: "Ancestral seat of the Hohenzollern family",
          category: "Day Trip",
          image: "https://images.unsplash.com/photo-1605641532626-3962be3a9901?w=800&auto=format&fit=crop",
          mustSee: true
        }
      ]
    },
    {
      id: "day-16",
      dayNumber: 16,
      date: "2025-06-20",
      city: "Stuttgart",
      country: "Germany",
      description: "Stuttgart Opera Audition",
      accommodationName: "Adina Apartment Hotel Stuttgart",
      pointsOfInterest: [
        {
          name: "Stuttgart Opera",
          description: "Special event: Opera Audition",
          category: "Performance",
          image: "https://images.unsplash.com/photo-1522775559573-2f76d540932b?w=800&auto=format&fit=crop",
          mustSee: true
        }
      ]
    },
    {
      id: "day-17",
      dayNumber: 17,
      date: "2025-06-21",
      city: "Black Forest",
      country: "Germany",
      description: "Travel to Black Forest region",
      accommodationName: "TBD",
      accommodationCheckIn: "2025-06-21",
      accommodationCheckOut: "2025-06-23",
      accommodationConfirmation: "TBD",
      pointsOfInterest: [
        {
          name: "Triberg Waterfalls",
          description: "One of Germany's highest waterfalls",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1583856014103-5318690c1750?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-18",
      dayNumber: 18,
      date: "2025-06-22",
      city: "Black Forest",
      country: "Germany",
      description: "Exploring Black Forest",
      accommodationName: "TBD",
      pointsOfInterest: [
        {
          name: "Lake Titisee",
          description: "Popular lake in the heart of the Black Forest",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1564750608547-5f201a3544b9?w=800&auto=format&fit=crop"
        },
        {
          name: "Cuckoo Clock Workshops",
          description: "Traditional craftsmanship of the Black Forest region",
          category: "Culture",
          image: "https://images.unsplash.com/photo-1511357840105-748c95f0a7d7?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-19",
      dayNumber: 19,
      date: "2025-06-23",
      city: "Zurich",
      country: "Switzerland",
      description: "Travel to Zurich",
      accommodationName: "TBD",
      accommodationCheckIn: "2025-06-23",
      accommodationCheckOut: "2025-06-24",
      accommodationConfirmation: "TBD",
      pointsOfInterest: [
        {
          name: "Lake Zurich",
          description: "Beautiful lake in the heart of Zurich",
          category: "Nature",
          image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&auto=format&fit=crop"
        },
        {
          name: "Old Town (Altstadt)",
          description: "Historic center of Zurich with medieval houses",
          category: "Sightseeing",
          image: "https://images.unsplash.com/photo-1589969181793-05524a3196d4?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "day-20",
      dayNumber: 20,
      date: "2025-06-24",
      city: "Milan",
      country: "Italy",
      description: "Return to Milan",
      accommodationName: "TBD",
      accommodationCheckIn: "2025-06-24",
      accommodationCheckOut: "2025-06-25",
      accommodationConfirmation: "TBD",
      pointsOfInterest: [
        {
          name: "Last minute shopping",
          description: "Final shopping opportunities in Milan",
          category: "Shopping"
        }
      ]
    },
    {
      id: "day-21",
      dayNumber: 21,
      date: "2025-06-25",
      city: "Milan to Los Angeles",
      country: "Italy/USA",
      description: "Departure from Europe",
      accommodationName: "Flight",
      accommodationNotes: "Overnight flight to USA"
    },
    {
      id: "day-22",
      dayNumber: 22,
      date: "2025-06-26",
      city: "Los Angeles to Santa Maria",
      country: "USA",
      description: "Return home",
      pointsOfInterest: [
        {
          name: "Car Rental Return",
          description: "Return rental car at Santa Maria Airport",
          category: "Travel"
        }
      ]
    }
  ]
};

// Export the days array as tripData for backward compatibility
export const tripData = europeTrip.days;
