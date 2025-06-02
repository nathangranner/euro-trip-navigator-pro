import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Clock, MapPin, Phone, Trash2 } from "lucide-react";
import { DatabaseActivity } from "@/hooks/useTripData";
interface ActivitiesSectionProps {
  activities?: DatabaseActivity[];
  tripDayId: string;
  onEditActivity?: (activity: any, dayId: string) => void;
  onDeleteActivity?: (activityId: string, dayId: string) => void;
}
export default function ActivitiesSection({
  activities,
  tripDayId,
  onEditActivity,
  onDeleteActivity
}: ActivitiesSectionProps) {
  const handleDeleteClick = (activityId: string) => {
    if (onDeleteActivity && confirm('Are you sure you want to delete this activity?')) {
      onDeleteActivity(activityId, tripDayId);
    }
  };
  if (!activities || activities.length === 0) {
    return <div className="mb-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Activities
        </h4>
        <p className="text-sm text-gray-500">No activities planned for this day.</p>
      </div>;
  }
  return <div className="mb-4">
      <h4 className="font-medium mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Activities ({activities.length})
      </h4>
      <div className="space-y-3">
        {activities.map((activity, activityIdx) => <div key={`activity-${activity.id}-${activityIdx}`} className="flex justify-between items-start group border rounded-lg p-3 hover:bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-[#084e6e]/65">
                <span className="font-medium text-sm">{activity.time}</span>
                <span className="text-sm font-medium">{activity.activity}</span>
                {activity.completed && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Completed
                  </span>}
              </div>
              {activity.location && <p className="text-sm flex items-center gap-1 mt-1 text-gray-200">
                  <MapPin className="h-3 w-3" />
                  {activity.location}
                </p>}
              {activity.notes && <p className="text-sm mt-1 text-orange-400">{activity.notes}</p>}
              {activity.duration && <p className="text-xs text-gray-500 mt-1">Duration: {activity.duration}</p>}
              {activity.booking_required && <p className="text-xs text-orange-600 mt-1">⚠️ Booking required</p>}
              {activity.contact_info && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {activity.contact_info}
                </p>}
            </div>
            <div className="flex gap-1 ml-2">
              {onEditActivity && <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onEditActivity(activity, tripDayId)}>
                  <Edit className="h-3 w-3" />
                </Button>}
              {onDeleteActivity && <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(activity.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3" />
                </Button>}
            </div>
          </div>)}
      </div>
    </div>;
}