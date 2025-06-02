
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Activity } from "@/types/trip";
import { parseLocalDate } from "@/utils/dateUtils";

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newActivity: Omit<Activity, 'id'>, dayId: string) => void;
  tripStartDate?: string;
  tripEndDate?: string;
  defaultType?: string;
}

export const CreateActivityModal: React.FC<CreateActivityModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  tripStartDate = "2025-06-05",
  tripEndDate = "2025-06-26",
  defaultType = "activity"
}) => {
  const [formData, setFormData] = useState({
    time: "09:00",
    activity: "",
    type: defaultType,
    location: "",
    note: "",
    duration: "",
    completed: false,
    booked: false,
    mustTry: false,
    icon: "📍"
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDayId, setSelectedDayId] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (!formData.activity.trim()) return;

    const newActivity: Omit<Activity, 'id'> = {
      ...formData,
      scheduledDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
    };

    onSave(newActivity, selectedDayId || "default");
    
    // Reset form
    setFormData({
      time: "09:00",
      activity: "",
      type: defaultType,
      location: "",
      note: "",
      duration: "",
      completed: false,
      booked: false,
      mustTry: false,
      icon: "📍"
    });
    setSelectedDate(undefined);
    setSelectedDayId("");
    onClose();
  };

  const activityTypes = [
    { value: "activity", label: "General Activity" },
    { value: "dining", label: "Dining" },
    { value: "meal", label: "Meal" },
    { value: "logistics", label: "Logistics" },
    { value: "travel", label: "Travel" },
    { value: "sightseeing", label: "Sightseeing" },
    { value: "accommodation", label: "Accommodation" },
    { value: "transport", label: "Transport" },
    { value: "entertainment", label: "Entertainment" },
    { value: "photos", label: "Photos" },
    { value: "shopping", label: "Shopping" },
    { value: "rest", label: "Rest" },
  ];

  const tripStart = parseLocalDate(tripStartDate);
  const tripEnd = parseLocalDate(tripEndDate);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Activity"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.activity.trim()}>
            Add Activity
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="activity">Activity Name *</Label>
          <Input
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="Enter activity name"
          />
        </div>

        <div className="space-y-2">
          <Label>Scheduled Date (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < tripStart || date > tripEnd}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 1 hour, 30 minutes"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Notes</Label>
          <Textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            placeholder="Additional notes about this activity"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="booked"
              name="booked"
              checked={formData.booked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
            />
            <Label htmlFor="booked" className="text-sm font-normal">
              Booked
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="mustTry"
              name="mustTry"
              checked={formData.mustTry}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
            />
            <Label htmlFor="mustTry" className="text-sm font-normal">
              Must Try
            </Label>
          </div>
        </div>
      </div>
    </Modal>
  );
};
