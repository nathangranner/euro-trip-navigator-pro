
import { TripDay } from "@/types/trip";

export const florenceDays: TripDay[] = [
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
  }
];
