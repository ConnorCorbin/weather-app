import { format, isToday } from "date-fns";

import { Paper } from "../../../../../components/Paper";
import { Weather } from "../../../../_types/weather";

export function WeatherResultCard({ weather }: WeatherResultCardProps) {
  const date = new Date(weather.date);

  return (
    <Paper className="flex flex-col gap-1 p-2">
      <span className="block font-bold text-center">
        {isToday(date) ? "Today" : format(weather.date, "iiii")}
      </span>
      <span className="block text-center">{weather.description}</span>
      <div className="mt-auto">
        <span className="block text-center">
          {weather.tempMin}
          {weather.tempMinUnit} - {weather.tempMax}
          {weather.tempMaxUnit}
        </span>
        <span className="block text-center">
          {weather.speedMax}
          {weather.speedMaxUnit}
        </span>
      </div>
    </Paper>
  );
}

interface WeatherResultCardProps {
  weather: Weather;
}
