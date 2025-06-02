
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Edit, Camera, Utensils } from "lucide-react";
import { TripDay, Activity } from "@/types/trip";
import { formatDisplayDate } from "@/utils/dateUtils";

interface DiningTabProps {
  tripDays: TripDay[];
  onEditActivity?: (activity: Activity, dayId: string) => void;
}

export const DiningTab: React.FC<DiningTabProps> = ({
  tripDays,
  onEditActivity
}) => {
  const [diningImages, setDiningImages] = useState<Record<string, string>>({});

  // Get all dining activities from all days
  const diningActivities = tripDays.flatMap(day => 
    (day.activities || [])
      .filter(activity => 
        activity.type === 'dining' || 
        activity.activity.toLowerCase().includes('lunch') ||
        activity.activity.toLowerCase().includes('dinner') ||
        activity.activity.toLowerCase().includes('breakfast') ||
        activity.activity.toLowerCase().includes('café') ||
        activity.activity.toLowerCase().includes('restaurant')
      )
      .map(activity => ({
        ...activity,
        dayInfo: {
          dayNumber: day.dayNumber,
          date: day.date,
          city: day.city,
          dayId: day.id
        }
      }))
  );

  const handleImageUpload = (activityId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDiningImages(prev => ({
        ...prev,
        [activityId]: imageUrl
      }));
      // In a real app, you'd upload to your storage service here
    }
  };

  const getDiningType = (activity: Activity): string => {
    const activityLower = activity.activity.toLowerCase();
    if (activityLower.includes('breakfast')) return 'Breakfast';
    if (activityLower.includes('lunch')) return 'Lunch';
    if (activityLower.includes('dinner')) return 'Dinner';
    if (activityLower.includes('café') || activityLower.includes('coffee')) return 'Café';
    return 'Dining';
  };

  const getDiningTypeColor = (type: string): string => {
    switch (type) {
      case 'Breakfast': return 'bg-yellow-100 text-yellow-800';
      case 'Lunch': return 'bg-blue-100 text-blue-800';
      case 'Dinner': return 'bg-purple-100 text-purple-800';
      case 'Café': return 'bg-amber-100 text-amber-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <Utensils className="h-6 w-6 mr-2" />
          Dining Experiences
        </h2>
        <Badge variant="secondary" className="text-sm">
          {diningActivities.length} dining experiences
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diningActivities.map((activity, index) => {
          const diningType = getDiningType(activity);
          return (
            <Card key={`${activity.dayInfo.dayId}-${activity.id}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg text-slate-800">
                        {activity.activity}
                      </CardTitle>
                      <Badge className={`text-xs ${getDiningTypeColor(diningType)}`}>
                        {diningType}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Day {activity.dayInfo.dayNumber} - {formatDisplayDate(activity.dayInfo.date)}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {activity.location || activity.dayInfo.city}
                      </div>
                      {activity.time && (
                        <div className="flex items-center text-sm text-slate-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {activity.time}
                        </div>
                      )}
                    </div>
                  </div>
                  {onEditActivity && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditActivity(activity, activity.dayInfo.dayId)}
                      className="ml-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Image section */}
                <div className="mb-3">
                  {diningImages[activity.id] ? (
                    <div className="relative">
                      <img
                        src={diningImages[activity.id]}
                        alt={activity.activity}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <label className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full cursor-pointer transition-colors">
                        <Camera className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(activity.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition-colors bg-slate-50">
                      <Camera className="h-6 w-6 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-500">Add food photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(activity.id, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Dining details */}
                <div className="space-y-2">
                  {activity.duration && (
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Duration:</span> {activity.duration}
                    </p>
                  )}
                  {activity.note && (
                    <p className="text-sm text-slate-700">{activity.note}</p>
                  )}
                  {activity.tip && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-2">
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Tip:</span> {activity.tip}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {activity.booked && (
                      <Badge variant="default" className="text-xs">
                        Reserved
                      </Badge>
                    )}
                    {activity.mustTry && (
                      <Badge variant="destructive" className="text-xs">
                        Must Try!
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {diningActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg mb-2">No dining experiences planned yet</div>
          <p className="text-slate-500">Dining experiences will appear here as you add them to your itinerary</p>
        </div>
      )}
    </div>
  );
};
