import { format } from "date-fns";

import { Paper } from "../../../../../components/Paper";
import { Weather } from "../../../../_types/weather";

const DATE_FORMAT = "dd/MM/yyy";

export function WeatherResultCard({ weather }: WeatherResultCardProps) {
  return (
    <Paper className="flex flex-col gap-1 p-2">
      <span className="block font-bold text-center">
        {format(weather.date, `${DATE_FORMAT} '-' iiii`)}
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
