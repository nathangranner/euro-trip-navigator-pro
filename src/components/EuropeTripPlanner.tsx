
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, X, Car, Clock, MapPin, Calendar } from 'lucide-react';

// Create a type for accommodation to fix TypeScript errors
type Accommodation = {
  name: string;
  image: string;
  wifi: string;
  address?: string;
  checkin?: string;
  code?: string;
  parking?: string;
  contact?: string;
};

// Define types for activities and other data structures
type Activity = {
  id: string;
  time: string;
  activity: string;
  type: string;
  icon: string;
  image: string;
  note?: string;
  checklist?: string[];
  suggestions?: string[];
  completed: boolean;
  contactInfo?: string;
  flightInfo?: string;
  tip?: string;
  culturalNote?: string;
  location?: string;
  mustTry?: boolean;
  booked?: boolean;
  importance?: string;
  duration?: string;
  playlist?: string;
};

type Warning = {
  type: string;
  message: string;
  fine?: string;
  times?: string;
  image: string;
};

type Weather = {
  temp: string;
  icon: string;
  condition: string;
};

type TripDay = {
  date: string;
  city: string;
  title: string;
  bgImage: string;
  bgGradient: string;
  activities: Activity[];
  warnings?: Warning[];
  accommodation?: Accommodation;
  weather?: Weather;
  specialEvent?: boolean;
  encouragement?: string;
};

