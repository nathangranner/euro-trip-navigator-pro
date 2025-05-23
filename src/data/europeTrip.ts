import { Trip } from "@/types/trip";

export const europeTrip: Trip = {
  name: "Europe Trip 2025",
  description: "Nathan & Jamie Granner's European Adventure - A 22-day journey through Italy, Switzerland, and Germany",
  startDate: "2025-06-05",
  endDate: "2025-06-26",
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      date: "2025-06-05",
      city: "Los Angeles",
      country: "USA",
      description: "Departure day - Start of the European adventure",
      title: "Santa Maria to Los Angeles (Departure)",
      activities: [
        {
          id: "car-pickup",
          time: "10:00 AM",
          activity: "Pick up rental car at Santa Maria Public Airport",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Santa Maria Public Airport, SMX, 3249 Terminal Dr, Santa Maria, CA 93455 US",
          note: "Confirmation: 23784293US1, Under name: NATHAN"
        },
        {
          id: "drive-to-lax",
          time: "10:30 AM",
          activity: "Drive from Santa Maria to LAX",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Santa Maria to Los Angeles",
          note: "Approximately 3.5 hour drive"
        },
        {
          id: "car-return",
          time: "2:00 PM",
          activity: "Return rental car at LAX",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Los Angeles Intl Airport, LAX, 5251 W 98th St, Los Angeles, CA 90045 US"
        },
        {
          id: "arrive-lax",
          time: "4:40 PM",
          activity: "Arrive at LAX (2 hours early for international)",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "LAX Terminal B"
        },
        {
          id: "departure-flight",
          time: "6:40 PM",
          activity: "Depart LAX on UA8900 (operated by Lufthansa)",
          type: "travel",
          icon: "✈️",
          completed: false,
          flightInfo: "UA8900 to Frankfurt - Duration: 11hr 15min",
          location: "Los Angeles International Airport",
          note: "Confirmation: AD8JHZ"
        }
      ],
      accommodation: {
        name: "Overnight Flight",
        address: "In-flight accommodation"
      },
      warnings: [
        {
          type: "warning",
          message: "Return car by 2:00 PM, then arrive 2-3 hours early for international flight"
        }
      ]
    },
    {
      id: "day-2",
      dayNumber: 2,
      date: "2025-06-06",
      city: "Milan",
      country: "Italy",
      description: "Frankfurt to Milan arrival",
      title: "Frankfurt to Milan",
      activities: [
        {
          id: "arrive-frankfurt",
          time: "2:55 PM",
          activity: "Arrive Frankfurt",
          type: "travel",
          icon: "✈️",
          completed: false,
          location: "Frankfurt Airport"
        },
        {
          id: "depart-frankfurt",
          time: "5:25 PM",
          activity: "Depart Frankfurt for Milan on UA9090",
          type: "travel",
          icon: "✈️",
          completed: false,
          flightInfo: "UA9090 (operated by Lufthansa)"
        },
        {
          id: "arrive-milan",
          time: "6:45 PM",
          activity: "Arrive Milan MXP",
          type: "travel",
          icon: "✈️",
          completed: false,
          location: "Malpensa Airport"
        },
        {
          id: "car-pickup-milan",
          time: "7:00 PM",
          activity: "Pick up rental car - Volkswagen T-cross",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Budget at MXP",
          note: "Confirmation: 23010030US1, RapidRez ID: V6H02R"
        },
        {
          id: "drive-accommodation",
          time: "8:00 PM",
          activity: "Drive to accommodation",
          type: "travel",
          icon: "🚗",
          completed: false,
          note: "MXP to Milan: Take A8/Milano, exit Milano Certosa. Follow Viale Certosa → Corso Sempione → Via Pagano → Viale Bligny. Approximately 50 minutes"
        },
        {
          id: "dinner-navigli",
          time: "9:00 PM",
          activity: "Light dinner near accommodation in Navigli",
          type: "dining",
          icon: "🍽️",
          completed: false,
          location: "Navigli area"
        }
      ],
      accommodation: {
        name: "Apartment 4 beds + parking, Navigli - Bocconi",
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136",
        checkin: "After 3:00 PM (self check-in)",
        contactPhone: "+39 349 146 7840",
        confirmationNumber: "HMFMP3K4ZT",
        wifi: "Lockbox code 5172, Private parking in courtyard"
      },
      warnings: [
        {
          type: "warning",
          message: "Milan ZTL active Mon-Fri 7:30-19:30, Sat 8:00-18:00"
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
      title: "Milan",
      activities: [
        {
          id: "duomo-visit",
          time: "9:00 AM",
          activity: "Duomo di Milano & rooftop terrace",
          type: "sightseeing",
          icon: "⛪",
          completed: false,
          location: "Duomo di Milano",
          mustTry: true
        },
        {
          id: "galleria",
          time: "11:00 AM",
          activity: "Galleria Vittorio Emanuele II",
          type: "sightseeing",
          icon: "🏛️",
          completed: false,
          location: "Galleria Vittorio Emanuele II"
        },
        {
          id: "lunch-luini",
          time: "1:00 PM",
          activity: "Lunch at Luini Panzerotti",
          type: "dining",
          icon: "🥪",
          completed: false,
          location: "Via S. Radegonda, 16",
          mustTry: true
        },
        {
          id: "la-scala",
          time: "2:00 PM",
          activity: "La Scala Opera House tour",
          type: "culture",
          icon: "🎭",
          completed: false,
          location: "Teatro alla Scala",
          note: "Book tour in advance"
        },
        {
          id: "shopping",
          time: "4:00 PM",
          activity: "Quadrilatero della Moda shopping",
          type: "shopping",
          icon: "🛍️",
          completed: false,
          location: "Fashion Quadrilateral"
        },
        {
          id: "aperitivo",
          time: "6:00 PM",
          activity: "Navigli canals aperitivo at Bar Basso",
          type: "dining",
          icon: "🍸",
          completed: false,
          location: "Via Plinio, 39"
        },
        {
          id: "dinner",
          time: "8:00 PM",
          activity: "Dinner at Trattoria Milanese",
          type: "dining",
          icon: "🍽️",
          completed: false,
          location: "Via Santa Marta, 11"
        }
      ],
      accommodation: {
        name: "Apartment 4 beds + parking, Navigli - Bocconi",
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136",
        contactPhone: "+39 349 146 7840"
      },
      warnings: [
        {
          type: "warning",
          message: "Use Metro Line 1 (Red) and Line 3 (Yellow) for transportation"
        }
      ]
    },
    {
      id: "day-4",
      dayNumber: 4,
      date: "2025-06-08",
      city: "Milan",
      country: "Italy",
      description: "Final day in Milan",
      title: "Milan",
      activities: [
        {
          id: "brera-morning",
          time: "10:00 AM",
          activity: "Brera art district exploration",
          type: "sightseeing",
          icon: "🎨",
          completed: false,
          location: "Brera District"
        },
        {
          id: "lunch-brera",
          time: "12:30 PM",
          activity: "Lunch at Brera district trattorias",
          type: "dining",
          icon: "🍽️",
          completed: false,
          location: "Brera District"
        },
        {
          id: "castello-sforzesco",
          time: "2:00 PM",
          activity: "Castello Sforzesco & Sempione Park",
          type: "sightseeing",
          icon: "🏰",
          completed: false,
          location: "Castello Sforzesco"
        },
        {
          id: "evening-navigli",
          time: "6:00 PM",
          activity: "Final Navigli exploration",
          type: "sightseeing",
          icon: "🚶",
          completed: false,
          location: "Navigli area"
        },
        {
          id: "dinner",
          time: "8:00 PM",
          activity: "Dinner near accommodation for convenience",
          type: "dining",
          icon: "🍽️",
          completed: false,
          location: "Near accommodation"
        }
      ],
      accommodation: {
        name: "Apartment 4 beds + parking, Navigli - Bocconi",
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136",
        contactPhone: "+39 349 146 7840"
      },
      warnings: [
        {
          type: "warning",
          message: "Pack tonight for morning checkout. Use Metro Line 2 Green to Brera"
        }
      ]
    },
    {
      id: "day-5",
      dayNumber: 5,
      date: "2025-06-09",
      city: "Florence",
      country: "Italy",
      description: "Travel from Milan to Florence",
      title: "Milan to Florence",
      activities: [
        {
          id: "checkout-milan",
          time: "11:00 AM",
          activity: "Check-out from Milan accommodation",
          type: "travel",
          icon: "🏠",
          completed: false,
          location: "Viale Bligny, 13/a, Milano"
        },
        {
          id: "depart-milan",
          time: "11:30 AM",
          activity: "Depart Milan by car",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Milan",
          note: "295 km drive to Florence, approximately 3 hours via A1/E35 Autostrada del Sole southbound"
        },
        {
          id: "checkin-florence",
          time: "1:00 PM",
          activity: "Early check-in Florence (if possible)",
          type: "travel",
          icon: "🏠",
          completed: false,
          location: "Via delle Porte Nuove, 34, Florence"
        },
        {
          id: "arrive-florence",
          time: "2:30 PM",
          activity: "Arrive in Florence",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Florence",
          note: "Exit Firenze Scandicci, property is OUTSIDE ZTL zone"
        },
        {
          id: "florence-exploration",
          time: "3:00 PM",
          activity: "Initial Florence exploration",
          type: "sightseeing",
          icon: "🚶",
          completed: false,
          location: "Florence historic center"
        },
        {
          id: "ponte-vecchio",
          time: "5:00 PM",
          activity: "Visit Ponte Vecchio",
          type: "sightseeing",
          icon: "🌉",
          completed: false,
          location: "Ponte Vecchio",
          mustTry: true
        },
        {
          id: "late-lunch",
          time: "4:00 PM",
          activity: "Late lunch at All'Antico Vinaio",
          type: "dining",
          icon: "🥪",
          completed: false,
          location: "Via dei Neri, 74",
          mustTry: true
        },
        {
          id: "piazzale-michelangelo",
          time: "7:00 PM",
          activity: "Piazzale Michelangelo for sunset",
          type: "sightseeing",
          icon: "🌅",
          completed: false,
          location: "Piazzale Michelangelo",
          mustTry: true
        },
        {
          id: "dinner-gusta",
          time: "8:30 PM",
          activity: "Dinner at Gusta Pizza",
          type: "dining",
          icon: "🍕",
          completed: false,
          location: "Piazza Santo Spirito, 11"
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage accanto al centro storico",
        address: "Via delle Porte Nuove, 34, Florence, Toscana 50144",
        checkin: "1:00 PM",
        checkout: "June 12, 11:00 AM",
        contactPhone: "Donatella (via Airbnb)",
        confirmationNumber: "HMXCEBRDD8",
        wifi: "Energy limit 3KW, quiet hours 10PM-8AM, Private garage included"
      },
      warnings: [
        {
          type: "warning",
          message: "Florence ZTL active Mon-Fri 7:30-19:30, Thu-Sat 7:30-2:00AM. Property is OUTSIDE ZTL zone"
        }
      ]
    },
    {
      id: "day-6",
      dayNumber: 6,
      date: "2025-06-10",
      city: "Florence",
      country: "Italy",
      description: "Full day exploring Florence",
      title: "Florence",
      activities: [
        {
          id: "breakfast-ditta",
          time: "8:30 AM",
          activity: "Breakfast at Ditta Artigianale",
          type: "dining",
          icon: "☕",
          completed: false,
          location: "Via dei Neri, 32"
        },
        {
          id: "uffizi-gallery",
          time: "9:00 AM",
          activity: "Uffizi Gallery visit",
          type: "culture",
          icon: "🎨",
          completed: false,
          location: "Uffizi Gallery",
          note: "Pre-book tickets online well in advance!",
          mustTry: true
        },
        {
          id: "lunch-pinos",
          time: "1:00 PM",
          activity: "Lunch at Pino's Panini",
          type: "dining",
          icon: "🥪",
          completed: false,
          location: "Pino's Panini"
        },
        {
          id: "palazzo-pitti",
          time: "3:00 PM",
          activity: "Palazzo Pitti visit",
          type: "culture",
          icon: "🏛️",
          completed: false,
          location: "Palazzo Pitti"
        },
        {
          id: "boboli-gardens",
          time: "5:00 PM",
          activity: "Boboli Gardens exploration",
          type: "sightseeing",
          icon: "🌳",
          completed: false,
          location: "Boboli Gardens"
        },
        {
          id: "dinner-coccolo",
          time: "8:00 PM",
          activity: "Dinner at Il Coccolo",
          type: "dining",
          icon: "🍽️",
          completed: false,
          location: "Via del Parioncino, 26"
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage accanto al centro storico",
        address: "Via delle Porte Nuove, 34, Florence, Toscana 50144",
        contactPhone: "Donatella (via Airbnb)",
        confirmationNumber: "HMXCEBRDD8"
      },
      warnings: [
        {
          type: "warning",
          message: "Book Uffizi tickets online well in advance. All activities are walking distance in historic center"
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
      title: "Florence",
      activities: [
        {
          id: "duomo-complex",
          time: "8:30 AM",
          activity: "Duomo complex & dome climb",
          type: "sightseeing",
          icon: "⛪",
          completed: false,
          location: "Cathedral of Santa Maria del Fiore",
          note: "Book ahead for dome climb",
          mustTry: true
        },
        {
          id: "mercato-san-lorenzo",
          time: "11:00 AM",
          activity: "Mercato di San Lorenzo",
          type: "shopping",
          icon: "🛍️",
          completed: false,
          location: "Mercato di San Lorenzo"
        },
        {
          id: "lunch-mercato",
          time: "12:30 PM",
          activity: "Lunch at Mercato Centrale upper floor",
          type: "dining",
          icon: "🍽️",
          completed: false,
          location: "Mercato Centrale upper floor"
        },
        {
          id: "santa-croce",
          time: "2:00 PM",
          activity: "Santa Croce basilica visit",
          type: "culture",
          icon: "⛪",
          completed: false,
          location: "Basilica of Santa Croce"
        },
        {
          id: "oltrarno-district",
          time: "4:00 PM",
          activity: "Oltrarno artisan district exploration",
          type: "sightseeing",
          icon: "🎨",
          completed: false,
          location: "Oltrarno district"
        },
        {
          id: "dinner-truffle",
          time: "8:00 PM",
          activity: "Dinner at truffle pasta restaurant",
          type: "dining",
          icon: "🍝",
          completed: false,
          location: "Florence",
          note: "Reservation needed"
        }
      ],
      accommodation: {
        name: "Graziosa dimora +garage accanto al centro storico",
        address: "Via delle Porte Nuove, 34, Florence, Toscana 50144",
        contactPhone: "Donatella (via Airbnb)",
        confirmationNumber: "HMXCEBRDD8",
        checkout: "June 12, 11:00 AM"
      },
      warnings: [
        {
          type: "warning",
          message: "Energy limit 3KW - don't overload circuits. All activities are walkable. Last night in Florence"
        }
      ]
    },
    {
      id: "day-22",
      dayNumber: 22,
      date: "2025-06-26",
      city: "Los Angeles",
      country: "USA",
      description: "Return home - End of European adventure",
      title: "Los Angeles to Santa Maria (Return)",
      activities: [
        {
          id: "car-pickup-return",
          time: "1:30 AM",
          activity: "Pick up rental car at LAX",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Los Angeles Intl Airport, LAX, 5251 W 98th St, Los Angeles, CA 90045 US",
          note: "Confirmation: 23786281US1, Under name: NATHAN"
        },
        {
          id: "drive-home",
          time: "2:00 AM",
          activity: "Drive from LAX to Santa Maria",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Los Angeles to Santa Maria",
          note: "Approximately 3.5 hour drive - night driving"
        },
        {
          id: "car-return-final",
          time: "11:30 PM",
          activity: "Return rental car at Santa Maria Public Airport",
          type: "travel",
          icon: "🚗",
          completed: false,
          location: "Santa Maria Public Airport, SMX, 3249 Terminal Dr, Santa Maria, CA 93455 US"
        }
      ],
      accommodation: {
        name: "Home",
        address: "Back home in Santa Maria"
      },
      warnings: [
        {
          type: "warning",
          message: "Night driving - be careful and well-rested for the journey home"
        }
      ]
    }
  ]
};

// Export the days array as tripData for backward compatibility
export const tripData = europeTrip.days;
