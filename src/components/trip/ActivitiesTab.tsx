
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Edit, Camera, CalendarDays, Plus, Trash2 } from "lucide-react";
import { TripDay, Activity } from "@/types/trip";
import { formatDisplayDate, parseLocalDate } from "@/utils/dateUtils";
import { format } from "date-fns";
import { CreateActivityModal } from "@/components/CreateActivityModal";
import { useImageUpload } from "@/hooks/useImageUpload";
import { supabase } from "@/integrations/supabase/client";

interface ActivitiesTabProps {
  tripDays: TripDay[];
  onEditActivity?: (activity: Activity, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
  onCreateActivity?: (newActivity: Omit<Activity, 'id'>, dayId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  tripDays,
  onEditActivity,
  onDeleteActivity,
  onCreateActivity
}) => {
  const [activityImages, setActivityImages] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<'original' | 'scheduled'>('scheduled');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { uploadImage, saveImageToDatabase, uploading } = useImageUpload();

  // Get all activities from all days with enhanced info
  const allActivities = tripDays.flatMap(day => 
    (day.activities || []).map(activity => ({
      ...activity,
      dayInfo: {
        dayNumber: day.dayNumber,
        date: day.date,
        city: day.city,
        dayId: day.id
      },
      actualDate: activity.scheduledDate || day.date,
      isRescheduled: activity.wasRescheduled === true,
      isCustomScheduled: !!activity.scheduledDate && activity.scheduledDate !== day.date && !activity.wasRescheduled
    }))
  );

  // Load existing images for activities
  useEffect(() => {
    const loadActivityImages = async () => {
      if (allActivities.length === 0) return;

      try {
        const activityIds = allActivities.map(activity => activity.id);
        const { data: images, error } = await supabase
          .from('trip_images')
          .select('*')
          .in('activity_id', activityIds)
          .eq('image_type', 'photo');

        if (error) {
          console.error('Error loading activity images:', error);
          return;
        }

        const imageMap: Record<string, string> = {};
        images?.forEach(img => {
          if (img.activity_id) {
            imageMap[img.activity_id] = img.image_url;
          }
        });
        setActivityImages(imageMap);
      } catch (error) {
        console.error('Error loading activity images:', error);
      }
    };

    loadActivityImages();
  }, [allActivities.length]);

  // Sort activities based on selected sorting method
  const sortedActivities = [...allActivities].sort((a, b) => {
    if (sortBy === 'scheduled') {
      return new Date(a.actualDate).getTime() - new Date(b.actualDate).getTime();
    } else {
      return a.dayInfo.dayNumber - b.dayInfo.dayNumber;
    }
  });

  const handleImageUpload = async (activityId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file, 'activities');
      if (imageUrl) {
        // Save to database
        await saveImageToDatabase(imageUrl, 'photo', undefined, undefined, activityId);
        
        // Update local state to show the image immediately
        setActivityImages(prev => ({
          ...prev,
          [activityId]: imageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading activity image:', error);
    }
  };

  const handleCreateActivity = (newActivity: Omit<Activity, 'id'>, dayId: string) => {
    if (onCreateActivity) {
      onCreateActivity(newActivity, dayId);
    }
  };

  const handleDeleteClick = (activityId: string, dayId: string) => {
    if (onDeleteActivity && confirm('Are you sure you want to delete this activity?')) {
      onDeleteActivity(activityId, dayId);
    }
  };

  const getDateDisplayInfo = (activity: any) => {
    if (activity.isRescheduled) {
      return {
        displayDate: formatDisplayDate(activity.actualDate),
        originalDate: formatDisplayDate(activity.dayInfo.date),
        isCustom: true,
        badgeText: 'Rescheduled'
      };
    } else if (activity.isCustomScheduled) {
      return {
        displayDate: formatDisplayDate(activity.actualDate),
        originalDate: null,
        isCustom: true,
        badgeText: 'Scheduled'
      };
    }
    return {
      displayDate: `Day ${activity.dayInfo.dayNumber} - ${formatDisplayDate(activity.dayInfo.date)}`,
      originalDate: null,
      isCustom: false,
      badgeText: null
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl font-bold text-slate-700">Activities & Attractions</h2>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
            variant="gold"
          >
            <Plus className="h-4 w-4" />
            Add Activity
          </Button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'original' | 'scheduled')}
              className="text-sm border border-gold-300 bg-gradient-to-r from-gold-50 to-gold-100 rounded px-2 py-1 text-slate-700"
            >
              <option value="scheduled">Scheduled Date</option>
              <option value="original">Original Day</option>
            </select>
          </div>
          <Badge variant="secondary" className="text-sm">
            {allActivities.length} activities
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedActivities.map((activity, index) => {
          const dateInfo = getDateDisplayInfo(activity);
          return (
            <Card key={`${activity.dayInfo.dayId}-${activity.id}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow border-gold-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-slate-700 mb-2">
                      {activity.activity}
                    </CardTitle>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {dateInfo.displayDate}
                      </div>
                      {dateInfo.isCustom && (
                        <div className="flex items-center text-xs text-amber-700">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {activity.isRescheduled 
                            ? `Rescheduled from Day ${activity.dayInfo.dayNumber}`
                            : `Originally Day ${activity.dayInfo.dayNumber}`
                          }
                        </div>
                      )}
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
                  <div className="flex gap-1 ml-2">
                    {onEditActivity && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditActivity(activity, activity.dayInfo.dayId)}
                        className="text-slate-600 hover:text-slate-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDeleteActivity && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(activity.id, activity.dayInfo.dayId)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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
                      <label className="absolute top-2 right-2 bg-gold-100/90 hover:bg-gold-200/90 p-1 rounded-full cursor-pointer transition-colors border border-gold-300">
                        <Camera className="h-4 w-4 text-slate-600" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(activity.id, e)}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className={`w-full h-32 border-2 border-dashed border-gold-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gold-400 transition-colors bg-gradient-to-br from-gold-50 to-gold-100 ${uploading ? 'opacity-50' : ''}`}>
                      <Camera className="h-6 w-6 text-gold-500 mb-2" />
                      <span className="text-sm text-slate-600">
                        {uploading ? 'Uploading...' : 'Add photo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(activity.id, e)}
                        className="hidden"
                        disabled={uploading}
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
                  <div className="flex flex-wrap gap-1">
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
                    {dateInfo.badgeText && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          dateInfo.badgeText === 'Rescheduled' 
                            ? 'border-amber-400 text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100' 
                            : 'border-blue-400 text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100'
                        }`}
                      >
                        {dateInfo.badgeText}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-500 text-lg mb-2">No activities planned yet</div>
          <p className="text-slate-600 mb-4">Activities will appear here as you add them to your itinerary</p>
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 mx-auto" variant="gold">
            <Plus className="h-4 w-4" />
            Add Your First Activity
          </Button>
        </div>
      )}

      <CreateActivityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateActivity}
        defaultType="activity"
      />
    </div>
  );
};
