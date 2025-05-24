
import type { Meta, StoryObj } from '@storybook/react';
import AccommodationSection from './AccommodationSection';

const meta: Meta<typeof AccommodationSection> = {
  title: 'Trip/AccommodationSection',
  component: AccommodationSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accommodationName: 'Grand Hotel Palace',
    accommodationAddress: '123 Main Street, Paris, France',
    accommodationCheckin: '15:00',
    accommodationCheckout: '11:00',
    accommodationContact: '+33 1 23 45 67 89',
    accommodationConfirmation: 'ABC123456',
  },
};

export const MinimalInfo: Story = {
  args: {
    accommodationName: 'Budget Inn',
  },
};

export const PartialInfo: Story = {
  args: {
    accommodationName: 'City Hotel',
    accommodationAddress: '789 City Center',
    accommodationCheckin: '14:00',
  },
};

export const NoAccommodation: Story = {
  args: {},
};
