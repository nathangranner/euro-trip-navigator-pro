
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DayHeader from './DayHeader';
import { DatabaseTripDay } from '@/hooks/useTripData';

const mockTripDay: DatabaseTripDay = {
  id: 'day-1',
  trip_id: 'trip-1',
  day_number: 1,
  date: '2024-06-15',
  city: 'Paris',
  country: 'France',
  title: 'Arrival and City Center Exploration',
  description: 'Welcome to Paris! Today we explore the historic city center.',
  accommodation_name: 'Hotel Louvre',
  accommodation_address: '1 Place du Louvre, 75001 Paris, France',
  accommodation_checkin: '15:00',
  accommodation_checkout: '11:00',
  activities: []
};

const meta: Meta<typeof DayHeader> = {
  title: 'Trip/DayHeader',
  component: DayHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onEditDay: { action: 'edit-day' },
    onViewMap: { action: 'view-map' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tripDay: mockTripDay,
    onEditDay: action('edit-day'),
    onViewMap: action('view-map'),
  },
};

export const WithoutAccommodation: Story = {
  args: {
    tripDay: {
      ...mockTripDay,
      accommodation_address: undefined,
    },
    onEditDay: action('edit-day'),
    onViewMap: action('view-map'),
  },
};

export const MinimalInfo: Story = {
  args: {
    tripDay: {
      ...mockTripDay,
      title: undefined,
      description: undefined,
    },
    onEditDay: action('edit-day'),
    onViewMap: action('view-map'),
  },
};
