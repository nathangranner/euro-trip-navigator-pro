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
  scheduledDate?: string; // New field for custom scheduling
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
