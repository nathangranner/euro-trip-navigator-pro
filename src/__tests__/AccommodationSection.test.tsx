
import React from 'react';
import { render, screen } from '@testing-library/react';
import AccommodationSection from '@/components/trip/AccommodationSection';

describe('AccommodationSection', () => {
  it('renders accommodation information when provided', () => {
    render(
      <AccommodationSection
        accommodationName="Grand Hotel"
        accommodationAddress="456 Main Street"
        accommodationCheckin="15:00"
        accommodationCheckout="11:00"
        accommodationContact="+1 555 123 4567"
        accommodationConfirmation="XYZ789"
      />
    );

    expect(screen.getByText('🏨 Accommodation')).toBeInTheDocument();
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument();
    expect(screen.getByText('456 Main Street')).toBeInTheDocument();
    expect(screen.getByText(/Check-in:/)).toBeInTheDocument();
    expect(screen.getByText('15:00')).toBeInTheDocument();
    expect(screen.getByText(/Check-out:/)).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
    expect(screen.getByText(/Contact:/)).toBeInTheDocument();
    expect(screen.getByText('+1 555 123 4567')).toBeInTheDocument();
    expect(screen.getByText(/Confirmation:/)).toBeInTheDocument();
    expect(screen.getByText('XYZ789')).toBeInTheDocument();
  });

  it('renders empty state when no accommodation name', () => {
    render(<AccommodationSection />);

    expect(screen.getByText('No accommodation details available.')).toBeInTheDocument();
  });

  it('renders accommodation with minimal information', () => {
    render(
      <AccommodationSection
        accommodationName="Budget Inn"
      />
    );

    expect(screen.getByText('🏨 Accommodation')).toBeInTheDocument();
    expect(screen.getByText('Budget Inn')).toBeInTheDocument();
    expect(screen.queryByText(/Check-in:/)).not.toBeInTheDocument();
  });

  it('renders accommodation with partial information', () => {
    render(
      <AccommodationSection
        accommodationName="City Hotel"
        accommodationAddress="789 City Center"
        accommodationCheckin="14:00"
      />
    );

    expect(screen.getByText('City Hotel')).toBeInTheDocument();
    expect(screen.getByText('789 City Center')).toBeInTheDocument();
    expect(screen.getByText(/Check-in:/)).toBeInTheDocument();
    expect(screen.getByText('14:00')).toBeInTheDocument();
    expect(screen.queryByText(/Check-out:/)).not.toBeInTheDocument();
  });
});
