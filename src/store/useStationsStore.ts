import { create } from 'zustand';
import type { StationsState } from '../types/station';
import { fetchStations } from '../services/stationsService';

interface StationsActions {
  loadStations: () => Promise<void>;
  setSelectedCity: (city: string) => void;
  setSelectedStationId: (id: number | null) => void;
  clearFilter: () => void;
}

export const useStationsStore = create<StationsState & StationsActions>((set, get) => ({
  // State
  stations: [],
  filteredStations: [],
  selectedCity: '',
  selectedStationId: null,
  isLoading: false,
  error: null,

  // Actions
  loadStations: async () => {
    set({ isLoading: true, error: null });
    try {
      const stations = await fetchStations();
      set({
        stations,
        filteredStations: stations,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  setSelectedCity: (city: string) => {
    const { stations } = get();
    const filtered = city
      ? stations.filter(station => station.city === city)
      : stations;
    
    set({
      selectedCity: city,
      filteredStations: filtered,
      selectedStationId: null,
    });
  },

  setSelectedStationId: (id: number | null) => {
    set({ selectedStationId: id });
  },

  clearFilter: () => {
    const { stations } = get();
    set({
      selectedCity: '',
      filteredStations: stations,
      selectedStationId: null,
    });
  },
}));