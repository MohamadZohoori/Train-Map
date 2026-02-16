import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchStations, getCities } from '../stationsService';
import type { Station } from '../../types/station';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('stationsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchStations', () => {
    it('should fetch and return stations successfully', async () => {
      const mockStations: Station[] = [
        { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
        { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
      ];

      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStations,
      });

      const result = await fetchStations();

      expect(result).toEqual(mockStations);
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error when fetch fails', async () => {
      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchStations()).rejects.toThrow('Failed to fetch stations');
    });

    it('should handle network errors', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchStations()).rejects.toThrow('Failed to fetch stations');
    });
  });

  describe('getCities', () => {
    it('should extract unique cities from stations and sort them', () => {
      const stations: Station[] = [
        { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
        { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
        { id: 3, name: 'Berlin Ost', city: 'Berlin', lat: 52.5108, lng: 13.4348 },
        { id: 4, name: 'Munich Hbf', city: 'Munich', lat: 48.1402, lng: 11.5586 },
      ];

      const result = getCities(stations);

      expect(result).toEqual(['Berlin', 'Hamburg', 'Munich']);
      expect(result).toHaveLength(3);
    });

    it('should return empty array for empty stations', () => {
      const result = getCities([]);
      expect(result).toEqual([]);
    });
  });
});
