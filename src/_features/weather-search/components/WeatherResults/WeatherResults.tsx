import { GeoLocation } from "../../../../_types/geoLocation";

import { useWeatherSearchQuery } from "../../hooks/useWeatherSearchQuery";
import { WeatherResultCard } from "../WeatherResultCard";

export function WeatherResults({ geoLocation }: WeatherResultsProps) {
  const { data: weather } = useWeatherSearchQuery({
    filters: {
      latitude: geoLocation.latitude,
      longitude: geoLocation.longitude,
      timezone: geoLocation.timezone,
    },
  });

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {weather.map((w) => (
        <WeatherResultCard key={w.date} weather={w} />
      ))}
    </div>
  );
}

interface WeatherResultsProps {
  geoLocation: Pick<GeoLocation, "latitude" | "longitude" | "timezone">;
}
