
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItineraryDayCard from '@/components/trip/ItineraryDayCard';
import { DatabaseTripDay } from '@/hooks/useTripData';

const mockTripDay: DatabaseTripDay = {
  id: 'day-1',
  trip_id: 'trip-1',
  day_number: 1,
  date: '2024-06-15',
  city: 'Paris',
  country: 'France',
  title: 'Exploring Paris',
  description: 'Visit the Eiffel Tower and Louvre',
  accommodation_name: 'Hotel Paris',
  accommodation_address: '123 Rue de Paris',
  accommodation_checkin: '15:00',
  accommodation_checkout: '11:00',
  accommodation_contact: '+33 1 23 45 67 89',
  accommodation_confirmation: 'ABC123',
  weather_temp: '22°C',
  weather_condition: 'Sunny',
  activities: [
    {
      id: 'activity-1',
      trip_day_id: 'day-1',
      time: '09:00',
      activity: 'Visit Eiffel Tower',
      type: 'sightseeing',
      location: 'Eiffel Tower',
      notes: 'Bring camera',
      duration: '2 hours',
      completed: false,
      booking_required: true,
      contact_info: '+33 1 44 11 23 23'
    }
  ]
};

describe('ItineraryDayCard', () => {
  const mockOnEditDay = jest.fn();
  const mockOnEditActivity = jest.fn();
  const mockOnViewMap = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders day header with correct information', () => {
    render(
      <ItineraryDayCard
        tripDay={mockTripDay}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    expect(screen.getByText('Day 1: Paris')).toBeInTheDocument();
    expect(screen.getByText('Exploring Paris')).toBeInTheDocument();
    expect(screen.getByText(/Saturday, June 15, 2024/)).toBeInTheDocument();
  });

  it('calls onEditDay when edit day button is clicked', () => {
    render(
      <ItineraryDayCard
        tripDay={mockTripDay}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit day/i });
    fireEvent.click(editButton);

    expect(mockOnEditDay).toHaveBeenCalledWith(mockTripDay);
  });

  it('calls onViewMap when view map button is clicked', () => {
    render(
      <ItineraryDayCard
        tripDay={mockTripDay}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    const mapButton = screen.getByRole('button', { name: /view map/i });
    fireEvent.click(mapButton);

    expect(mockOnViewMap).toHaveBeenCalledWith(mockTripDay);
  });

  it('renders weather information', () => {
    render(
      <ItineraryDayCard
        tripDay={mockTripDay}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    expect(screen.getByText(/Weather: Sunny \(22°C\)/)).toBeInTheDocument();
  });

  it('renders activities', () => {
    render(
      <ItineraryDayCard
        tripDay={mockTripDay}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    expect(screen.getByText(/Activities \(1\)/)).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Visit Eiffel Tower')).toBeInTheDocument();
  });

  it('renders accommodation information', () => {
    render(
      <ItineraryDayCard
        tripDay={mockTripDay}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    expect(screen.getByText('🏨 Accommodation')).toBeInTheDocument();
    expect(screen.getByText('Hotel Paris')).toBeInTheDocument();
    expect(screen.getByText('123 Rue de Paris')).toBeInTheDocument();
  });
});
