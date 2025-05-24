
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ItineraryTabView from './ItineraryTabView';
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
    accommodation_name: 'Hotel Louvre',
    activities: []
  },
  {
    id: 'day-2',
    trip_id: 'trip-1',
    day_number: 2,
    date: '2024-06-16',
    city: 'Lyon',
    country: 'France',
    title: 'Travel Day',
    accommodation_name: 'Lyon Hotel',
    activities: []
  },
  {
    id: 'day-3',
    trip_id: 'trip-1',
    day_number: 3,
    date: '2024-06-17',
    city: 'Nice',
    country: 'France',
    title: 'Beach Day',
    accommodation_name: 'Seaside Resort',
    activities: []
  }
];

const meta: Meta<typeof ItineraryTabView> = {
  title: 'Trip/ItineraryTabView',
  component: ItineraryTabView,
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

export const TabSwitching: Story = {
  args: {
    tripDays: mockTripDays,
    onEditDay: action('edit-day'),
    onEditActivity: action('edit-activity'),
    onViewMap: action('view-map'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click on Day 2 tab
    const day2Tab = canvas.getByText('Day 2: Lyon');
    await userEvent.click(day2Tab);
    
    // Verify Day 2 content is visible
    await expect(canvas.getByText('Travel Day')).toBeInTheDocument();
    
    // Click on Day 3 tab
    const day3Tab = canvas.getByText('Day 3: Nice');
    await userEvent.click(day3Tab);
    
    // Verify Day 3 content is visible
    await expect(canvas.getByText('Beach Day')).toBeInTheDocument();
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
