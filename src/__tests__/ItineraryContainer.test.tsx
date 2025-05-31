
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItineraryContainer from '@/components/trip/ItineraryContainer';
import { TripDay } from '@/types/trip';

const mockTripDays: TripDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: '2024-06-15',
    city: 'Paris',
    country: 'France',
    title: 'Arrival in Paris',
    description: 'First day in Paris',
    activities: []
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: '2024-06-16',
    city: 'Paris',
    country: 'France',
    title: 'Exploring Paris',
    description: 'Explore the city',
    activities: []
  }
];

describe('ItineraryContainer', () => {
  const mockOnEditDay = jest.fn();
  const mockOnEditActivity = jest.fn();
  const mockOnViewMap = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders view toggle buttons', () => {
    render(
      <ItineraryContainer
        tripDays={mockTripDays}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    expect(screen.getByRole('button', { name: 'Tabs View' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'List View' })).toBeInTheDocument();
  });

  it('starts with list view as default', () => {
    render(
      <ItineraryContainer
        tripDays={mockTripDays}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    const listButton = screen.getByRole('button', { name: 'List View' });
    const tabsButton = screen.getByRole('button', { name: 'Tabs View' });

    // List view button should be selected (default variant)
    expect(listButton).toHaveClass('bg-primary');
    expect(tabsButton).not.toHaveClass('bg-primary');
  });

  it('switches to tabs view when tabs button is clicked', () => {
    render(
      <ItineraryContainer
        tripDays={mockTripDays}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    const tabsButton = screen.getByRole('button', { name: 'Tabs View' });
    fireEvent.click(tabsButton);

    // After clicking, tabs button should be selected
    expect(tabsButton).toHaveClass('bg-primary');
    
    // Should render tab triggers for each day
    expect(screen.getByRole('tab', { name: 'Day 1: Paris' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Day 2: Paris' })).toBeInTheDocument();
  });

  it('switches back to list view when list button is clicked', () => {
    render(
      <ItineraryContainer
        tripDays={mockTripDays}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    // Switch to tabs first
    const tabsButton = screen.getByRole('button', { name: 'Tabs View' });
    fireEvent.click(tabsButton);

    // Then switch back to list
    const listButton = screen.getByRole('button', { name: 'List View' });
    fireEvent.click(listButton);

    expect(listButton).toHaveClass('bg-primary');
    expect(tabsButton).not.toHaveClass('bg-primary');
  });

  it('renders day content in both views', () => {
    render(
      <ItineraryContainer
        tripDays={mockTripDays}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    // In list view, should see day headers
    expect(screen.getByText('Day 1: Paris')).toBeInTheDocument();
    expect(screen.getByText('Day 2: Paris')).toBeInTheDocument();

    // Switch to tabs view
    const tabsButton = screen.getByRole('button', { name: 'Tabs View' });
    fireEvent.click(tabsButton);

    // Should still see content but in tab format
    expect(screen.getByText('Day 1: Paris')).toBeInTheDocument();
  });

  it('passes props correctly to child components', () => {
    render(
      <ItineraryContainer
        tripDays={mockTripDays}
        onEditDay={mockOnEditDay}
        onEditActivity={mockOnEditActivity}
        onViewMap={mockOnViewMap}
      />
    );

    // Should see edit buttons from child components
    const editButtons = screen.getAllByText(/Edit Day/);
    expect(editButtons.length).toBeGreaterThan(0);
  });
});
