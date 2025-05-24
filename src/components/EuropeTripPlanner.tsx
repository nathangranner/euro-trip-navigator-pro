
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripDay } from "@/types/trip";
import { useTripState } from "@/hooks/useTripState";
import { EditDayModal } from "./EditDayModal";
import { EditActivityModal } from "./EditActivityModal";
import { ExpenseTracker } from "./ExpenseTracker";
import { PurchaseTracker } from "./PurchaseTracker";
import { TripBanner } from "./trip/TripBanner";
import { loadBannerImage, saveBannerImage } from "@/utils/bannerUtils";

export const EuropeTripPlanner: React.FC = () => {
  const {
    tripDays,
    editingDay,
    editingActivity,
    handleEditDay,
    handleSaveDay,
    handleEditActivity,
    handleSaveActivity,
    setEditingDay,
    setEditingActivity
  } = useTripState();

  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    // Load banner image
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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Planned":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Banner Section */}
      <TripBanner bannerImage={bannerImage} onBannerChange={handleBannerChange} />

      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="itinerary" className="font-futura text-lg tracking-wide uppercase">Itinerary</TabsTrigger>
          <TabsTrigger value="hotels" className="font-futura text-lg tracking-wide uppercase">Hotels</TabsTrigger>
          <TabsTrigger value="expenses" className="font-futura text-lg tracking-wide uppercase">Expenses</TabsTrigger>
          <TabsTrigger value="purchases" className="font-futura text-lg tracking-wide uppercase">Purchases</TabsTrigger>
          <TabsTrigger value="cityview" className="font-futura text-lg tracking-wide uppercase">City View</TabsTrigger>
          <TabsTrigger value="translation" className="font-futura text-lg tracking-wide uppercase">Translation</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="space-y-4">
          <div className="grid gap-4">
            {tripDays.map((day) => (
              <Card key={day.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-futura tracking-wide">
                        Day {day.dayNumber}: {day.city}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{day.title}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusBadgeColor(day.status || "Planned")}>
                        {day.status || "Planned"}
                      </Badge>
                      <button
                        onClick={() => handleEditDay(day)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit Day
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {day.activities && day.activities.length > 0 ? (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Activities</h4>
                        <div className="space-y-2">
                          {day.activities.map((activity, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span>{activity.activity}</span>
                              <button
                                onClick={() => handleEditActivity(activity, day.id)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Edit
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No activities planned yet</p>
                    )}
                    
                    {(day.accommodation || day.accommodationName) && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Accommodation</h4>
                        <p className="text-gray-700">{day.accommodation?.name || day.accommodationName}</p>
                        {(day.accommodation?.address || day.accommodationAddress) && (
                          <p className="text-gray-600 text-sm">{day.accommodation?.address || day.accommodationAddress}</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hotels">
          <Card>
            <CardHeader>
              <CardTitle>Hotel Accommodations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripDays.filter(day => day.accommodation || day.accommodationName).map((day) => (
                  <div key={day.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">Day {day.dayNumber}: {day.city}</h3>
                    <p className="text-lg">{day.accommodation?.name || day.accommodationName}</p>
                    {(day.accommodation?.address || day.accommodationAddress) && (
                      <p className="text-gray-600">{day.accommodation?.address || day.accommodationAddress}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseTracker />
        </TabsContent>

        <TabsContent value="purchases">
          <PurchaseTracker />
        </TabsContent>

        <TabsContent value="cityview">
          <Card>
            <CardHeader>
              <CardTitle>Cities Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Array.from(new Set(tripDays.map(day => day.city))).map((city) => {
                  const cityDays = tripDays.filter(day => day.city === city);
                  return (
                    <div key={city} className="border rounded-lg p-4">
                      <h3 className="text-xl font-medium mb-2">{city}</h3>
                      <p className="text-gray-600 mb-2">{cityDays.length} day{cityDays.length > 1 ? 's' : ''}</p>
                      <div className="space-y-1">
                        {cityDays.map(day => (
                          <p key={day.id} className="text-sm">Day {day.dayNumber}: {day.title}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translation">
          <Card>
            <CardHeader>
              <CardTitle>Translation Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Translation features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {editingDay && (
        <EditDayModal
          day={editingDay}
          onSave={handleSaveDay}
          onCancel={() => setEditingDay(null)}
        />
      )}

      {editingActivity && (
        <EditActivityModal
          activity={editingActivity.activity}
          dayId={editingActivity.dayId}
          onSave={handleSaveActivity}
          onCancel={() => setEditingActivity(null)}
        />
      )}
    </div>
  );
};
