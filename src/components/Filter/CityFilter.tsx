import { useStationsStore } from '../../store/useStationsStore';
import { getCities } from '../../services/stationsService';

export default function CityFilter() {
  const stations = useStationsStore((state) => state.stations);
  const selectedCity = useStationsStore((state) => state.selectedCity);
  const setSelectedCity = useStationsStore((state) => state.setSelectedCity);
  const clearFilter = useStationsStore((state) => state.clearFilter);

  const cities = getCities(stations);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    if (city === '') {
      clearFilter();
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by City
      </label>
      <div className="flex gap-2">
        <select
          id="city-filter"
          value={selectedCity}
          onChange={handleCityChange}
          className="flex-1 rounded-md border-gray-300 border p-2 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {selectedCity && (
          <button
            onClick={clearFilter}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
