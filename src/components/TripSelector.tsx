
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, MapPin } from 'lucide-react';
import { useTrips, Trip } from '@/hooks/useTrips';
import { Skeleton } from '@/components/ui/skeleton';

interface TripSelectorProps {
  onSelectTrip: (trip: Trip) => void;
  onCreateTrip: () => void;
  selectedTripId?: string;
}

export const TripSelector: React.FC<TripSelectorProps> = ({
  onSelectTrip,
  onCreateTrip,
  selectedTripId
}) => {
  const { trips, loading } = useTrips();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Trips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Your Trips
          <Button onClick={onCreateTrip} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Trip
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No trips yet. Create your first trip!</p>
            <Button onClick={onCreateTrip}>
              <Plus className="h-4 w-4 mr-2" />
              Create Trip
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {trips.map((trip) => (
              <Card 
                key={trip.id} 
                className={`cursor-pointer transition-colors ${
                  selectedTripId === trip.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectTrip(trip)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium">{trip.name}</h3>
                  {trip.description && (
                    <p className="text-sm text-gray-600 mt-1">{trip.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
