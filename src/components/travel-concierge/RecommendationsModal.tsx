
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Star, MapPin, Compass } from "lucide-react";
import { TravelConcierge } from './types';
import { TripDay } from '@/data/tripData';

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: TripDay | null;
  recommendationTab: string;
  setRecommendationTab: (tab: string) => void;
  recommendations: string;
  recommendationsLoading: boolean;
  adaptationRequest: string;
  setAdaptationRequest: (request: string) => void;
  selectedConcierge: TravelConcierge | null;
  handleGetRecommendations: (type: string) => void;
}

export const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  isOpen,
  onClose,
  selectedDay,
  recommendationTab,
  setRecommendationTab,
  recommendations,
  recommendationsLoading,
  adaptationRequest,
  setAdaptationRequest,
  selectedConcierge,
  handleGetRecommendations
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={selectedDay ? `Recommendations for ${selectedDay.city}` : "Recommendations"}
    >
      <div className="flex flex-col h-[60vh]">
        <Tabs defaultValue="dining" value={recommendationTab} onValueChange={setRecommendationTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="dining">Dining</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="adaptation">Adaptation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dining">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Restaurant Recommendations</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover the best dining options in {selectedDay?.city}
              </p>
              <Button 
                onClick={() => handleGetRecommendations("dining")} 
                disabled={recommendationsLoading || !selectedConcierge} 
                className="mb-4"
              >
                {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Star className="h-4 w-4 mr-2" />}
                Get Dining Recommendations
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="attractions">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Local Attractions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover must-see sights and hidden gems in {selectedDay?.city}
              </p>
              <Button 
                onClick={() => handleGetRecommendations("attractions")} 
                disabled={recommendationsLoading || !selectedConcierge} 
                className="mb-4"
              >
                {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <MapPin className="h-4 w-4 mr-2" />}
                Get Attraction Recommendations
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Special Events</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover timely events and activities in {selectedDay?.city}
              </p>
              <Button 
                onClick={() => handleGetRecommendations("events")} 
                disabled={recommendationsLoading || !selectedConcierge} 
                className="mb-4"
              >
                {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Star className="h-4 w-4 mr-2" />}
                Get Event Recommendations
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="adaptation">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Itinerary Adaptation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Need to change your plans? Get suggestions for adapting your itinerary
              </p>
              <Textarea 
                placeholder="Briefly describe why you need to adapt your itinerary (e.g., 'Museum is closed', 'Weather is bad', 'Want to try something different')" 
                value={adaptationRequest} 
                onChange={e => setAdaptationRequest(e.target.value)} 
                className="mb-4" 
              />
              <Button 
                onClick={() => handleGetRecommendations("adaptation")} 
                disabled={recommendationsLoading || !selectedConcierge} 
                className="mb-4"
              >
                {recommendationsLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Compass className="h-4 w-4 mr-2" />}
                Get Adaptation Suggestions
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md">
          {recommendationsLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : recommendations ? (
            <div className="whitespace-pre-wrap">
              {recommendations}
            </div>
          ) : (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              <p>Click the button above to get recommendations from {selectedConcierge?.name}</p>
            </div>
          )}
        </div>
        
        {selectedDay?.pointsOfInterest && selectedDay.pointsOfInterest.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Points of Interest in {selectedDay.city}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2">
              {selectedDay.pointsOfInterest.map((poi, index) => (
                <div key={index} className="flex items-start space-x-2 border rounded p-2">
                  {poi.image && (
                    <img 
                      src={poi.image} 
                      alt={poi.name} 
                      className="w-16 h-16 object-cover rounded" 
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{poi.name}</span>
                      <Badge variant="outline">{poi.category}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {poi.description.length > 100 ? `${poi.description.substring(0, 100)}...` : poi.description}
                    </p>
                    {poi.mustSee && (
                      <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-300">Must See</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
