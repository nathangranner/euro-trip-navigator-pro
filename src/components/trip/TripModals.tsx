
import React from "react";
import { TripDay, Activity } from "@/types/trip";
import { EditDayModal } from "@/components/EditDayModal";
import { EditActivityModal } from "@/components/EditActivityModal";

interface TripModalsProps {
  editingDay: TripDay | null;
  editingActivity: { activity: Activity; dayId: string } | null;
  onSaveDay: (updatedDay: TripDay) => void;
  onSaveActivity: (updatedActivity: Activity, dayId: string) => void;
  onCloseDay: () => void;
  onCloseActivity: () => void;
}

export const TripModals: React.FC<TripModalsProps> = ({
  editingDay,
  editingActivity,
  onSaveDay,
  onSaveActivity,
  onCloseDay,
  onCloseActivity,
}) => {
  return (
    <>
      {editingDay && (
        <EditDayModal
          isOpen={true}
          day={editingDay}
          onSave={onSaveDay}
          onClose={onCloseDay}
        />
      )}

      {editingActivity && (
        <EditActivityModal
          isOpen={true}
          activity={editingActivity.activity}
          dayId={editingActivity.dayId}
          onSave={(updatedActivity) => onSaveActivity(updatedActivity, editingActivity.dayId)}
          onClose={onCloseActivity}
        />
      )}
    </>
  );
};
