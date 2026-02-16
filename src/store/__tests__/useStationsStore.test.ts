import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStationsStore } from '../useStationsStore';
import * as stationsService from '../../services/stationsService';
import type { Station } from '../../types/station';

// Mock the service
vi.mock('../../services/stationsService');

describe('useStationsStore', () => {
  const mockStations: Station[] = [
    { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
    { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
    { id: 3, name: 'Berlin Ost', city: 'Berlin', lat: 52.5108, lng: 13.4348 },
  ];

  beforeEach(() => {
    // Reset store state
    useStationsStore.setState({
      stations: [],
      filteredStations: [],
      selectedCity: '',
      selectedStationId: null,
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe('loadStations', () => {
    it('should load stations successfully', async () => {
      vi.mocked(stationsService.fetchStations).mockResolvedValue(mockStations);

      const { loadStations } = useStationsStore.getState();
      await loadStations();

      const state = useStationsStore.getState();
      expect(state.stations).toEqual(mockStations);
      expect(state.filteredStations).toEqual(mockStations);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should set loading state while fetching', async () => {
      vi.mocked(stationsService.fetchStations).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockStations), 100))
      );

      const { loadStations } = useStationsStore.getState();
      const promise = loadStations();

      // Check loading state
      expect(useStationsStore.getState().isLoading).toBe(true);

      await promise;

      expect(useStationsStore.getState().isLoading).toBe(false);
    });

    it('should handle errors when loading fails', async () => {
      const errorMessage = 'Failed to fetch';
      vi.mocked(stationsService.fetchStations).mockRejectedValue(new Error(errorMessage));

      const { loadStations } = useStationsStore.getState();
      await loadStations();

      const state = useStationsStore.getState();
      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('setSelectedCity', () => {
    beforeEach(() => {
      useStationsStore.setState({
        stations: mockStations,
        filteredStations: mockStations,
      });
    });

    it('should filter stations by city', () => {
      const { setSelectedCity } = useStationsStore.getState();
      setSelectedCity('Berlin');

      const state = useStationsStore.getState();
      expect(state.selectedCity).toBe('Berlin');
      expect(state.filteredStations).toHaveLength(2);
      expect(state.filteredStations.every(s => s.city === 'Berlin')).toBe(true);
    });

    it('should show all stations when city is empty', () => {
      const { setSelectedCity } = useStationsStore.getState();
      setSelectedCity('Berlin');
      setSelectedCity('');

      const state = useStationsStore.getState();
      expect(state.selectedCity).toBe('');
      expect(state.filteredStations).toEqual(mockStations);
    });

    it('should reset selected station when filtering', () => {
      useStationsStore.setState({ selectedStationId: 1 });

      const { setSelectedCity } = useStationsStore.getState();
      setSelectedCity('Hamburg');

      expect(useStationsStore.getState().selectedStationId).toBe(null);
    });
  });

  describe('setSelectedStationId', () => {
    it('should set selected station id', () => {
      const { setSelectedStationId } = useStationsStore.getState();
      setSelectedStationId(5);

      expect(useStationsStore.getState().selectedStationId).toBe(5);
    });

    it('should clear selected station id', () => {
      useStationsStore.setState({ selectedStationId: 5 });

      const { setSelectedStationId } = useStationsStore.getState();
      setSelectedStationId(null);

      expect(useStationsStore.getState().selectedStationId).toBe(null);
    });
  });

  describe('clearFilter', () => {
    it('should clear filter and reset state', () => {
      useStationsStore.setState({
        stations: mockStations,
        filteredStations: mockStations.slice(0, 2),
        selectedCity: 'Berlin',
        selectedStationId: 1,
      });

      const { clearFilter } = useStationsStore.getState();
      clearFilter();

      const state = useStationsStore.getState();
      expect(state.selectedCity).toBe('');
      expect(state.filteredStations).toEqual(mockStations);
      expect(state.selectedStationId).toBe(null);
    });
  });
});
