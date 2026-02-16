import type { Station } from '../types/station';

// Use the raw content URL from the Gist
const API_URL = 'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw';

export const fetchStations = async (): Promise<Station[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw new Error('Failed to fetch stations. Please try again later.');
  }
};

export const getCities = (stations: Station[]): string[] => {
  const cities = stations.map(station => station.city);
  return Array.from(new Set(cities)).sort();
};