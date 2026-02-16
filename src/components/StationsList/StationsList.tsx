import { useStationsStore } from '../../store/useStationsStore';
import type { Station } from '../../types/station';

export default function StationsList() {
  const filteredStations = useStationsStore((state) => state.filteredStations);
  const selectedStationId = useStationsStore((state) => state.selectedStationId);
  const setSelectedStationId = useStationsStore((state) => state.setSelectedStationId);

  const handleStationClick = (station: Station) => {
    setSelectedStationId(station.id);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-800">
          Stations ({filteredStations.length})
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredStations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No stations found
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredStations.map((station) => (
              <li
                key={station.id}
                onClick={() => handleStationClick(station)}
                className={`px-4 py-2.5 cursor-pointer transition-colors hover:bg-blue-50 ${
                  selectedStationId === station.id
                    ? 'bg-blue-100 border-l-4 border-l-blue-600'
                    : ''
                }`}
              >
                <h3 className="font-semibold text-gray-900 text-sm">{station.name}</h3>
                <p className="text-xs text-gray-600 mt-0.5">📍 {station.city}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
