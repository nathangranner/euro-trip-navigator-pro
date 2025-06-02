
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
import { TripModals } from "@/components/trip/TripModals";
import { useTripCalculations } from "@/hooks/useTripCalculations";
import { useTrips } from "@/hooks/useTrips";
import { useTripData } from "@/hooks/useTripData";
import { convertDatabaseTripDayToTripDay } from "@/utils/typeConverters";
import { useTripState } from "@/hooks/useTripState";
import { TripDay, Activity } from "@/types/trip";
import { TravelReferenceSection } from "@/components/trip/TravelReferenceSection";

const TripSummary: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  
  const { trips, loading } = useTrips();
  const selectedTrip = trips[0]; // Use first trip for summary
  const { tripDays } = useTripData(selectedTrip?.id || null);
  
  // Use the trip state hook for editing functionality
  const {
    tripDays: editableTripDays,
    editingDay,
    editingActivity,
    handleEditDay,
    handleSaveDay,
    handleEditActivity,
    handleSaveActivity,
    setEditingDay,
    setEditingActivity
  } = useTripState();
  
  // Convert database trip days to legacy format for components that need it
  const legacyTripDays = tripDays.map(convertDatabaseTripDayToTripDay);
  
  // Use editable trip days if available, otherwise fall back to converted legacy days
  const displayTripDays = editableTripDays.length > 0 ? editableTripDays : legacyTripDays;
  
  const {
    totalExpenses,
    totalPurchases
  } = useTripCalculations(displayTripDays);

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
  const handleViewMap = (day: TripDay) => {
    const address = day.accommodationAddress || day.accommodation?.address;
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
      <div className="container bg-blue-600 mx-0 my-0 py-4 sm:py-[27px] rounded font-futura">
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Loading trip data...</p>
        </div>
      </div>
    );
  }

  if (!selectedTrip && displayTripDays.length === 0) {
    return (
      <div className="container bg-blue-600 mx-0 my-0 py-4 sm:py-[27px] rounded font-futura">
        <div className="flex justify-center items-center h-64">
          <div className="text-center px-4">
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
    <div className="container bg-blue-600 mx-0 my-0 py-4 sm:py-[27px] rounded font-futura">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 px-3 sm:px-0 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-white bg-yellow-600 px-2 py-1 rounded">
          {selectedTrip?.name || "Europe Trip 2025"}
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button 
            onClick={() => navigate("/planner")} 
            className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 font-light text-sm w-full sm:w-auto"
          >
            <Calendar className="h-4 w-4" />
            Trip Planner
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            variant="outline" 
            className="flex items-center justify-center gap-2 border-blue-300 text-white hover:bg-blue-700 font-light text-sm w-full sm:w-auto"
          >
            <Compass className="h-4 w-4" />
            Home
          </Button>
        </div>
      </div>

      <div className="px-3 sm:px-0">
        <TripBanner bannerImage={bannerImage} onBannerChange={handleBannerChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <TripDurationCard 
            daysCount={displayTripDays.length} 
            startDate={selectedTrip?.start_date || "2025-06-15"} 
            endDate={selectedTrip?.end_date || "2025-07-15"} 
          />
          <TripCompletionCard tripDays={displayTripDays} />
          <ExpenseDisplay totals={totalExpenses} title="Total Expenses" />
          <ExpenseDisplay totals={totalPurchases} title="Customs Declarations" />
        </div>

        <Tabs defaultValue="itinerary" className="mb-6 sm:mb-8" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-gradient-to-r from-blue-800 to-blue-900 p-1 w-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="itinerary" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide text-xs sm:text-sm whitespace-nowrap">Day by Day</TabsTrigger>
            <TabsTrigger value="cityview" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide text-xs sm:text-sm whitespace-nowrap">City View</TabsTrigger>
            <TabsTrigger value="accommodations" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide text-xs sm:text-sm whitespace-nowrap">Hotels</TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide text-xs sm:text-sm whitespace-nowrap">Expenses</TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide text-xs sm:text-sm whitespace-nowrap">Purchases</TabsTrigger>
            <TabsTrigger value="reference" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white font-light tracking-wide text-xs sm:text-sm whitespace-nowrap">Reference</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <TabsContent value="itinerary">
              <ItineraryContainer 
                tripDays={displayTripDays} 
                onEditDay={handleEditDay}
                onEditActivity={handleEditActivity}
                onViewMap={handleViewMap}
              />
            </TabsContent>
            
            <TabsContent value="cityview">
              <CityViewTab tripDays={displayTripDays} onViewMap={handleViewMap} />
            </TabsContent>
            
            <TabsContent value="accommodations">
              <AccommodationsTab tripDays={displayTripDays} onViewMap={handleViewMap} onEditLocation={handleEditLocation} />
            </TabsContent>
            
            <TabsContent value="expenses">
              <ExpensesTab expensesByDay={{}} tripDays={displayTripDays} />
            </TabsContent>
            
            <TabsContent value="purchases">
              <PurchasesTab purchasesByDay={{}} tripDays={displayTripDays} />
            </TabsContent>
            
            <TabsContent value="reference">
              <TravelReferenceSection />
            </TabsContent>
          </div>
        </Tabs>
        
        <TravelBuddySection />
      </div>

      {/* Edit Modals */}
      <TripModals
        editingDay={editingDay}
        editingActivity={editingActivity}
        onSaveDay={handleSaveDay}
        onSaveActivity={handleSaveActivity}
        onCloseDay={() => setEditingDay(null)}
        onCloseActivity={() => setEditingActivity(null)}
      />
    </div>
  );
};

export default TripSummary;
