export interface Station {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
}

export interface StationsState {
  stations: Station[];
  filteredStations: Station[];
  selectedCity: string;
  selectedStationId: number | null;
  isLoading: boolean;
  error: string | null;
}