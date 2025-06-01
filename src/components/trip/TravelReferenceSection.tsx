
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Phone, Car, AlertTriangle, Plane, Calendar } from "lucide-react";
import { carRentalInfo, flightInfo, auditionDetails, travelWarnings, parkingInfo, importantContacts } from "@/data/travelReference";

export const TravelReferenceSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light text-white tracking-wider mb-4">Travel Reference</h2>
      
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-blue-800 to-blue-900">
          <TabsTrigger value="contacts" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white">
            <Phone className="h-4 w-4 mr-1" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="rentals" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white">
            <Car className="h-4 w-4 mr-1" />
            Rentals
          </TabsTrigger>
          <TabsTrigger value="flights" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white">
            <Plane className="h-4 w-4 mr-1" />
            Flights
          </TabsTrigger>
          <TabsTrigger value="audition" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white">
            <Calendar className="h-4 w-4 mr-1" />
            Audition
          </TabsTrigger>
          <TabsTrigger value="warnings" className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Warnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">Car Rental Support</h3>
              <p className="text-sm">Budget: {importantContacts.carRental.budget}</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">Accommodation Hosts</h3>
              <div className="text-sm space-y-1">
                <p>Milan (Cristina): {importantContacts.accommodationHosts.milanCristina}</p>
                <p>Bologna (Cristina): {importantContacts.accommodationHosts.bolognaCristina}</p>
                <p>Como (Walter): {importantContacts.accommodationHosts.comoWalter}</p>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">Hotels</h3>
              <div className="text-sm space-y-1">
                <p>Baden Hotel: {importantContacts.hotels.badenHotel}</p>
                <p>Stuttgart Hotel: {importantContacts.hotels.stuttgartHotel}</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">Europe Rental</h3>
              <div className="text-sm space-y-1">
                <p>Location: {carRentalInfo.europeRental.location}</p>
                <p>Dates: {carRentalInfo.europeRental.dates}</p>
                <p>Vehicle: {carRentalInfo.europeRental.vehicle}</p>
                <p>Confirmation: {carRentalInfo.europeRental.confirmation}</p>
                <p>Total Days: {carRentalInfo.europeRental.totalDays}</p>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">US Return Rental</h3>
              <div className="text-sm space-y-1">
                <p>Route: {carRentalInfo.usRental.route}</p>
                <p>Date: {carRentalInfo.usRental.date}</p>
                <p>Confirmation: {carRentalInfo.usRental.confirmation}</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">Outbound Flight</h3>
              <div className="text-sm space-y-1">
                <p>Route: {flightInfo.outbound.route}</p>
                <p>Dates: {flightInfo.outbound.dates}</p>
                <p>Confirmation: {flightInfo.outbound.confirmation}</p>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
              <h3 className="font-semibold mb-2">Return Flight</h3>
              <div className="text-sm space-y-1">
                <p>Route: {flightInfo.return.route}</p>
                <p>Dates: {flightInfo.return.dates}</p>
                <p>Confirmation: {flightInfo.return.confirmation}</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audition">
          <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
            <h3 className="font-semibold mb-2">{auditionDetails.title}</h3>
            <div className="text-sm space-y-2">
              <p>Date: {auditionDetails.date}</p>
              <p>Venue: {auditionDetails.venue}</p>
              <div className="mt-3">
                <p className="font-medium">Key Contacts:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Intendant: {auditionDetails.contacts.intendant}</li>
                  <li>• GMD: {auditionDetails.contacts.gmd}</li>
                  <li>• Casting Director: {auditionDetails.contacts.castingDirector}</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="warnings" className="space-y-4">
          <Card className="p-4 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Italian ZTL (Restricted Traffic Zones)
            </h3>
            <div className="text-sm space-y-1">
              <p>• Florence: {travelWarnings.italy.ztl.florence}</p>
              <p>• Milan: {travelWarnings.italy.ztl.milan}</p>
              <p>• Bologna: {travelWarnings.italy.ztl.bologna}</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
            <h3 className="font-semibold mb-2">Switzerland Highway Vignette</h3>
            <div className="text-sm space-y-1">
              <p>Cost: {travelWarnings.switzerland.vignette.cost}</p>
              <p>Note: {travelWarnings.switzerland.vignette.note}</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
            <h3 className="font-semibold mb-2">Parking Information</h3>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Milan:</p>
                <p>Street parking: {parkingInfo.milan.street}</p>
                <p>Garages: {parkingInfo.milan.garages}</p>
              </div>
              <div>
                <p className="font-medium">Florence:</p>
                <p>Recommended: {parkingInfo.florence.recommended}</p>
              </div>
              <div>
                <p className="font-medium">Stuttgart:</p>
                <p>Garages: {parkingInfo.stuttgart.garages}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
