
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ActivitiesSection from './ActivitiesSection';
import { DatabaseActivity } from '@/hooks/useTripData';

const mockActivities: DatabaseActivity[] = [
  {
    id: 'activity-1',
    trip_day_id: 'day-1',
    time: '09:00',
    activity: 'Visit Louvre Museum',
    type: 'cultural',
    location: 'Louvre Museum, Paris',
    notes: 'Buy tickets online in advance',
    duration: '3 hours',
    completed: false,
    booking_required: true,
    contact_info: '+33 1 40 20 50 50'
  },
  {
    id: 'activity-2',
    trip_day_id: 'day-1',
    time: '14:00',
    activity: 'Lunch at Café de Flore',
    type: 'dining',
    location: 'Café de Flore, Saint-Germain',
    completed: true,
    booking_required: false
  },
  {
    id: 'activity-3',
    trip_day_id: 'day-1',
    time: '16:30',
    activity: 'Seine River Cruise',
    type: 'sightseeing',
    location: 'Pont Neuf',
    duration: '1.5 hours',
    completed: false,
    booking_required: true,
    contact_info: '+33 1 42 25 96 10'
  }
];

const meta: Meta<typeof ActivitiesSection> = {
  title: 'Trip/ActivitiesSection',
  component: ActivitiesSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onEditActivity: { action: 'edit-activity' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithActivities: Story = {
  args: {
    activities: mockActivities,
    tripDayId: 'day-1',
    onEditActivity: action('edit-activity'),
  },
};

export const SingleActivity: Story = {
  args: {
    activities: [mockActivities[0]],
    tripDayId: 'day-1',
    onEditActivity: action('edit-activity'),
  },
};

export const NoActivities: Story = {
  args: {
    activities: [],
    tripDayId: 'day-1',
    onEditActivity: action('edit-activity'),
  },
};

export const UndefinedActivities: Story = {
  args: {
    tripDayId: 'day-1',
    onEditActivity: action('edit-activity'),
  },
};
