
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActivitiesSection from '@/components/trip/ActivitiesSection';
import { DatabaseActivity } from '@/hooks/useTripData';

const mockActivities: DatabaseActivity[] = [
  {
    id: 'activity-1',
    trip_day_id: 'day-1',
    time: '09:00',
    activity: 'Visit Museum',
    type: 'cultural',
    location: 'Louvre Museum',
    notes: 'Buy tickets online',
    duration: '3 hours',
    completed: false,
    booking_required: true,
    contact_info: '+33 1 40 20 50 50'
  },
  {
    id: 'activity-2',
    trip_day_id: 'day-1',
    time: '14:00',
    activity: 'Lunch at Café',
    type: 'dining',
    location: 'Café de Paris',
    completed: true,
    booking_required: false
  }
];

describe('ActivitiesSection', () => {
  const mockOnEditActivity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders activities list with correct count', () => {
    render(
      <ActivitiesSection
        activities={mockActivities}
        tripDayId="day-1"
        onEditActivity={mockOnEditActivity}
      />
    );

    expect(screen.getByText(/Activities \(2\)/)).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Visit Museum')).toBeInTheDocument();
    expect(screen.getByText('14:00')).toBeInTheDocument();
    expect(screen.getByText('Lunch at Café')).toBeInTheDocument();
  });

  it('shows completed status for completed activities', () => {
    render(
      <ActivitiesSection
        activities={mockActivities}
        tripDayId="day-1"
        onEditActivity={mockOnEditActivity}
      />
    );

    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows booking required warning', () => {
    render(
      <ActivitiesSection
        activities={mockActivities}
        tripDayId="day-1"
        onEditActivity={mockOnEditActivity}
      />
    );

    expect(screen.getByText('⚠️ Booking required')).toBeInTheDocument();
  });

  it('calls onEditActivity when edit button is clicked', () => {
    render(
      <ActivitiesSection
        activities={mockActivities}
        tripDayId="day-1"
        onEditActivity={mockOnEditActivity}
      />
    );

    const editButtons = screen.getAllByRole('button');
    fireEvent.click(editButtons[0]);

    expect(mockOnEditActivity).toHaveBeenCalledWith(mockActivities[0], 'day-1');
  });

  it('renders empty state when no activities', () => {
    render(
      <ActivitiesSection
        activities={[]}
        tripDayId="day-1"
        onEditActivity={mockOnEditActivity}
      />
    );

    expect(screen.getByText('No activities planned for this day.')).toBeInTheDocument();
  });

  it('renders empty state when activities is undefined', () => {
    render(
      <ActivitiesSection
        tripDayId="day-1"
        onEditActivity={mockOnEditActivity}
      />
    );

    expect(screen.getByText('No activities planned for this day.')).toBeInTheDocument();
  });
});