export const EuropeTripPlanner: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    time: '',
    activity: '',
    type: 'activity',
    icon: '📌',
    note: ''
  });
  const [tripDays, setTripDays] = useState<TripDay[]>([
    {
      date: '2025-06-05',
      city: 'Los Angeles',
      title: 'Departure Day',
      bgImage: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bgGradient: 'from-blue-500 to-sky-600',
      activities: [
        { 
          id: '1-1',
          time: '10:00', 
          activity: 'Pick up rental car at Santa Maria Airport', 
          type: 'logistics',
          icon: '🚗',
          image: 'https://images.unsplash.com/photo-1650472576213-1e7ae623c6fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Volkswagen Jetta (Automatic), Reservation #L1, Budget Fastbreak Counter',
          checklist: ['Booking confirmation', 'Driver\'s license', 'Credit card (Visa *4592)'],
          completed: false,
          contactInfo: 'Budget: (1) 805-922-3113'
        },
        { 
          id: '1-2',
          time: '12:00', 
          activity: 'Final packing & docs check', 
          type: 'logistics',
          icon: '📋',
          image: 'https://images.unsplash.com/photo-1581553673739-c4906b5d0de1?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          checklist: ['Passports', 'AAA International DL', 'Travel insurance', 'Suitcase & backpack'],
          completed: false
        },
        { 
          id: '1-3',
          time: '14:00', 
          activity: 'Return rental car at LAX', 
          type: 'travel',
          icon: '🚗',
          image: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Budget return at LAX, follow signs for rental car return',
          contactInfo: 'Budget LAX: (1) 310-642-4500',
          completed: false
        },
        { 
          id: '1-4',
          time: '18:40', 
          activity: 'Flight LAX → Milan', 
          type: 'travel',
          icon: '✈️',
          image: 'https://images.unsplash.com/photo-1532299033752-9376aa1fed37?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          flightInfo: 'Lufthansa #8900 • Arrive 18:00+1',
          completed: false
        }
      ]
    },
    {
      date: '2025-06-06',
      city: 'Milan',
      title: 'Arrival in Milan',
      bgImage: 'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bgGradient: 'from-red-500 to-orange-500',
      weather: { temp: '22°C', icon: '☀️', condition: 'Sunny' },
      activities: [
        { 
          id: '2-1',
          time: '06:00', 
          activity: 'Land at Milan MXP', 
          type: 'travel',
          icon: '🛬',
          image: 'https://images.unsplash.com/photo-1588179579529-3fde7293eace?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          completed: false
        },
        { 
          id: '2-2',
          time: '09:00', 
          activity: 'Collect rental car', 
          type: 'logistics',
          icon: '🚗',
          image: 'https://images.unsplash.com/photo-1650472576213-1e7ae623c6fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Remember: Drive on right side!',
          completed: false
        },
        { 
          id: '2-3',
          time: '12:00', 
          activity: 'Check into Airbnb', 
          type: 'accommodation',
          icon: '🏠',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          completed: false
        },
        { 
          id: '2-4',
          time: '14:00', 
          activity: 'First Italian lunch', 
          type: 'meal',
          icon: '🍝',
          image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          suggestions: ['Risotto alla milanese', 'Cotoletta'],
          completed: false
        },
        { 
          id: '2-5',
          time: '16:00', 
          activity: 'Visit Duomo Cathedral', 
          type: 'sightseeing',
          icon: '⛪',
          image: 'https://images.unsplash.com/photo-1595831220477-5d0a83bd859c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          tip: 'Look up at the Gothic spires!',
          completed: false
        }
      ],
      warnings: [
        { 
          type: 'critical', 
          message: 'AVOID HISTORIC CENTER ZTL',
          fine: '€80+',
          image: 'https://images.unsplash.com/photo-1567951473648-c605f56d42c8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ],
      accommodation: {
        name: 'Milano City Center',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        checkin: '15:00',
        wifi: 'MilanoGuest2025'
      }
    },
    {
      date: '2025-06-19',
      city: 'Stuttgart',
      title: 'Pre-Audition Day',
      bgImage: 'https://images.unsplash.com/photo-1564028702218-ee7e9e97c7cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bgGradient: 'from-indigo-500 to-purple-600',
      activities: [
        { 
          id: '19-1',
          time: '09:00', 
          activity: 'Staatsoper Rehearsal (TBC)', 
          type: 'preparation',
          icon: '🎵',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Possible rehearsal opportunity - confirm ahead of time',
          completed: false
        },
        { 
          id: '19-2',
          time: '12:00', 
          activity: 'Light lunch', 
          type: 'meal',
          icon: '🥗',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Nothing too heavy day before audition',
          completed: false
        },
        { 
          id: '19-3',
          time: '14:00', 
          activity: 'Voice rest', 
          type: 'rest',
          icon: '😴',
          image: 'https://images.unsplash.com/photo-1572424117831-005b5f17e260?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          completed: false
        },
        { 
          id: '19-4',
          time: '16:00', 
          activity: 'Light practice', 
          type: 'preparation',
          icon: '🎭',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Final run-through of pieces',
          completed: false
        },
        { 
          id: '19-5',
          time: '18:00', 
          activity: 'Early dinner', 
          type: 'meal',
          icon: '🍽️',
          image: 'https://images.unsplash.com/photo-1488992783499-418eb1f62d08?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          completed: false
        },
        { 
          id: '19-6',
          time: '20:00', 
          activity: 'Early bedtime', 
          type: 'rest',
          icon: '🛌',
          image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Get good rest!',
          completed: false
        }
      ],
      accommodation: {
        name: 'Adina Apartment Hotel Stuttgart',
        address: 'Kriegsbergstraße 24, 70174 Stuttgart',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        wifi: 'AdinaGuest'
      }
    },
    {
      date: '2025-06-20',
      city: 'Stuttgart',
      title: 'AUDITION DAY!',
      bgImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bgGradient: 'from-purple-600 to-indigo-600',
      specialEvent: true,
      encouragement: "🎯 Break a leg, Nathan! This is your moment to shine! 🦵✨",
      activities: [
        { 
          id: '20-1',
          time: '08:00', 
          activity: 'Light breakfast', 
          type: 'meal',
          icon: '🥐',
          image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Not too heavy before singing',
          completed: false
        },
        { 
          id: '20-2',
          time: '09:30', 
          activity: 'Vocal warm-up', 
          type: 'preparation',
          icon: '🎵',
          image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          completed: false
        },
        { 
          id: '20-3',
          time: '11:00', 
          activity: '🎭 STAATSOPER STUTTGART AUDITION', 
          type: 'audition',
          icon: '🎭',
          image: 'https://images.unsplash.com/photo-1525857369227-d7d5146c9bbe?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'MAJOR EVENT!',
          completed: false
        },
        { 
          id: '20-4',
          time: '14:00', 
          activity: 'Celebration lunch', 
          type: 'meal',
          icon: '🥂',
          image: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Traditional Swabian cuisine',
          completed: false
        },
        { 
          id: '20-5',
          time: '16:00', 
          activity: 'Relax & unwind', 
          type: 'rest',
          icon: '🧘',
          image: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          completed: false
        },
        { 
          id: '20-6',
          time: '19:30', 
          activity: 'Opera performance (optional)', 
          type: 'entertainment',
          icon: '🎼',
          image: 'https://images.unsplash.com/photo-1519123439567-e9b22b701766?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'If not too tired',
          completed: false
        }
      ],
      accommodation: {
        name: 'Adina Apartment Hotel Stuttgart',
        address: 'Kriegsbergstraße 24, 70174 Stuttgart',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        wifi: 'AdinaGuest'
      }
    },
    // Adding the return trip day with car rental details
    {
      date: '2025-06-26',
      city: 'Los Angeles',
      title: 'Return Trip',
      bgImage: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bgGradient: 'from-blue-600 to-purple-500',
      activities: [
        { 
          id: '26-1',
          time: '01:30', 
          activity: 'Pick up rental car at LAX', 
          type: 'logistics',
          icon: '🚗',
          image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Toyota Corolla (Automatic), Confirmation #23786281US1, Reservation #J5, Budget Fastbreak Counter',
          checklist: ['Booking confirmation', 'Driver\'s license', 'Credit card (Visa *4592)'],
          completed: false,
          contactInfo: 'Budget LAX: (1) 310-642-4500'
        },
        { 
          id: '26-2',
          time: '02:30', 
          activity: 'Drive to Santa Maria', 
          type: 'travel',
          icon: '🚗',
          image: 'https://images.unsplash.com/photo-1566202546954-b0200d9c7482?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'Approximately 3 hours drive',
          completed: false
        },
        { 
          id: '26-3',
          time: '23:30', 
          activity: 'Return rental car at Santa Maria Airport', 
          type: 'travel',
          icon: '🚗',
          image: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          note: 'After-hours drop-off, key-drop box available',
          contactInfo: 'Budget Santa Maria: (1) 805-922-3113',
          completed: false
        }
      ]
    }
  ]);
  
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Main functions
  const currentDayData = tripDays[currentDay];

  const nextDay = () => {
    if (currentDay < tripDays.length - 1) {
      setCurrentDay(currentDay + 1);
      toast.info(`Switched to ${tripDays[currentDay + 1].city} - ${tripDays[currentDay + 1].title}`);
    }
  };

  const prevDay = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
      toast.info(`Switched to ${tripDays[currentDay - 1].city} - ${tripDays[currentDay - 1].title}`);
    }
  };

  const toggleActivity = (index: number) => {
    setExpandedActivity(expandedActivity === index ? null : index);
  };

  const handleActivityToggle = (id: string) => {
    const updatedActivities = currentDayData.activities.map(activity => {
      if (activity.id === id) {
        const completed = !activity.completed;
        // Show toast notification when activity is completed/uncompleted
        if (completed) {
          toast.success(`Completed: ${activity.activity}`);
        } else {
          toast.info(`Unmarked: ${activity.activity}`);
        }
        return { ...activity, completed };
      }
      return activity;
    });
    
    const updatedTripDays = [...tripDays];
    updatedTripDays[currentDay] = {
      ...currentDayData,
      activities: updatedActivities
    };
    
    setTripDays(updatedTripDays);
  };

  const handleAddActivity = () => {
    if (!newActivity.activity || !newActivity.time) {
      toast.error('Please provide both time and activity name');
      return;
    }
    
    // Create a new activity object
    const activity = {
      id: `${currentDay}-${Date.now()}`,
      ...newActivity,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      completed: false
    };
    
    // Update the current day's activities
    const updatedTripDays = [...tripDays];
    updatedTripDays[currentDay] = {
      ...currentDayData,
      activities: [...currentDayData.activities, activity]
    };
    
    // Update state
    setTripDays(updatedTripDays);
    toast.success(`Added: ${newActivity.activity}`);
    
    // Reset form
    setNewActivity({
      time: '',
      activity: '',
      type: 'activity',
      icon: '📌',
      note: ''
    });
    
    setShowAddActivity(false);
  };

  // Activity type icons
  const getActivityIcon = (type: string) => {
    const icons: {[key: string]: string} = {
      activity: '📌',
      meal: '🍽️',
      logistics: '📋',
      travel: '🚗',
      sightseeing: '👁️',
      accommodation: '🏨',
      transport: '🚆',
      entertainment: '🎭',
      photos: '📸',
      shopping: '🛍️',
      rest: '😴',
      audition: '🎭',
      preparation: '🔄'
    };
    return icons[type] || '📌';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div 
        className="hero-header bg-gradient-to-br text-white relative overflow-hidden shadow-md"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentDayData.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '250px'
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{currentDayData.city}</h1>
              <p className="text-xl opacity-90">{currentDayData.title}</p>
              <p className="text-sm opacity-75">{formatDate(currentDayData.date)}</p>
            </div>
            {currentDayData.weather && (
              <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl">{currentDayData.weather.icon}</div>
                <div className="text-lg font-semibold">{currentDayData.weather.temp}</div>
                <div className="text-sm">{currentDayData.weather.condition}</div>
              </div>
            )}
          </div>
          
          {currentDayData.specialEvent && (
            <div className="mt-4 bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 animate-pulse-gentle">
              <p className="text-lg font-semibold">✨ Special Day! ✨</p>
            </div>
          )}
          
          {currentDayData.encouragement && (
            <div className="mt-4 bg-pink-500/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-lg italic">{currentDayData.encouragement}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Button
              onClick={prevDay}
              disabled={currentDay === 0}
              variant={currentDay === 0 ? "outline" : "default"}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <div className="text-center">
              <div className="text-sm text-gray-500">Day {currentDay + 1} of {tripDays.length}</div>
              <div className="w-32 md:w-64 bg-gray-200 rounded-full h-2 mx-auto mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentDay + 1) / tripDays.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Button
              onClick={nextDay}
              disabled={currentDay === tripDays.length - 1}
              variant={currentDay === tripDays.length - 1 ? "outline" : "default"}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {currentDayData.warnings && currentDayData.warnings.length > 0 && (
        <div className="container mx-auto px-4 py-4">
          {currentDayData.warnings.map((warning: any, index: number) => (
            <div 
              key={index} 
              className={`mb-4 p-4 rounded-lg flex items-center bg-white shadow-md ${
                warning.type === 'critical' 
                  ? 'border-l-4 border-red-500' 
                  : warning.type === 'safe' 
                    ? 'border-l-4 border-green-500' 
                    : 'border-l-4 border-orange-500'
              }`}
            >
              <img src={warning.image} alt="Warning" className="w-20 h-16 rounded mr-4 object-cover" />
              <div className="flex-1">
                <div className={`font-semibold ${
                  warning.type === 'critical' 
                    ? 'text-red-600' 
                    : warning.type === 'safe' 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                }`}>
                  {warning.message}
                </div>
                {warning.fine && <div className="text-sm text-red-500">Fine: {warning.fine}</div>}
                {warning.times && <div className="text-sm text-gray-600">{warning.times}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activities */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">📅 Today's Activities</h2>
          <Button 
            onClick={() => setShowAddActivity(!showAddActivity)}
            className="flex items-center gap-2"
          >
            {showAddActivity ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddActivity ? 'Cancel' : 'Add Activity'}
          </Button>
        </div>

        {/* Add Activity Form */}
        {showAddActivity && (
          <Card className="p-4 mb-6">
            <h3 className="font-semibold mb-3">Add New Activity</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <Input
                    type="time"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <Select
                    value={newActivity.type}
                    onValueChange={(value) => {
                      setNewActivity({
                        ...newActivity, 
                        type: value, 
                        icon: getActivityIcon(value)
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="meal">Meal</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="sightseeing">Sightseeing</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="rest">Rest</SelectItem>
                      <SelectItem value="preparation">Preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                <Input
                  type="text"
                  value={newActivity.activity}
                  onChange={(e) => setNewActivity({...newActivity, activity: e.target.value})}
                  placeholder="What are you doing?"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <Textarea
                  value={newActivity.note}
                  onChange={(e) => setNewActivity({...newActivity, note: e.target.value})}
                  placeholder="Any additional details..."
                  className="w-full"
                  rows={2}
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={handleAddActivity}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Add Activity
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {currentDayData.activities && currentDayData.activities.length > 0 ? (
            currentDayData.activities
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((activity: any, index: number) => (
                <Card 
                  key={activity.id}
                  className={`overflow-hidden transition-all duration-200 ${
                    activity.completed ? 'bg-gray-50' : ''
                  } ${
                    expandedActivity === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center p-4">
                    <Checkbox
                      checked={activity.completed}
                      onCheckedChange={() => handleActivityToggle(activity.id)}
                      className="mr-3 h-5 w-5"
                    />
                    
                    <div 
                      className="flex flex-1 items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleActivity(index)}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <span className="text-2xl">{activity.icon}</span>
                      </div>
                      
                      <div className="hidden sm:block">
                        <img 
                          src={activity.image} 
                          alt={activity.activity}
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className={activity.completed ? 'line-through text-gray-500' : ''}>
                            <h3 className="font-semibold text-lg">{activity.activity}</h3>
                            <p className="text-blue-600 font-medium">{activity.time}</p>
                            {activity.duration && <p className="text-sm text-gray-500">⏱️ {activity.duration}</p>}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {activity.mustTry && <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">MUST TRY!</span>}
                            {activity.booked && <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">BOOKED</span>}
                            {activity.importance && <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">{activity.importance}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        {expandedActivity === index ? 
                          <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        }
                      </div>
                    </div>
                  </div>
                  
                  {expandedActivity === index && (
                    <div className="bg-gray-50 p-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {activity.note && <p className="text-gray-700"><strong>📝 Note:</strong> {activity.note}</p>}
                          {activity.tip && <p className="text-blue-700"><strong>💡 Tip:</strong> {activity.tip}</p>}
                          {activity.culturalNote && <p className="text-purple-700"><strong>🎭 Culture:</strong> {activity.culturalNote}</p>}
                          {activity.location && <p className="text-green-700"><strong>📍 Location:</strong> {activity.location}</p>}
                          {activity.contactInfo && <p className="text-blue-700"><strong>📞 Contact:</strong> {activity.contactInfo}</p>}
                          {activity.checklist && (
                            <div className="mt-2">
                              <strong>Checklist:</strong>
                              <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                                {activity.checklist.map((item: string, i: number) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {activity.suggestions && (
                            <div className="mt-2">
                              <strong>🍽️ Try:</strong> {activity.suggestions.join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <img 
                            src={activity.image} 
                            alt={activity.activity}
                            className="w-full h-32 rounded-lg object-cover mb-2"
                          />
                          {activity.playlist && (
                            <div className="bg-green-100 rounded p-2">
                              <span className="text-sm">🎵 {activity.playlist}</span>
                            </div>
                          )}
                          {activity.flightInfo && (
                            <div className="bg-blue-100 rounded p-2">
                              <span className="text-sm">✈️ {activity.flightInfo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No activities planned for today yet.</p>
              <Button 
                onClick={() => setShowAddActivity(true)}
                className="mt-4"
              >
                Add Your First Activity
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Accommodation Info */}
      {currentDayData.accommodation && (
        <div className="container mx-auto px-4 pb-8">
          <h3 className="text-xl font-semibold mb-3">🏨 Tonight's Stay</h3>
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row items-center">
              <img 
                src={currentDayData.accommodation.image} 
                alt={currentDayData.accommodation.name}
                className="w-full sm:w-24 h-48 sm:h-20 rounded mr-0 sm:mr-4 mb-4 sm:mb-0 object-cover" 
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{currentDayData.accommodation.name}</h4>
                {currentDayData.accommodation.address && (
                  <p className="text-gray-600 text-sm mb-1">{currentDayData.accommodation.address}</p>
                )}
                {currentDayData.accommodation.contact && (
                  <p className="text-blue-600 mb-1">📞 {currentDayData.accommodation.contact}</p>
                )}
                {currentDayData.accommodation.code && (
                  <p className="text-green-600 font-mono mb-1">🔑 {currentDayData.accommodation.code}</p>
                )}
                {currentDayData.accommodation.wifi && (
                  <p className="text-purple-600 mb-1">📶 WiFi: {currentDayData.accommodation.wifi}</p>
                )}
                {currentDayData.accommodation.parking && (
                  <p className="text-orange-600">🅿️ {currentDayData.accommodation.parking}</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Car Rental Details Banner for Day 1 */}
      {currentDay === 0 && (
        <div className="container mx-auto px-4 pb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Car className="h-5 w-5" /> Rental Car Details
          </h3>
          <Card className="p-4 border-t-4 border-blue-500">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Your Vehicle</h4>
                  <div className="text-gray-700">
                    <p><strong>Car:</strong> Volkswagen Jetta (or similar)</p>
                    <p><strong>Transmission:</strong> Automatic</p>
                    <p><strong>Mileage:</strong> Unlimited</p>
                    <p><strong>Total:</strong> $110.89 (Prepaid with Visa *4592)</p>
                    <p className="text-xs mt-2 text-green-600">Amazon.com Gift Card upon rental completion</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Pick-Up Location
                    </h4>
                    <p className="text-gray-700">Santa Maria Public Airport (SMX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 805-922-3113</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Return Location
                    </h4>
                    <p className="text-gray-700">Los Angeles International Airport (LAX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 310-642-4500</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Pick-Up: 10:00 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Return: 2:00 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Thursday, Jun 05, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Return Trip Car Rental Details for June 26 */}
      {currentDay === 4 && (
        <div className="container mx-auto px-4 pb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Car className="h-5 w-5" /> Return Trip Rental Car Details
          </h3>
          <Card className="p-4 border-t-4 border-purple-500">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Your Vehicle</h4>
                  <div className="text-gray-700">
                    <p><strong>Car:</strong> Toyota Corolla (or similar)</p>
                    <p><strong>Transmission:</strong> Automatic</p>
                    <p><strong>Mileage:</strong> Unlimited</p>
                    <p><strong>Total:</strong> $89.98 (Confirmation #23786281US1)</p>
                    <p className="text-xs mt-2 text-green-600">Amazon.com Gift Card upon rental completion</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Pick-Up Location
                    </h4>
                    <p className="text-gray-700">Los Angeles International Airport (LAX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 310-642-4500</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Return Location
                    </h4>
                    <p className="text-gray-700">Santa Maria Public Airport (SMX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 805-922-3113</p>
                    <p className="text-gray-700 text-sm text-amber-600">After-hours key-drop box available</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Pick-Up: 1:30 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Return: 11:30 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Thursday, Jun 26, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Add Activity Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setShowAddActivity(!showAddActivity)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:scale-105 p-0"
        >
          {showAddActivity ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
};
