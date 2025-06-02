
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Edit, Camera } from "lucide-react";
import { TripDay, Activity } from "@/types/trip";
import { formatDisplayDate } from "@/utils/dateUtils";

interface ActivitiesTabProps {
  tripDays: TripDay[];
  onEditActivity?: (activity: Activity, dayId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  tripDays,
  onEditActivity
}) => {
  const [activityImages, setActivityImages] = useState<Record<string, string>>({});

  // Get all activities from all days
  const allActivities = tripDays.flatMap(day => 
    (day.activities || []).map(activity => ({
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
      setActivityImages(prev => ({
        ...prev,
        [activityId]: imageUrl
      }));
      // In a real app, you'd upload to your storage service here
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Activities & Attractions</h2>
        <Badge variant="secondary" className="text-sm">
          {allActivities.length} activities
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allActivities.map((activity, index) => (
          <Card key={`${activity.dayInfo.dayId}-${activity.id}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-slate-800 mb-2">
                    {activity.activity}
                  </CardTitle>
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
                {activityImages[activity.id] ? (
                  <div className="relative">
                    <img
                      src={activityImages[activity.id]}
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
                    <span className="text-sm text-slate-500">Add photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(activity.id, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Activity details */}
              <div className="space-y-2">
                {activity.duration && (
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Duration:</span> {activity.duration}
                  </p>
                )}
                {activity.note && (
                  <p className="text-sm text-slate-700">{activity.note}</p>
                )}
                {activity.booked && (
                  <Badge variant="default" className="text-xs">
                    Booked
                  </Badge>
                )}
                {activity.mustTry && (
                  <Badge variant="destructive" className="text-xs">
                    Must Do!
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg mb-2">No activities planned yet</div>
          <p className="text-slate-500">Activities will appear here as you add them to your itinerary</p>
        </div>
      )}
    </div>
  );
};
