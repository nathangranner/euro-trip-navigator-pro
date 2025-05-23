
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
      title: "Los Angeles (Departure)",
      activities: [
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
          message: "Arrive 2-3 hours early for international flight"
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
          id: "car-pickup",
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
          note: "MXP to Milan: Take A8/Milano, exit Milano Certosa. Approximately 50 minutes"
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
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136"
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
        address: "Viale Bligny, 13/a, 4th floor, Milano, Lombardia 20136"
      },
      warnings: [
        {
          type: "warning",
          message: "Pack tonight for morning checkout. Use Metro Line 2 Green to Brera"
        }
      ]
    }
  ]
};

// Export the days array as tripData for backward compatibility
export const tripData = europeTrip.days;
