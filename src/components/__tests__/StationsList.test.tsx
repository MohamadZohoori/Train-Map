import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StationsList from '../StationsList/StationsList';
import { useStationsStore } from '../../store/useStationsStore';
import type { Station } from '../../types/station';

describe('StationsList', () => {
  const mockStations: Station[] = [
    { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
    { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
    { id: 3, name: 'Munich Hbf', city: 'Munich', lat: 48.1402, lng: 11.5586 },
  ];

  beforeEach(() => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
      selectedCity: '',
      selectedStationId: null,
      isLoading: false,
      error: null,
    });
  });

  it('should render list of stations', () => {
    render(<StationsList />);

    expect(screen.getByText('Berlin Hbf')).toBeInTheDocument();
    expect(screen.getByText('Hamburg Hbf')).toBeInTheDocument();
    expect(screen.getByText('Munich Hbf')).toBeInTheDocument();
  });

  it('should display station count', () => {
    render(<StationsList />);

    expect(screen.getByText('Stations (3)')).toBeInTheDocument();
  });

  it('should show empty state when no stations', () => {
    useStationsStore.setState({ filteredStations: [] });

    render(<StationsList />);

    expect(screen.getByText('No stations found')).toBeInTheDocument();
  });

  it('should call setSelectedStationId when station is clicked', async () => {
    const user = userEvent.setup();
    const setSelectedStationId = vi.fn();
    useStationsStore.setState({ setSelectedStationId } as any);

    render(<StationsList />);

    const stationItem = screen.getByText('Berlin Hbf');
    await user.click(stationItem);

    expect(setSelectedStationId).toHaveBeenCalledWith(1);
  });

  it('should highlight selected station', () => {
    useStationsStore.setState({ selectedStationId: 2 });

    render(<StationsList />);

    const selectedItem = screen.getByText('Hamburg Hbf').closest('li');
    expect(selectedItem).toHaveClass('bg-blue-100');
  });

  it('should display city names for each station', () => {
    render(<StationsList />);

    expect(screen.getByText('📍 Berlin')).toBeInTheDocument();
    expect(screen.getByText('📍 Hamburg')).toBeInTheDocument();
    expect(screen.getByText('📍 Munich')).toBeInTheDocument();
  });
});
