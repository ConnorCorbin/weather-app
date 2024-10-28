import { QueryErrorBoundary } from "./_components/QueryErrorBoundary";

import { WeatherSearch } from "./_features/weather-search";

export function App() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-center">Weather 4u</h1>
      <QueryErrorBoundary>
        <WeatherSearch />
      </QueryErrorBoundary>
    </div>
  );
}
