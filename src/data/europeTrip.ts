
import { Trip } from "@/types/trip";

export const europeTrip: Trip = {
  name: "Europe Trip 2025",
  description: "Nathan & Jamie Granner's European Adventure - A 21-day journey through Italy, Switzerland, and Germany",
  startDate: "2025-06-05",
  endDate: "2025-06-26",
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      date: "2025-06-05",
      city: "LAX to Frankfurt",
      country: "USA",
      description: "Departure day - Start of the European adventure",
      title: "Begin the Journey",
      activities: [
        {
          id: "flight-1",
          time: "6:40 PM",
          activity: "Depart LAX on UA8900 (operated by Lufthansa)",
          type: "travel",
          icon: "✈️",
          completed: false,
          flightInfo: "UA8900 - Duration: 11hr 15min",
          location: "Los Angeles International Airport"
        }
      ],
      accommodation: {
        name: "Overnight Flight",
        address: "In-flight accommodation"
      }
    },
    {
      id: "day-2",
      dayNumber: 2,
      date: "2025-06-06",
      city: "Milan",
      country: "Italy",
      description: "Arrival in Milan, Italy",
      title: "Hello Milano",
      activities: [
        {
          id: "arrival-1",
          time: "2:55 PM",
          activity: "Arrive Frankfurt",
          type: "travel",
          icon: "✈️",
          completed: false,
          location: "Frankfurt Airport"
        },
        {
          id: "flight-2",
          time: "5:25 PM",
          activity: "Depart Frankfurt for Milan on UA9090",
          type: "travel",
          icon: "✈️",
          completed: false,
          flightInfo: "UA9090 - Duration: 1hr 20min"
        },
        {
          id: "arrival-2",
          time: "6:45 PM",
          activity: "Arrive Milan MXP",
          type: "travel",
          icon: "✈️",
          completed: false,
          location: "Malpensa Airport"
        },
        {
          id: "car-pickup",
          time: "7:00 PM",
          activity: "Pick up rental car - Volkswagen T-cross",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Malpensa Airport",
          note: "Confirmation: 23010030US1, Budget Fastbreak: RapidRez ID #V6H02R"
        }
      ],
      accommodation: {
        name: "Apartment 4 beds + parking, Navigli - Bocconi",
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136",
        checkin: "June 6, after 3:00 PM",
        checkout: "June 9, 11:00 AM",
        confirmationNumber: "HMFMP3K4ZT",
        contactPhone: "+39 349 146 7840",
        parking: "Private parking in courtyard",
        wifi: "Self check-in with lockbox, Code: 5172"
      },
      warnings: [
        {
          type: "warning",
          message: "Milan ZTL (Restricted Traffic Zone) - Historic center restricted Mon-Fri 7:30-19:30, Sat 8:00-18:00",
          fine: "€87+ fine for violations"
        }
      ]
    },
    {
      id: "day-3",
      dayNumber: 3,
      date: "2025-06-07",
      city: "Milan",
      country: "Italy",
      description: "Full day exploring Milan",
      title: "Discover Milan",
      activities: [
        {
          id: "duomo-visit",
          time: "9:00 AM",
          activity: "Explore Duomo & Galleria Vittorio Emanuele II",
          type: "sightseeing",
          icon: "🏰",
          completed: false,
          location: "Duomo di Milano",
          mustTry: true
        },
        {
          id: "la-scala",
          time: "11:00 AM",
          activity: "Visit La Scala Opera House",
          type: "culture",
          icon: "🎭",
          completed: false,
          location: "Teatro alla Scala"
        },
        {
          id: "brera-district",
          time: "2:00 PM",
          activity: "Explore Brera district & Navigli canals",
          type: "sightseeing",
          icon: "🚶",
          completed: false,
          location: "Brera"
        },
        {
          id: "shopping",
          time: "4:00 PM",
          activity: "Shopping in Quadrilatero della Moda",
          type: "shopping",
          icon: "🛍️",
          completed: false,
          location: "Fashion Quadrilateral"
        },
        {
          id: "aperitivo",
          time: "6:00 PM",
          activity: "Aperitivo culture experience",
          type: "dining",
          icon: "🍸",
          completed: false,
          location: "Navigli area"
        }
      ],
      accommodation: {
        name: "Apartment 4 beds + parking, Navigli - Bocconi",
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136"
      }
    },
    {
      id: "day-4",
      dayNumber: 4,
      date: "2025-06-08",
      city: "Florence",
      country: "Italy",
      description: "Travel from Milan to Florence",
      title: "Journey to Firenze",
      activities: [
        {
          id: "checkout-milan",
          time: "11:00 AM",
          activity: "Check out of Milan accommodation",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "drive-florence",
          time: "11:30 AM",
          activity: "Drive to Florence (~3 hours)",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~300km",
          duration: "3 hours"
        },
        {
          id: "checkin-florence",
          time: "1:00 PM",
          activity: "Check-in Florence accommodation",
          type: "accommodation",
          icon: "🏨",
          completed: false
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage accanto al centro storico",
        address: "Via delle Porte Nuove, 34, Florence, Toscana 50144",
        checkin: "June 9, 1:00 PM",
        checkout: "June 12, 11:00 AM",
        confirmationNumber: "HMXCEBRDD8",
        wifi: "Energy limit 3KW, quiet hours 10PM-8AM"
      },
      warnings: [
        {
          type: "critical",
          message: "Florence ZTL - Entire historic center restricted Mon-Fri 7:30-19:30, Thur-Sat 7:30-2:00AM",
          fine: "€87+ fine",
          times: "Cameras at entrances"
        }
      ],
      parkingTips: [
        {
          name: "Garage Via Palazzuolo",
          price: "€18/day"
        },
        {
          name: "Parcheggio Parterre",
          price: "€20/day"
        }
      ]
    },
    {
      id: "day-5",
      dayNumber: 5,
      date: "2025-06-09",
      city: "Florence",
      country: "Italy",
      description: "First full day exploring Florence",
      title: "Renaissance Florence",
      activities: [
        {
          id: "uffizi",
          time: "9:00 AM",
          activity: "Uffizi Gallery visit",
          type: "museum",
          icon: "🎨",
          completed: false,
          location: "Uffizi Gallery",
          mustTry: true,
          booked: true
        },
        {
          id: "ponte-vecchio",
          time: "12:00 PM",
          activity: "Walk across Ponte Vecchio",
          type: "sightseeing",
          icon: "🌉",
          completed: false,
          location: "Ponte Vecchio"
        },
        {
          id: "lunch-pinos",
          time: "1:00 PM",
          activity: "Lunch at Pinos Panini",
          type: "dining",
          icon: "🥪",
          completed: false,
          location: "Pinos Panini",
          mustTry: true
        },
        {
          id: "palazzo-pitti",
          time: "3:00 PM",
          activity: "Palazzo Pitti visit",
          type: "museum",
          icon: "🏛️",
          completed: false,
          location: "Palazzo Pitti"
        },
        {
          id: "piazzale-michelangelo",
          time: "5:00 PM",
          activity: "Sunset at Piazzale Michelangelo",
          type: "sightseeing",
          icon: "🌅",
          completed: false,
          location: "Piazzale Michelangelo"
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage",
        address: "Via delle Porte Nuove, 34, Florence"
      }
    },
    {
      id: "day-6",
      dayNumber: 6,
      date: "2025-06-10",
      city: "Florence",
      country: "Italy",
      description: "Second day in Florence",
      title: "Art & Culture Day",
      activities: [
        {
          id: "duomo-complex",
          time: "9:00 AM",
          activity: "Duomo complex & climb dome",
          type: "sightseeing",
          icon: "⛪",
          completed: false,
          location: "Cathedral of Santa Maria del Fiore",
          mustTry: true
        },
        {
          id: "gusta-pizza",
          time: "12:30 PM",
          activity: "Lunch at Gusta Pizza (Santo Spirito)",
          type: "dining",
          icon: "🍕",
          completed: false,
          location: "Gusta Pizza",
          mustTry: true
        },
        {
          id: "mercato-san-lorenzo",
          time: "2:00 PM",
          activity: "Explore Mercato di San Lorenzo",
          type: "shopping",
          icon: "🛒",
          completed: false,
          location: "San Lorenzo Market"
        },
        {
          id: "santa-croce",
          time: "4:00 PM",
          activity: "Santa Croce area exploration",
          type: "sightseeing",
          icon: "⛪",
          completed: false,
          location: "Santa Croce"
        },
        {
          id: "all-antico-vinaio",
          time: "6:00 PM",
          activity: "All'antico Vinaio for aperitivo",
          type: "dining",
          icon: "🥙",
          completed: false,
          location: "All'antico Vinaio",
          mustTry: true
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage",
        address: "Via delle Porte Nuove, 34, Florence"
      }
    },
    {
      id: "day-7",
      dayNumber: 7,
      date: "2025-06-11",
      city: "Florence",
      country: "Italy",
      description: "Final day in Florence",
      title: "Florence Finale",
      activities: [
        {
          id: "il-coccolo",
          time: "9:00 AM",
          activity: "Breakfast at Il Coccolo",
          type: "dining",
          icon: "☕",
          completed: false,
          location: "Il Coccolo",
          mustTry: true
        },
        {
          id: "truffle-pasta",
          time: "12:00 PM",
          activity: "Truffle pasta lunch (reservation needed)",
          type: "dining",
          icon: "🍝",
          completed: false,
          booked: true,
          mustTry: true,
          note: "Reservation required"
        },
        {
          id: "ditta-artiginale",
          time: "3:00 PM",
          activity: "Coffee at Ditta Artiginale",
          type: "dining",
          icon: "☕",
          completed: false,
          location: "Ditta Artiginale",
          mustTry: true
        },
        {
          id: "last-minute-shopping",
          time: "4:00 PM",
          activity: "Last minute shopping and souvenirs",
          type: "shopping",
          icon: "🛍️",
          completed: false
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage",
        address: "Via delle Porte Nuove, 34, Florence"
      }
    },
    {
      id: "day-8",
      dayNumber: 8,
      date: "2025-06-12",
      city: "Bologna",
      country: "Italy",
      description: "Travel to Bologna",
      title: "Bologna Adventure",
      activities: [
        {
          id: "checkout-florence",
          time: "11:00 AM",
          activity: "Check out of Florence",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "drive-bologna",
          time: "11:30 AM",
          activity: "Drive to Bologna (~1.5 hours)",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~105km",
          duration: "1.5 hours"
        },
        {
          id: "checkin-bologna",
          time: "4:00 PM",
          activity: "Check-in Bologna accommodation",
          type: "accommodation",
          icon: "🏨",
          completed: false
        },
        {
          id: "evening-exploration",
          time: "6:00 PM",
          activity: "Evening exploration of Bologna center",
          type: "sightseeing",
          icon: "🚶",
          completed: false
        }
      ],
      accommodation: {
        name: "SWING HOUSE - free parking, historic centre, NO ZTL",
        address: "Via delle Lame 71/A, Bologna, Emilia-Romagna 40122",
        checkin: "June 12, 4:00 PM",
        checkout: "June 14, 10:00 AM",
        confirmationNumber: "HMMDH5ZARB",
        contactPhone: "+39 344 066 1776",
        parking: "Free private parking 100m away (book 24h ahead)",
        wifi: "Via delle Lame is OUTSIDE ZTL (safe!)"
      }
    },
    {
      id: "day-9",
      dayNumber: 9,
      date: "2025-06-13",
      city: "Bologna",
      country: "Italy",
      description: "Full day exploring Bologna",
      title: "Bologna Full Day",
      activities: [
        {
          id: "piazza-maggiore",
          time: "9:00 AM",
          activity: "Piazza Maggiore & Basilica San Petronio",
          type: "sightseeing",
          icon: "🏛️",
          completed: false,
          location: "Piazza Maggiore",
          mustTry: true
        },
        {
          id: "two-towers",
          time: "11:00 AM",
          activity: "Two Towers (Asinelli & Garisenda)",
          type: "sightseeing",
          icon: "🗼",
          completed: false,
          location: "Due Torri",
          mustTry: true
        },
        {
          id: "tortellini-lunch",
          time: "12:30 PM",
          activity: "Traditional Tortellini lunch",
          type: "dining",
          icon: "🍝",
          completed: false,
          mustTry: true,
          note: "Local specialty"
        },
        {
          id: "quadrilatero-market",
          time: "2:00 PM",
          activity: "Quadrilatero market area",
          type: "shopping",
          icon: "🛒",
          completed: false,
          location: "Quadrilatero"
        },
        {
          id: "university",
          time: "3:30 PM",
          activity: "University of Bologna visit",
          type: "culture",
          icon: "🎓",
          completed: false,
          location: "Archiginnasio"
        },
        {
          id: "porticoes",
          time: "5:00 PM",
          activity: "Historic Porticoes walk",
          type: "sightseeing",
          icon: "🚶",
          completed: false,
          culturalNote: "UNESCO World Heritage site"
        },
        {
          id: "tagliatelle-dinner",
          time: "7:00 PM",
          activity: "Tagliatelle al ragù dinner",
          type: "dining",
          icon: "🍝",
          completed: false,
          mustTry: true,
          note: "Bologna specialty"
        }
      ],
      accommodation: {
        name: "SWING HOUSE",
        address: "Via delle Lame 71/A, Bologna"
      }
    },
    {
      id: "day-10",
      dayNumber: 10,
      date: "2025-06-14",
      city: "Lake Como",
      country: "Italy",
      description: "Travel to Lake Como/Vezio",
      title: "Lake Como Getaway",
      activities: [
        {
          id: "checkout-bologna",
          time: "10:00 AM",
          activity: "Check-out Bologna",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "drive-como",
          time: "10:30 AM",
          activity: "Drive to Vezio (~3.5 hours)",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~280km",
          duration: "3.5 hours"
        },
        {
          id: "checkin-como",
          time: "3:00 PM",
          activity: "Check-in Casa Chicca",
          type: "accommodation",
          icon: "🏨",
          completed: false,
          location: "Vezio"
        },
        {
          id: "lake-evening",
          time: "5:00 PM",
          activity: "Evening by the lake",
          type: "relaxation",
          icon: "🌊",
          completed: false,
          location: "Lake Como"
        }
      ],
      accommodation: {
        name: "Casa Chicca, relax and lake",
        address: "Via del Castellano, 9, Vezio, Lombardia 23828",
        checkin: "June 14, 3:00 PM",
        checkout: "June 16, 11:00 AM",
        confirmationNumber: "HM4K483EX2",
        contactPhone: "+39 335 129 7553"
      },
      parkingTips: [
        {
          name: "Varenna free parking",
          price: "Via Croce (free)"
        },
        {
          name: "Bellagio parking",
          price: "€15/day"
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
      title: "Como Magic",
      activities: [
        {
          id: "varenna-village",
          time: "9:00 AM",
          activity: "Varenna village & Villa Monastero",
          type: "sightseeing",
          icon: "🏘️",
          completed: false,
          location: "Varenna",
          mustTry: true
        },
        {
          id: "ferry-bellagio",
          time: "11:30 AM",
          activity: "Ferry to Bellagio",
          type: "travel",
          icon: "⛵",
          completed: false,
          location: "Lake Como Ferry"
        },
        {
          id: "bellagio-explore",
          time: "12:00 PM",
          activity: "Explore Bellagio",
          type: "sightseeing",
          icon: "🏘️",
          completed: false,
          location: "Bellagio",
          mustTry: true
        },
        {
          id: "villa-balbianello",
          time: "2:30 PM",
          activity: "Villa del Balbianello visit",
          type: "sightseeing",
          icon: "🏰",
          completed: false,
          location: "Villa del Balbianello",
          mustTry: true
        },
        {
          id: "como-town",
          time: "4:30 PM",
          activity: "Como town & cathedral",
          type: "sightseeing",
          icon: "⛪",
          completed: false,
          location: "Como"
        },
        {
          id: "cable-car",
          time: "6:00 PM",
          activity: "Cable car to Brunate",
          type: "sightseeing",
          icon: "🚠",
          completed: false,
          location: "Como-Brunate Funicular"
        }
      ],
      accommodation: {
        name: "Casa Chicca",
        address: "Via del Castellano, 9, Vezio"
      }
    },
    {
      id: "day-12",
      dayNumber: 12,
      date: "2025-06-16",
      city: "Lucerne",
      country: "Switzerland",
      description: "Travel to Lucerne, Switzerland",
      title: "Hello Switzerland",
      activities: [
        {
          id: "checkout-como",
          time: "11:00 AM",
          activity: "Check-out Casa Chicca",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "drive-lucerne",
          time: "11:30 AM",
          activity: "Drive to Lucerne (~3 hours)",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~220km",
          duration: "3 hours",
          warning: "Swiss vignette required (CHF 40)"
        },
        {
          id: "swiss-vignette",
          time: "12:00 PM",
          activity: "Purchase Swiss highway vignette",
          type: "travel",
          icon: "🎫",
          completed: false,
          note: "CHF 40 (€37) - Buy at border or gas station"
        },
        {
          id: "lucerne-arrival",
          time: "2:30 PM",
          activity: "Arrive Lucerne and check-in",
          type: "accommodation",
          icon: "🏨",
          completed: false
        },
        {
          id: "chapel-bridge",
          time: "4:00 PM",
          activity: "Visit Chapel Bridge",
          type: "sightseeing",
          icon: "🌉",
          completed: false,
          location: "Kapellbrücke",
          mustTry: true
        }
      ],
      warnings: [
        {
          type: "warning",
          message: "Swiss highway vignette required - CHF 40",
          times: "Must stick on windscreen, valid entire year"
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
      title: "Germany Bound",
      activities: [
        {
          id: "checkout-lucerne",
          time: "10:00 AM",
          activity: "Check-out Lucerne",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "drive-stuttgart",
          time: "10:30 AM",
          activity: "Drive to Stuttgart (~3 hours)",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~250km",
          duration: "3 hours"
        },
        {
          id: "checkin-stuttgart",
          time: "2:00 PM",
          activity: "Check-in Stuttgart accommodation",
          type: "accommodation",
          icon: "🏨",
          completed: false
        },
        {
          id: "city-exploration",
          time: "4:00 PM",
          activity: "Initial city exploration",
          type: "sightseeing",
          icon: "🚶",
          completed: false,
          location: "Stuttgart city center"
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart",
        checkin: "June 17, 2025",
        checkout: "June 21, 2025",
        confirmationNumber: "CI5EKCQU",
        contactPhone: "+49-711-4909290",
        totalPrice: "623.32 EUR"
      },
      parkingTips: [
        {
          name: "City center garages",
          price: "€15-25/day"
        }
      ]
    },
    {
      id: "day-14",
      dayNumber: 14,
      date: "2025-06-18",
      city: "Stuttgart",
      country: "Germany",
      description: "Pre-audition preparation day",
      title: "Stuttgart Pre-Audition",
      activities: [
        {
          id: "vocal-warmups",
          time: "9:00 AM",
          activity: "Vocal warm-ups and practice",
          type: "preparation",
          icon: "🎵",
          completed: false,
          importance: "Critical preparation"
        },
        {
          id: "venue-visit",
          time: "11:00 AM",
          activity: "Visit audition venue - Staatsoper Stuttgart",
          type: "preparation",
          icon: "🎭",
          completed: false,
          location: "Stuttgart Opera House",
          importance: "Venue familiarization"
        },
        {
          id: "repertoire-review",
          time: "2:00 PM",
          activity: "Review repertoire and audition materials",
          type: "preparation",
          icon: "📚",
          completed: false,
          note: "Classical roles: Rodolfo, Don José, Radamès"
        },
        {
          id: "mercedes-museum",
          time: "4:00 PM",
          activity: "Mercedes-Benz Museum (relaxation)",
          type: "sightseeing",
          icon: "🚗",
          completed: false,
          location: "Mercedes-Benz Museum"
        },
        {
          id: "rest-preparation",
          time: "7:00 PM",
          activity: "Rest and mental preparation",
          type: "preparation",
          icon: "🧘",
          completed: false,
          importance: "Rest before audition"
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart"
      }
    },
    {
      id: "day-15",
      dayNumber: 15,
      date: "2025-06-19",
      city: "Stuttgart",
      country: "Germany",
      description: "Opera audition day at Staatsoper Stuttgart",
      title: "AUDITION DAY 🎭",
      specialEvent: true,
      activities: [
        {
          id: "morning-prep",
          time: "8:00 AM",
          activity: "Final vocal warm-up and preparation",
          type: "preparation",
          icon: "🎵",
          completed: false,
          importance: "Final preparation"
        },
        {
          id: "audition",
          time: "TBD",
          activity: "Opera audition at Staatsoper Stuttgart",
          type: "audition",
          icon: "🎭",
          completed: false,
          location: "Stuttgart Opera House",
          importance: "Main event",
          note: "Connect with European casting directors and GMDs"
        },
        {
          id: "networking",
          time: "After audition",
          activity: "Meet casting directors & GMDs",
          type: "networking",
          icon: "🤝",
          completed: false,
          note: "European opera house representatives"
        },
        {
          id: "celebration",
          time: "Evening",
          activity: "Celebrate completion of audition",
          type: "celebration",
          icon: "🎉",
          completed: false
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart"
      },
      encouragement: "Today is the day! All your preparation has led to this moment. Trust in your talent and training. Break a leg! 🎭✨"
    },
    {
      id: "day-16",
      dayNumber: 16,
      date: "2025-06-20",
      city: "Stuttgart",
      country: "Germany",
      description: "Post-audition exploration of Stuttgart",
      title: "Stuttgart Post-Audition",
      activities: [
        {
          id: "celebration-brunch",
          time: "10:00 AM",
          activity: "Celebration brunch",
          type: "dining",
          icon: "🥐",
          completed: false,
          note: "Well-deserved celebration!"
        },
        {
          id: "porsche-museum",
          time: "11:30 AM",
          activity: "Porsche Museum visit",
          type: "sightseeing",
          icon: "🏎️",
          completed: false,
          location: "Porsche Museum"
        },
        {
          id: "schlossplatz",
          time: "2:00 PM",
          activity: "Explore Schlossplatz and New Palace",
          type: "sightseeing",
          icon: "🏰",
          completed: false,
          location: "Schlossplatz"
        },
        {
          id: "local-restaurant",
          time: "6:00 PM",
          activity: "Dinner at local restaurant",
          type: "dining",
          icon: "🍽️",
          completed: false,
          note: "Traditional German cuisine"
        }
      ],
      accommodation: {
        name: "Adina Apartment Hotel Stuttgart",
        address: "Kriegsbergstraße 24, 70174 Stuttgart"
      }
    },
    {
      id: "day-17",
      dayNumber: 17,
      date: "2025-06-21",
      city: "Black Forest",
      country: "Germany",
      description: "Travel to Black Forest region",
      title: "Black Forest Adventure",
      activities: [
        {
          id: "checkout-stuttgart",
          time: "10:00 AM",
          activity: "Check-out Stuttgart",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "hohenzollern-castle",
          time: "11:00 AM",
          activity: "Visit Burg Hohenzollern castle",
          type: "sightseeing",
          icon: "🏰",
          completed: false,
          location: "Hohenzollern Castle",
          mustTry: true,
          note: "Ancestral seat of the Hohenzollern family"
        },
        {
          id: "drive-black-forest",
          time: "3:00 PM",
          activity: "Drive into Black Forest region",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Schwarzwald"
        },
        {
          id: "triberg-waterfalls",
          time: "4:30 PM",
          activity: "Visit Triberg Waterfalls",
          type: "nature",
          icon: "💧",
          completed: false,
          location: "Triberg",
          note: "One of Germany's highest waterfalls"
        },
        {
          id: "checkin-black-forest",
          time: "6:00 PM",
          activity: "Check-in Black Forest accommodation",
          type: "accommodation",
          icon: "🏨",
          completed: false
        }
      ]
    },
    {
      id: "day-18",
      dayNumber: 18,
      date: "2025-06-22",
      city: "Black Forest",
      country: "Germany",
      description: "Exploring Black Forest region",
      title: "Black Forest Exploration",
      activities: [
        {
          id: "lake-titisee",
          time: "9:00 AM",
          activity: "Visit Lake Titisee",
          type: "nature",
          icon: "🌊",
          completed: false,
          location: "Titisee",
          note: "Popular lake in the heart of the Black Forest"
        },
        {
          id: "cuckoo-clocks",
          time: "11:30 AM",
          activity: "Cuckoo Clock Workshops",
          type: "culture",
          icon: "🕐",
          completed: false,
          location: "Black Forest",
          note: "Traditional craftsmanship of the region"
        },
        {
          id: "schwarzwaldbahn",
          time: "2:00 PM",
          activity: "Schwarzwaldbahn scenic train to Hausach",
          type: "sightseeing",
          icon: "🚂",
          completed: false,
          location: "Black Forest Railway"
        },
        {
          id: "freudenstadt",
          time: "4:00 PM",
          activity: "Explore Freudenstadt",
          type: "sightseeing",
          icon: "🏘️",
          completed: false,
          location: "Freudenstadt"
        },
        {
          id: "local-dinner",
          time: "7:00 PM",
          activity: "Traditional Black Forest dinner",
          type: "dining",
          icon: "🍽️",
          completed: false,
          mustTry: true,
          note: "Black Forest specialties"
        }
      ]
    },
    {
      id: "day-19",
      dayNumber: 19,
      date: "2025-06-23",
      city: "Zurich",
      country: "Switzerland",
      description: "Travel to Zurich via scenic route",
      title: "Scenic Route to Zurich",
      activities: [
        {
          id: "checkout-black-forest",
          time: "9:00 AM",
          activity: "Check-out Black Forest accommodation",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "lindau-bodensee",
          time: "10:30 AM",
          activity: "Stop in Lindau on the Bodensee",
          type: "sightseeing",
          icon: "🌊",
          completed: false,
          location: "Lindau",
          note: "Beautiful lake town"
        },
        {
          id: "lichtenstein-castle",
          time: "1:00 PM",
          activity: "Visit Lichtenstein Castle",
          type: "sightseeing",
          icon: "🏰",
          completed: false,
          location: "Schloss Lichtenstein"
        },
        {
          id: "drive-zurich",
          time: "3:00 PM",
          activity: "Continue drive to Zurich",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~200km"
        },
        {
          id: "zurich-arrival",
          time: "5:00 PM",
          activity: "Arrive Zurich and check-in",
          type: "accommodation",
          icon: "🏨",
          completed: false
        },
        {
          id: "lake-zurich-walk",
          time: "6:30 PM",
          activity: "Evening walk by Lake Zurich",
          type: "sightseeing",
          icon: "🚶",
          completed: false,
          location: "Lake Zurich"
        }
      ]
    },
    {
      id: "day-20",
      dayNumber: 20,
      date: "2025-06-24",
      city: "Milan",
      country: "Italy",
      description: "Return to Milan for final night",
      title: "Return to Milan",
      activities: [
        {
          id: "zurich-old-town",
          time: "9:00 AM",
          activity: "Explore Zurich Old Town (Altstadt)",
          type: "sightseeing",
          icon: "🏘️",
          completed: false,
          location: "Zurich Altstadt"
        },
        {
          id: "checkout-zurich",
          time: "11:00 AM",
          activity: "Check-out Zurich",
          type: "travel",
          icon: "🧳",
          completed: false
        },
        {
          id: "drive-milan",
          time: "11:30 AM",
          activity: "Drive back to Milan",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~280km",
          duration: "3.5 hours"
        },
        {
          id: "checkin-milan-final",
          time: "3:00 PM",
          activity: "Check-in final Milan accommodation",
          type: "accommodation",
          icon: "🏨",
          completed: false
        },
        {
          id: "last-shopping",
          time: "4:00 PM",
          activity: "Last minute shopping in Milan",
          type: "shopping",
          icon: "🛍️",
          completed: false,
          location: "Quadrilatero della Moda"
        },
        {
          id: "farewell-dinner",
          time: "7:00 PM",
          activity: "Farewell dinner in Milan",
          type: "dining",
          icon: "🍽️",
          completed: false,
          note: "Final Italian meal"
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
      title: "Journey Home",
      activities: [
        {
          id: "car-return",
          time: "2:00 PM",
          activity: "Return rental car at Malpensa Airport",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "MXP Airport",
          note: "Return by 2:00 PM"
        },
        {
          id: "departure-flight",
          time: "3:20 PM",
          activity: "Depart Milan MXP on UA415",
          type: "travel",
          icon: "✈️",
          completed: false,
          flightInfo: "UA415 to Chicago ORD - Duration: 9hr 50min",
          location: "Malpensa Airport"
        }
      ],
      accommodation: {
        name: "In-flight",
        address: "Transatlantic flight"
      }
    },
    {
      id: "day-22",
      dayNumber: 22,
      date: "2025-06-26",
      city: "Los Angeles to Santa Maria",
      country: "USA",
      description: "Return home to Santa Maria",
      title: "Home Sweet Home",
      activities: [
        {
          id: "arrive-chicago",
          time: "6:10 PM",
          activity: "Arrive Chicago ORD (June 25)",
          type: "travel",
          icon: "✈️",
          completed: false,
          location: "Chicago O'Hare"
        },
        {
          id: "connecting-flight",
          time: "9:40 PM",
          activity: "Depart Chicago on UA1936",
          type: "travel",
          icon: "✈️",
          completed: false,
          flightInfo: "UA1936 to LAX - Duration: 4hr 33min"
        },
        {
          id: "arrive-lax",
          time: "12:13 AM",
          activity: "Arrive LAX (June 26)",
          type: "travel",
          icon: "✈️",
          completed: false,
          location: "Los Angeles International"
        },
        {
          id: "car-rental-lax",
          time: "1:30 AM",
          activity: "Pick up LAX rental car",
          type: "travel",
          icon: "🚗",
          completed: false,
          note: "Confirmation: 23786281US1"
        },
        {
          id: "drive-home",
          time: "2:00 AM",
          activity: "Drive home to Santa Maria",
          type: "travel",
          icon: "🚗",
          completed: false,
          distance: "~200 miles",
          duration: "3 hours"
        },
        {
          id: "home-arrival",
          time: "5:00 AM",
          activity: "Arrive home in Santa Maria",
          type: "arrival",
          icon: "🏠",
          completed: false,
          note: "End of European adventure!"
        }
      ]
    }
  ]
};

// Export the days array as tripData for backward compatibility
export const tripData = europeTrip.days;
