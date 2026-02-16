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
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading stations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Stations</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => loadStations()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex-shrink-0 shadow-lg">
        <h1 className="text-2xl font-bold">🚂 German Train Stations</h1>
        <p className="text-sm text-blue-100 mt-1">Explore train stations across Germany</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        {/* Sticky Container for Map and Filter on mobile */}
        <div className="order-1 md:order-2 w-full md:flex-1 sticky md:relative top-0 z-10 flex-shrink-0 md:h-full md:overflow-hidden">
          {/* Map */}
          <div className="h-[50vh] md:h-full relative overflow-hidden">
            <MapView />
          </div>
          
          {/* Filter - Only visible on mobile, part of sticky section */}
          <div className="md:hidden bg-white">
            <CityFilter />
          </div>
        </div>

        {/* Sidebar - Second on mobile, First on desktop */}
        <aside className="order-2 md:order-1 w-full md:w-96 flex-shrink-0 flex flex-col bg-white border-t md:border-t-0 md:border-r border-gray-200 md:overflow-hidden md:h-full">
          {/* Filter - Only visible on desktop */}
          <div className="hidden md:block flex-shrink-0">
            <CityFilter />
          </div>
          
          {/* Stations List - Natural height on mobile, Scrollable on desktop */}
          <div className="md:flex-1 md:overflow-y-auto">
            <StationsList />
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;