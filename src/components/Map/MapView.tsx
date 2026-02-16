import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { useStationsStore } from '../../store/useStationsStore';
import type { Station } from '../../types/station';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map centering when a station is selected or filter changes
function MapController() {
  const map = useMap();
  const selectedStationId = useStationsStore((state) => state.selectedStationId);
  const filteredStations = useStationsStore((state) => state.filteredStations);
  const selectedCity = useStationsStore((state) => state.selectedCity);

  // Invalidate map size on mount and when needed
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);

  // Zoom to specific station when selected
  useEffect(() => {
    if (selectedStationId) {
      const station = filteredStations.find((s) => s.id === selectedStationId);
      if (station) {
        // Invalidate size before flying to ensure accurate centering
        map.invalidateSize();
        map.flyTo([station.lat, station.lng], 13, {
          duration: 1.5,
        });
      }
    }
  }, [selectedStationId, filteredStations, map]);

  // Fit bounds to show all filtered stations when city filter changes
  useEffect(() => {
    if (!selectedStationId && filteredStations.length > 0) {
      // Invalidate size before fitting bounds
      map.invalidateSize();
      
      // Create bounds from all filtered stations
      const bounds = L.latLngBounds(
        filteredStations.map(station => [station.lat, station.lng] as [number, number])
      );
      
      // Fit map to show all filtered stations
      map.fitBounds(bounds, {
        padding: [80, 80],
        maxZoom: 12,
        duration: 1.5,
      });
    }
  }, [selectedCity, filteredStations, selectedStationId, map]);

  return null;
}

export default function MapView() {
  const filteredStations = useStationsStore((state) => state.filteredStations);
  const setSelectedStationId = useStationsStore((state) => state.setSelectedStationId);

  // Center on Germany
  const center: LatLngExpression = [51.1657, 10.4515];
  const zoom = 6;

  const handleMarkerClick = (station: Station) => {
    setSelectedStationId(station.id);
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
        {filteredStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(station),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{station.name}</h3>
                <p className="text-gray-600">{station.city}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
