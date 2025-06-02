import React from "react";
import { MapPin, Phone } from "lucide-react";
interface AccommodationSectionProps {
  accommodationName?: string;
  accommodationAddress?: string;
  accommodationCheckin?: string;
  accommodationCheckout?: string;
  accommodationContact?: string;
  accommodationConfirmation?: string;
}
export default function AccommodationSection({
  accommodationName,
  accommodationAddress,
  accommodationCheckin,
  accommodationCheckout,
  accommodationContact,
  accommodationConfirmation
}: AccommodationSectionProps) {
  if (!accommodationName) {
    return <p className="text-sm text-gray-100">No accommodation details available.</p>;
  }
  return <div>
      <h4 className="font-medium mb-3 flex items-center gap-2">
        🏨 Accommodation
      </h4>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="font-medium text-sm">{accommodationName}</p>
        {accommodationAddress && <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {accommodationAddress}
          </p>}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
          {accommodationCheckin && <div>
              <span className="text-gray-500">Check-in:</span> {accommodationCheckin}
            </div>}
          {accommodationCheckout && <div>
              <span className="text-gray-500">Check-out:</span> {accommodationCheckout}
            </div>}
          {accommodationContact && <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-gray-500" />
              <span className="text-gray-500">Contact:</span> {accommodationContact}
            </div>}
          {accommodationConfirmation && <div>
              <span className="text-gray-500">Confirmation:</span> {accommodationConfirmation}
            </div>}
        </div>
      </div>
    </div>;
}