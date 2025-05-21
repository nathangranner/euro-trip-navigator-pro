
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TripDay } from "@/data/tripData";

interface EditDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: TripDay;
  onSave: (updatedDay: TripDay) => void;
}

export const EditDayModal: React.FC<EditDayModalProps> = ({ isOpen, onClose, day, onSave }) => {
  const [formData, setFormData] = useState<Partial<TripDay>>({
    city: day.city,
    title: day.title,
    encouragement: day.encouragement || "",
  });

  const [accommodation, setAccommodation] = useState({
    name: day.accommodation?.name || "",
    address: day.accommodation?.address || "",
    wifi: day.accommodation?.wifi || "",
    checkin: day.accommodation?.checkin || "",
    checkout: day.accommodation?.checkout || "",
    contactPhone: day.accommodation?.contactPhone || "",
    totalPrice: day.accommodation?.totalPrice || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccommodationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccommodation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedDay: TripDay = {
      ...day,
      ...formData,
      accommodation: day.accommodation 
        ? { 
            ...day.accommodation, 
            ...accommodation 
          }
        : accommodation.name 
          ? { 
              ...accommodation, 
              image: day.accommodation?.image || "" 
            }
          : day.accommodation
    };
    onSave(updatedDay);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Day ${day.dayNumber}: ${day.city}`}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Day Information</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="encouragement">Encouragement or Special Notes</Label>
              <Textarea
                id="encouragement"
                name="encouragement"
                value={formData.encouragement}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Accommodation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accommodationName">Hotel/Accommodation Name</Label>
              <Input
                id="accommodationName"
                name="name"
                value={accommodation.name}
                onChange={handleAccommodationChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodationAddress">Address</Label>
              <Input
                id="accommodationAddress"
                name="address"
                value={accommodation.address}
                onChange={handleAccommodationChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodationWifi">WiFi Password</Label>
              <Input
                id="accommodationWifi"
                name="wifi"
                value={accommodation.wifi}
                onChange={handleAccommodationChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodationCheckin">Check-in Time</Label>
              <Input
                id="accommodationCheckin"
                name="checkin"
                value={accommodation.checkin}
                onChange={handleAccommodationChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodationCheckout">Check-out Time</Label>
              <Input
                id="accommodationCheckout"
                name="checkout"
                value={accommodation.checkout}
                onChange={handleAccommodationChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodationPhone">Contact Phone</Label>
              <Input
                id="accommodationPhone"
                name="contactPhone"
                value={accommodation.contactPhone}
                onChange={handleAccommodationChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodationPrice">Total Price</Label>
              <Input
                id="accommodationPrice"
                name="totalPrice"
                value={accommodation.totalPrice}
                onChange={handleAccommodationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
