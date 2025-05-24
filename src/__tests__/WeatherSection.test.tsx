
import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherSection from '@/components/trip/WeatherSection';

describe('WeatherSection', () => {
  it('renders weather information when provided', () => {
    render(
      <WeatherSection
        weatherTemp="25°C"
        weatherCondition="Partly Cloudy"
      />
    );

    expect(screen.getByText(/Weather: Partly Cloudy \(25°C\)/)).toBeInTheDocument();
  });

  it('renders weather without temperature when only condition is provided', () => {
    render(
      <WeatherSection
        weatherCondition="Rainy"
      />
    );

    expect(screen.getByText('Weather: Rainy')).toBeInTheDocument();
  });

  it('does not render when no weather data is provided', () => {
    const { container } = render(<WeatherSection />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when weather data is empty', () => {
    const { container } = render(
      <WeatherSection
        weatherTemp=""
        weatherCondition=""
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
