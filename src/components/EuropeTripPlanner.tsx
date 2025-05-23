import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Euro, Users, Plane, Train, Car, Building, Utensils, Camera, ShoppingBag } from "lucide-react";
import { ExpenseTracker } from './ExpenseTracker';
import { PurchaseTracker } from './PurchaseTracker';
import { TranslationTool } from './TranslationTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditDayModal } from './EditDayModal';
import { EditActivityModal } from './EditActivityModal';
import { TripBanner } from './trip/TripBanner';
import { CityBanner } from './trip/CityBanner';
import { ItineraryTab } from './trip/ItineraryTab';
import { AccommodationsTab } from './trip/AccommodationsTab';
import { ExpensesTab } from './trip/ExpensesTab';
import { PurchasesTab } from './trip/PurchasesTab';
import { CityViewTab } from './trip/CityViewTab';
import { TravelBuddySection } from './trip/TravelBuddySection';
import { useTripCalculations } from '@/hooks/useTripCalculations';
import { loadStoredData, saveTripDays } from '@/utils/storageUtils';
import { tripData as initialTripData, TripDay, Activity } from '@/data/tripData';

export const EuropeTripPlanner: React.FC = () => {
  
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [editingDay, setEditingDay] = useState<TripDay | null>(null);
  const [editingActivity, setEditingActivity] = useState<{ activity: Activity; dayId: string } | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("itinerary");

  const { totalBudget, totalExpenses, remainingBudget, totalDays, completedDays } = useTripCalculations(tripDays);

  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData.tripDays && storedData.tripDays.length > 0) {
      setTripDays(storedData.tripDays);
    } else {
      setTripDays(initialTripData);
    }
  }, []);

  const updateTripDays = (newTripDays: TripDay[]) => {
    setTripDays(newTripDays);
    saveTripDays(newTripDays);
  };

  const handleEditDay = (day: TripDay) => {
    setEditingDay(day);
  };

  const handleSaveDay = (updatedDay: TripDay) => {
    const updatedTripDays = tripDays.map(day => 
      day.id === updatedDay.id ? updatedDay : day
    );
    updateTripDays(updatedTripDays);
    setEditingDay(null);
  };

  const handleEditActivity = (activity: Activity, dayId: string) => {
    setEditingActivity({ activity, dayId });
  };

  const handleSaveActivity = (updatedActivity: Activity, dayId: string) => {
    const updatedTripDays = tripDays.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.map(activity => 
            activity.id === updatedActivity.id ? updatedActivity : activity
          )
        };
      }
      return day;
    });
    updateTripDays(updatedTripDays);
    setEditingActivity(null);
  };

  const citiesWithDays = tripDays.reduce((acc, day) => {
    if (!acc[day.city]) {
      acc[day.city] = [];
    }
    acc[day.city].push(day);
    return acc;
  }, {} as Record<string, TripDay[]>);

  const uniqueCities = Object.keys(citiesWithDays);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value !== "city-view") {
      setSelectedCity(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <TripBanner 
          totalBudget={totalBudget}
          totalExpenses={totalExpenses}
          remainingBudget={remainingBudget}
          totalDays={totalDays}
          completedDays={completedDays}
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="accommodations">Hotels</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="city-view">City View</TabsTrigger>
            <TabsTrigger value="translation">Translation</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary">
            <ItineraryTab 
              tripDays={tripDays}
              onEditDay={handleEditDay}
              onEditActivity={handleEditActivity}
            />
          </TabsContent>

          <TabsContent value="accommodations">
            <AccommodationsTab tripDays={tripDays} />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpensesTab tripDays={tripDays} />
          </TabsContent>

          <TabsContent value="purchases">
            <PurchasesTab tripDays={tripDays} />
          </TabsContent>

          <TabsContent value="city-view">
            <CityViewTab 
              uniqueCities={uniqueCities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              citiesWithDays={citiesWithDays}
            />
          </TabsContent>

          <TabsContent value="translation">
            <div className="space-y-6">
              <TranslationTool />
              <TravelBuddySection />
            </div>
          </TabsContent>
        </Tabs>

        {editingDay && (
          <EditDayModal
            day={editingDay}
            onClose={() => setEditingDay(null)}
            onSave={handleSaveDay}
          />
        )}

        {editingActivity && (
          <EditActivityModal
            activity={editingActivity.activity}
            dayId={editingActivity.dayId}
            onClose={() => setEditingActivity(null)}
            onSave={handleSaveActivity}
          />
        )}
      </div>
    </div>
  );
};
