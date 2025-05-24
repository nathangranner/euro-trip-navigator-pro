
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ItineraryContainer from './ItineraryContainer';
import { DatabaseTripDay } from '@/hooks/useTripData';

const mockTripDays: DatabaseTripDay[] = [
  {
    id: 'day-1',
    trip_id: 'trip-1',
    day_number: 1,
    date: '2024-06-15',
    city: 'Paris',
    country: 'France',
    title: 'Arrival Day',
    description: 'Welcome to Paris!',
    accommodation_name: 'Hotel Louvre',
    accommodation_address: '1 Place du Louvre, 75001 Paris, France',
    weather_temp: '22°C',
    weather_condition: 'Sunny',
    activities: [
      {
        id: 'activity-1',
        trip_day_id: 'day-1',
        time: '14:00',
        activity: 'Check into hotel',
        type: 'logistics',
        completed: false,
        booking_required: false
      }
    ]
  },
  {
    id: 'day-2',
    trip_id: 'trip-1',
    day_number: 2,
    date: '2024-06-16',
    city: 'Paris',
    country: 'France',
    title: 'Museum Day',
    accommodation_name: 'Hotel Louvre',
    activities: [
      {
        id: 'activity-2',
        trip_day_id: 'day-2',
        time: '09:00',
        activity: 'Visit Louvre',
        type: 'cultural',
        completed: false,
        booking_required: true
      }
    ]
  }
];

const meta: Meta<typeof ItineraryContainer> = {
  title: 'Trip/ItineraryContainer',
  component: ItineraryContainer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onEditDay: { action: 'edit-day' },
    onEditActivity: { action: 'edit-activity' },
    onViewMap: { action: 'view-map' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tripDays: mockTripDays,
    onEditDay: action('edit-day'),
    onEditActivity: action('edit-activity'),
    onViewMap: action('view-map'),
  },
};

export const TabsView: Story = {
  args: {
    tripDays: mockTripDays,
    onEditDay: action('edit-day'),
    onEditActivity: action('edit-activity'),
    onViewMap: action('view-map'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabsButton = canvas.getByText('Tabs View');
    await userEvent.click(tabsButton);
    
    // Verify tabs view is active
    await expect(canvas.getByText('Day 1: Paris')).toBeInTheDocument();
  },
};

export const ViewToggle: Story = {
  args: {
    tripDays: mockTripDays,
    onEditDay: action('edit-day'),
    onEditActivity: action('edit-activity'),
    onViewMap: action('view-map'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Switch to tabs view
    const tabsButton = canvas.getByText('Tabs View');
    await userEvent.click(tabsButton);
    
    // Switch back to list view
    const listButton = canvas.getByText('List View');
    await userEvent.click(listButton);
    
    // Verify we're back in list view
    await expect(canvas.getByText('List View')).toHaveAttribute('data-state', 'active');
  },
};

export const EmptyState: Story = {
  args: {
    tripDays: [],
    onEditDay: action('edit-day'),
    onEditActivity: action('edit-activity'),
    onViewMap: action('view-map'),
  },
};
