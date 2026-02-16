# Train Map

A modern web application for visualizing train stations on an interactive map with filtering capabilities.

## Features

- 🗺️ Interactive map displaying train stations
- 🔍 Filter stations by city
- 📱 Responsive design with Tailwind CSS
- ⚡ Built with Vite for fast development and builds
- 🧪 Comprehensive test coverage with Vitest

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **State Management:** Zustand (via [`useStationsStore`](src/store/useStationsStore.ts))
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint

## Project Structure

```
src/
├── components/
│   ├── Filter/          # Filter components
│   ├── Map/             # Map visualization components
│   ├── StationsList/    # Station list components
│   └── __tests__/       # Component tests
├── hooks/               # Custom React hooks
├── services/            # API services
│   └── stationsService.ts  # Station data fetching
├── store/               # Zustand store
│   └── useStationsStore.ts # Stations state management
├── types/               # TypeScript type definitions
│   └── station.ts       # Station type
└── utils/               # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd train-map
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Data Source

Station data is fetched from the [`stationsService`](src/services/stationsService.ts) which retrieves information from a GitHub Gist containing train station details including coordinates and city information.

## Testing

Run the test suite:

```bash
npm test
```

Tests are located in `__tests__` directories throughout the project, including:
- [`CityFilter.test.tsx`](src/components/__tests__/CityFilter.test.tsx)
- [`StationsList.test.tsx`](src/components/__tests__/StationsList.test.tsx)

## Development

The project uses:
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **PostCSS** for CSS processing
- **ESLint** for code linting

Configuration files:
- [vite.config.ts](vite.config.ts) - Vite configuration
- [tailwind.config.js](tailwind.config.js) - Tailwind CSS configuration
- [tsconfig.json](tsconfig.json) - TypeScript configuration
- [eslint.config.js](eslint.config.js) - ESLint configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and improvements.