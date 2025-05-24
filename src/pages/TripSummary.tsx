
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { europeTrip } from "@/data/europeTrip";
import { loadStoredData } from "@/utils/storageUtils";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";
import { Calendar, Compass } from "lucide-react";
import { convertTripDayToDatabaseTripDay } from "@/utils/typeConverters";

// Import components
import { TripDurationCard } from "@/components/trip/TripDurationCard";
import { TripCompletionCard } from "@/components/trip/TripCompletionStats";
import { ExpenseDisplay } from "@/components/trip/ExpenseDisplay";
import { ItineraryTab } from "@/components/trip/ItineraryTab";
import { CityViewTab } from "@/components/trip/CityViewTab";
import { AccommodationsTab } from "@/components/trip/AccommodationsTab";
import { ExpensesTab } from "@/components/trip/ExpensesTab";
import { PurchasesTab } from "@/components/trip/PurchasesTab";
import { TravelBuddySection } from "@/components/trip/TravelBuddySection";
import { TripBanner } from "@/components/trip/TripBanner";
import { useTripCalculations } from "@/hooks/useTripCalculations";

const TripSummary: React.FC = () => {
  const navigate = useNavigate();
  const [tripDays, setTripDays] = useState(europeTrip.days);
  const [activeTab, setActiveTab] = useState("itinerary");
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  
  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData.tripDays && storedData.tripDays.length > 0) {
      setTripDays(storedData.tripDays);
    } else {
      setTripDays(europeTrip.days);
    }

    // Load banner image
    const savedBanner = loadBannerImage();
    if (savedBanner) {
      setBannerImage(savedBanner);
    }
  }, []);
  
  const {
    totalExpenses,
    totalPurchases
  } = useTripCalculations(tripDays);

  // Handle banner image change
  const handleBannerChange = (newBannerUrl: string) => {
    setBannerImage(newBannerUrl);
    saveBannerImage(newBannerUrl);
  };

  // Handle view accommodation on map
  const handleViewMap = (day: any) => {
    if (day.accommodation && day.accommodation.address) {
      // Open Google Maps with the address
      const address = encodeURIComponent(day.accommodation.address);
      window.open(`https://www.google.com/maps?q=${address}`, '_blank');
    }
  };

  // Navigate to dashboard for location editing
  const handleEditLocation = (dayIndex: number) => {
    navigate(`/planner?day=${dayIndex}`);
  };

  // Convert TripDay[] to format expected by database components
  const convertedTripDays = tripDays.map((day, index) => ({
    id: day.id,
    trip_id: 'temp-trip-id', // This would come from actual trip selection
    day_number: day.dayNumber,
    date: day.date,
    city: day.city,
    country: day.country,
    title: day.title,
    description: day.description,
    accommodation_name: day.accommodationName || day.accommodation?.name,
    accommodation_address: day.accommodationAddress || day.accommodation?.address,
    accommodation_checkin: day.accommodationCheckIn || day.accommodation?.checkin,
    accommodation_checkout: day.accommodationCheckOut || day.accommodation?.checkout,
    accommodation_confirmation: day.accommodationConfirmation || day.accommodation?.confirmationNumber,
    accommodation_contact: day.accommodationContact || day.accommodation?.contactPhone,
    weather_temp: day.weather?.temp,
    weather_condition: day.weather?.condition,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    activities: day.activities?.map(activity => ({
      id: activity.id,
      trip_day_id: day.id,
      time: activity.time,
      activity: activity.activity,
      type: activity.type,
      location: activity.location,
      notes: activity.note,
      duration: activity.duration,
      completed: activity.completed,
      booking_required: activity.booked || false,
      contact_info: activity.contactInfo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })) || []
  }));

  return (
    <div className="container bg-blue-600 mx-0 my-0 py-[27px] rounded font-futura">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light tracking-wide text-white bg-yellow-600">Trip Summary</h1>
        <div className="flex space-x-2">
          <Button onClick={() => navigate("/planner")} className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 font-light">
            <Calendar className="h-4 w-4" />
            Trip Planner
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" className="flex items-center gap-2 border-blue-300 text-white hover:bg-blue-700 font-light">
            <Compass className="h-4 w-4" />
            Home
          </Button>
        </div>
      </div>

      {/* Banner Image Section */}
      <TripBanner bannerImage={bannerImage} onBannerChange={handleBannerChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <TripDurationCard daysCount={tripDays.length} startDate={europeTrip.startDate} endDate={europeTrip.endDate} />
        <TripCompletionCard tripDays={tripDays} />
        <ExpenseDisplay totals={totalExpenses} title="Total Expenses" />
        <ExpenseDisplay totals={totalPurchases} title="Customs Declarations" />
      </div>

      <Tabs defaultValue="itinerary" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-gradient-to-r from-blue-800 to-blue-900 p-1">
          <TabsTrigger value="itinerary" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide">Day by Day</TabsTrigger>
          <TabsTrigger value="cityview" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide">City View</TabsTrigger>
          <TabsTrigger value="accommodations" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide">Accommodations</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide">Expenses</TabsTrigger>
          <TabsTrigger value="purchases" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide">Purchases</TabsTrigger>
        </TabsList>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ItineraryTab tripDays={convertedTripDays} onEditDay={() => {}} onEditActivity={() => {}} />
          
          <CityViewTab tripDays={tripDays} onViewMap={handleViewMap} />
          
          <AccommodationsTab tripDays={tripDays} onViewMap={handleViewMap} onEditLocation={handleEditLocation} />
          
          <ExpensesTab expensesByDay={{}} tripDays={tripDays} />
          
          <PurchasesTab purchasesByDay={{}} tripDays={tripDays} />
        </div>
      </Tabs>
      
      <TravelBuddySection />
    </div>
  );
};

export default TripSummary;
