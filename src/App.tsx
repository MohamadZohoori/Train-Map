import { useEffect } from 'react';
import { useStationsStore } from './store/useStationsStore';
import MapView from './components/Map/MapView';
import StationsList from './components/StationsList/StationsList';
import CityFilter from './components/Filter/CityFilter';
import './App.css';

function App() {
  const { loadStations, isLoading, error } = useStationsStore();

  useEffect(() => {
    loadStations();
  }, [loadStations]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700">Loading stations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 font-semibold">Error: {error}</div>
          <button
            onClick={() => loadStations()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">🚂 German Train Stations</h1>
          <p className="text-blue-100 text-sm mt-1">Explore train stations across Germany</p>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar with filter and list */}
        <aside className="w-full md:w-96 flex flex-col bg-white shadow-lg">
          <CityFilter />
          <StationsList />
        </aside>
        
        {/* Map */}
        <div className="flex-1">
          <MapView />
        </div>
      </main>
    </div>
  );
}

export default App;