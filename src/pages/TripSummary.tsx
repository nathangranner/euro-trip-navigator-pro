import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";
import { Calendar, Compass } from "lucide-react";

// Import components
import { TripDurationCard } from "@/components/trip/TripDurationCard";
import { TripCompletionCard } from "@/components/trip/TripCompletionStats";
import { ExpenseDisplay } from "@/components/trip/ExpenseDisplay";
import ItineraryContainer from "@/components/trip/ItineraryContainer";
import { CityViewTab } from "@/components/trip/CityViewTab";
import { AccommodationsTab } from "@/components/trip/AccommodationsTab";
import { ExpensesTab } from "@/components/trip/ExpensesTab";
import { PurchasesTab } from "@/components/trip/PurchasesTab";
import { TravelBuddySection } from "@/components/trip/TravelBuddySection";
import { TripBanner } from "@/components/trip/TripBanner";
import { useTripCalculations } from "@/hooks/useTripCalculations";
import { useTrips } from "@/hooks/useTrips";
import { useTripData } from "@/hooks/useTripData";
import { convertDatabaseTripDayToTripDay } from "@/utils/typeConverters";

const TripSummary: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  
  const { trips, loading } = useTrips();
  const selectedTrip = trips[0]; // Use first trip for summary
  const { tripDays } = useTripData(selectedTrip?.id || null);
  
  // Convert database trip days to legacy format for components that need it
  const legacyTripDays = tripDays.map(convertDatabaseTripDayToTripDay);
  
  const {
    totalExpenses,
    totalPurchases
  } = useTripCalculations(legacyTripDays);

  useEffect(() => {
    const savedBanner = loadBannerImage();
    if (savedBanner) {
      setBannerImage(savedBanner);
    }
  }, []);

  // Handle banner image change
  const handleBannerChange = (newBannerUrl: string) => {
    setBannerImage(newBannerUrl);
    saveBannerImage(newBannerUrl);
  };

  // Handle view accommodation on map
  const handleViewMap = (day: any) => {
    const address = day.accommodationAddress || day.accommodation_address || (day.accommodation && day.accommodation.address);
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  };

  // Navigate to dashboard for location editing
  const handleEditLocation = (dayIndex: number) => {
    navigate(`/planner?day=${dayIndex}`);
  };

  if (loading) {
    return (
      <div className="container bg-blue-600 mx-0 my-0 py-[27px] rounded font-futura">
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Loading trip data...</p>
        </div>
      </div>
    );
  }

  if (!selectedTrip || tripDays.length === 0) {
    return (
      <div className="container bg-blue-600 mx-0 my-0 py-[27px] rounded font-futura">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-white mb-4">No trip data available.</p>
            <Button onClick={() => navigate("/planner")} className="bg-blue-800 hover:bg-blue-900">
              Go to Planner
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-blue-600 mx-0 my-0 py-[27px] rounded font-futura">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light tracking-wide text-white bg-yellow-600">{selectedTrip.name}</h1>
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

      <TripBanner bannerImage={bannerImage} onBannerChange={handleBannerChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <TripDurationCard 
          daysCount={tripDays.length} 
          startDate={selectedTrip.start_date} 
          endDate={selectedTrip.end_date} 
        />
        <TripCompletionCard tripDays={legacyTripDays} />
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
          <TabsContent value="itinerary">
            <ItineraryContainer 
              tripDays={legacyTripDays} 
              onViewMap={handleViewMap}
            />
          </TabsContent>
          
          <TabsContent value="cityview">
            <CityViewTab tripDays={legacyTripDays} onViewMap={handleViewMap} />
          </TabsContent>
          
          <TabsContent value="accommodations">
            <AccommodationsTab tripDays={legacyTripDays} onViewMap={handleViewMap} onEditLocation={handleEditLocation} />
          </TabsContent>
          
          <TabsContent value="expenses">
            <ExpensesTab expensesByDay={{}} tripDays={legacyTripDays} />
          </TabsContent>
          
          <TabsContent value="purchases">
            <PurchasesTab purchasesByDay={{}} tripDays={legacyTripDays} />
          </TabsContent>
        </div>
      </Tabs>
      
      <TravelBuddySection />
    </div>
  );
};

export default TripSummary;
