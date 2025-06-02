
import { TripDay } from "@/types/trip";

export const lakeComoDays: TripDay[] = [
  {
    id: "day-10",
    dayNumber: 10,
    date: "2025-06-14",
    city: "Lake Como/Vezio",
    country: "Italy",
    description: "Arrival at Lake Como - Settle into our beautiful lakeside accommodation",
    title: "Welcome to Lake Como",
    encouragement: "You've made it to one of the world's most beautiful lakes! Take time to soak in the stunning scenery.",
    bgImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=2000&q=80",
    weather: {
      temp: "22°C",
      icon: "☀️",
      condition: "Sunny"
    },
    activities: [
      {
        id: "como-arrival",
        time: "15:00",
        activity: "Check into Casa Chicca",
        type: "accommodation",
        icon: "🏠",
        completed: false,
        location: "Vezio",
        note: "Host: Walter (Co-host: Fabio), Phone: +39 335 129 7553"
      },
      {
        id: "como-explore",
        time: "16:30",
        activity: "First exploration of Vezio village",
        type: "sightseeing",
        icon: "🚶‍♂️",
        completed: false,
        location: "Vezio"
      },
      {
        id: "como-dinner",
        time: "19:00",
        activity: "Welcome dinner with lake views",
        type: "dining",
        icon: "🍽️",
        completed: false,
        location: "Local restaurant"
      }
    ],
    accommodation: {
      name: "Casa Chicca",
      address: "Via del Castellano, 9, Vezio, Lombardia 23828",
      contactPhone: "+39 335 129 7553",
      checkin: "3:00 PM",
      checkout: "11:00 AM",
      confirmationNumber: "HM4K483EX2",
      totalPrice: "€280 for 2 nights"
    }
  },
  {
    id: "day-11",
    dayNumber: 11,
    date: "2025-06-15",
    city: "Lake Como",
    country: "Italy",
    description: "Full day exploring the magical towns and villas around Lake Como",
    title: "Lake Como Grand Tour",
    encouragement: "Today you'll see why Lake Como has captivated visitors for centuries. From charming villages to magnificent villas!",
    bgImage: "https://images.unsplash.com/photo-1530841344095-da1d52ad4def?auto=format&fit=crop&w=2000&q=80",
    weather: {
      temp: "24°C",
      icon: "⛅",
      condition: "Partly Cloudy"
    },
    activities: [
      {
        id: "varenna-walk",
        time: "09:00",
        activity: "Explore Varenna village & Villa Monastero",
        type: "sightseeing",
        icon: "🏛️",
        completed: false,
        location: "Varenna",
        note: "Beautiful lakeside village with historic villa and gardens"
      },
      {
        id: "ferry-bellagio",
        time: "11:30",
        activity: "Ferry to Bellagio",
        type: "transportation",
        icon: "⛴️",
        completed: false,
        location: "Lake Como",
        note: "Scenic ferry ride across the lake"
      },
      {
        id: "bellagio-explore",
        time: "12:00",
        activity: "Lunch and exploration in Bellagio",
        type: "dining",
        icon: "🍝",
        completed: false,
        location: "Bellagio",
        note: "The 'Pearl of Lake Como'"
      },
      {
        id: "villa-balbianello",
        time: "14:30",
        activity: "Visit Villa del Balbianello",
        type: "sightseeing",
        icon: "🏰",
        completed: false,
        location: "Lenno",
        note: "Famous villa featured in Star Wars and James Bond films"
      },
      {
        id: "como-town",
        time: "16:30",
        activity: "Como town & cathedral visit",
        type: "sightseeing",
        icon: "⛪",
        completed: false,
        location: "Como",
        note: "Historic cathedral and charming old town"
      },
      {
        id: "brunate-cable",
        time: "18:00",
        activity: "Cable car to Brunate for sunset views",
        type: "sightseeing",
        icon: "🚠",
        completed: false,
        location: "Brunate",
        note: "Panoramic views over Lake Como"
      }
    ]
  },
  {
    id: "day-12",
    dayNumber: 12,
    date: "2025-06-16",
    city: "Baden",
    country: "Switzerland", 
    description: "Travel to Baden, Switzerland and settle into Limmathof Baden",
    title: "Journey to Switzerland",
    encouragement: "Time to experience Swiss hospitality and the thermal baths of Baden!",
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
    weather: {
      temp: "20°C",
      icon: "🌤️",
      condition: "Partly Sunny"
    },
    activities: [
      {
        id: "como-checkout",
        time: "11:00",
        activity: "Check out from Casa Chicca",
        type: "accommodation",
        icon: "🏠",
        completed: false,
        location: "Vezio"
      },
      {
        id: "travel-baden",
        time: "12:00",
        activity: "Travel from Lake Como to Baden, Switzerland",
        type: "transportation",
        icon: "🚗",
        completed: false,
        location: "En route",
        note: "Approximately 3-4 hour drive through beautiful Alpine scenery"
      },
      {
        id: "baden-checkin",
        time: "16:00",
        activity: "Check into Limmathof Baden",
        type: "accommodation",
        icon: "🏨",
        completed: false,
        location: "Baden",
        note: "Historic thermal spa hotel"
      },
      {
        id: "baden-explore",
        time: "17:30",
        activity: "First exploration of Baden old town",
        type: "sightseeing",
        icon: "🚶‍♂️",
        completed: false,
        location: "Baden"
      },
      {
        id: "thermal-spa",
        time: "19:00",
        activity: "Relax in the thermal baths",
        type: "wellness",
        icon: "♨️",
        completed: false,
        location: "Limmathof Baden",
        note: "Famous thermal waters for relaxation"
      }
    ],
    accommodation: {
      name: "Limmathof Baden",
      address: "5400, Baden, Aargau, Switzerland",
      contactPhone: "0041 562001717",
      checkin: "4:00 PM",
      checkout: "11:00 AM",
      confirmationNumber: "202505244O4178O0",
      totalPrice: "CHF 530 (2 nights)",
      image: "/lovable-uploads/82f71348-474b-4b57-a47c-3faa38f26efd.png"
    }
  },
  {
    id: "day-13", 
    dayNumber: 13,
    date: "2025-06-17",
    city: "Baden",
    country: "Switzerland",
    description: "Full day enjoying Baden's thermal spas and exploring the historic town",
    title: "Baden Thermal Experience",
    encouragement: "Enjoy the healing waters and Swiss charm of this beautiful spa town!",
    bgImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=2000&q=80",
    weather: {
      temp: "22°C",
      icon: "☀️",
      condition: "Sunny"
    },
    activities: [
      {
        id: "morning-spa",
        time: "09:00",
        activity: "Morning thermal spa session",
        type: "wellness",
        icon: "♨️",
        completed: false,
        location: "Limmathof Baden",
        note: "Start the day with relaxing thermal waters"
      },
      {
        id: "baden-castle",
        time: "11:00",
        activity: "Visit Stein Castle ruins",
        type: "sightseeing",
        icon: "🏰",
        completed: false,
        location: "Baden",
        note: "Historic castle overlooking the town"
      },
      {
        id: "swiss-lunch",
        time: "12:30",
        activity: "Traditional Swiss lunch",
        type: "dining",
        icon: "🧀",
        completed: false,
        location: "Baden old town"
      },
      {
        id: "limmat-walk",
        time: "14:00",
        activity: "Walk along the Limmat River",
        type: "sightseeing",
        icon: "🌊",
        completed: false,
        location: "Baden",
        note: "Beautiful riverside promenade"
      },
      {
        id: "shopping-baden",
        time: "15:30",
        activity: "Browse Baden's charming shops",
        type: "shopping",
        icon: "🛍️",
        completed: false,
        location: "Baden old town"
      },
      {
        id: "evening-spa",
        time: "18:00",
        activity: "Evening relaxation at thermal spa",
        type: "wellness",
        icon: "♨️",
        completed: false,
        location: "Limmathof Baden"
      }
    ]
  },
  {
    id: "day-14",
    dayNumber: 14,
    date: "2025-06-18",
    city: "Baden",
    country: "Switzerland",
    description: "Final morning in Baden before departing",
    title: "Farewell to Baden",
    encouragement: "A peaceful morning to reflect on your Swiss experience before continuing your journey!",
    bgImage: "https://images.unsplash.com/photo-1551524164-6cf62ac27db4?auto=format&fit=crop&w=2000&q=80",
    weather: {
      temp: "21°C",
      icon: "🌤️",
      condition: "Partly Cloudy"
    },
    activities: [
      {
        id: "final-spa",
        time: "09:00",
        activity: "Final thermal spa session",
        type: "wellness",
        icon: "♨️",
        completed: false,
        location: "Limmathof Baden",
        note: "Last chance to enjoy the healing waters"
      },
      {
        id: "baden-checkout",
        time: "11:00",
        activity: "Check out from Limmathof Baden",
        type: "accommodation",
        icon: "🏨",
        completed: false,
        location: "Baden"
      },
      {
        id: "departure-prep",
        time: "11:30",
        activity: "Prepare for onward journey",
        type: "transportation",
        icon: "🧳",
        completed: false,
        location: "Baden"
      }
    ],
    accommodation: {
      name: "Limmathof Baden",
      address: "5400, Baden, Aargau, Switzerland",
      contactPhone: "0041 562001717",
      checkin: "4:00 PM",
      checkout: "11:00 AM",
      confirmationNumber: "202505244O4178O0",
      totalPrice: "CHF 530 (2 nights)"
    }
  }
];
