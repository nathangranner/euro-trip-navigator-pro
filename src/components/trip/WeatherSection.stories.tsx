
import type { Meta, StoryObj } from '@storybook/react';
import WeatherSection from './WeatherSection';

const meta: Meta<typeof WeatherSection> = {
  title: 'Trip/WeatherSection',
  component: WeatherSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTempAndCondition: Story = {
  args: {
    weatherTemp: '25°C',
    weatherCondition: 'Partly Cloudy',
  },
};

export const OnlyCondition: Story = {
  args: {
    weatherCondition: 'Rainy',
  },
};

export const OnlyTemp: Story = {
  args: {
    weatherTemp: '18°C',
  },
};

export const NoWeather: Story = {
  args: {},
};
