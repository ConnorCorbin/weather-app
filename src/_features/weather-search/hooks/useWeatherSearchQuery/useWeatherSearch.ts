import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

import { Weather } from "../../../../_types/weather";

interface WeatherSearchQueryProps {
  filters: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

interface OpenMeteoReturnDto {
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    wind_speed_10m_max: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
  };
}

export function useWeatherSearchQuery({ filters }: WeatherSearchQueryProps) {
  return useSuspenseQuery({
    queryKey: ["weather", filters],
    queryFn: async (): Promise<Weather[]> => {
      // TODO: Validate the DTO with Yup schema validation. Not vital as the
      // Weather API is very popular, and the chances of a breaking change to
      // the API are unlikely.
      const dto = await ky<OpenMeteoReturnDto>(
        import.meta.env.VITE_OPEN_METEO_API,
        {
          searchParams: {
            latitude: filters.latitude,
            longitude: filters.longitude,
            timezone: filters.timezone,
            daily:
              "weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max",
            forecast_days: 5,
          },
        }
      ).json();

      return [
        buildDomainFromDto(dto, 0),
        buildDomainFromDto(dto, 1),
        buildDomainFromDto(dto, 2),
        buildDomainFromDto(dto, 3),
        buildDomainFromDto(dto, 4),
      ].filter((domain) => !!domain);
    },
  });
}

function buildDomainFromDto(
  dto: OpenMeteoReturnDto,
  index: number
): Weather | null {
  const date = dto.daily.time?.[index];
  const weatherCode = dto.daily.weather_code?.[index];
  const tempMax = dto.daily.temperature_2m_max?.[index];
  const tempMin = dto.daily.temperature_2m_min?.[index];
  const speedMax = dto.daily.wind_speed_10m_max?.[index];

  if (!date || !weatherCode || !tempMax || !tempMin || !speedMax) {
    return null;
  }

  return {
    date,
    tempMaxUnit: dto.daily_units.temperature_2m_max,
    tempMinUnit: dto.daily_units.temperature_2m_min,
    speedMaxUnit: dto.daily_units.wind_speed_10m_max,
    tempMax: tempMax,
    tempMin: tempMin,
    speedMax: speedMax,
    descriptionCode: weatherCode,
    description: getWeatherDescriptionFromCode(weatherCode),
  };
}

function getWeatherDescriptionFromCode(code: number): string | null {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
    case 2:
    case 3:
      return "Mainly clear, partly cloudy, and overcast";
    case 45:
    case 48:
      return "Fog and depositing rime fog";
    case 51:
    case 53:
    case 55:
      return "Drizzle: Light, moderate, and dense intensity";
    case 56:
    case 57:
      return "Freezing Drizzle: Light and dense intensity";
    case 61:
    case 63:
    case 65:
      return "Rain: Slight, moderate and heavy intensity";
    case 66:
    case 67:
      return "Freezing Rain: Light and heavy intensity";
    case 71:
    case 73:
    case 75:
      return "Snow fall: Slight, moderate, and heavy intensity";
    case 77:
      return "Snow grains";
    case 80:
    case 81:
    case 82:
      return "Rain showers: Slight, moderate, and violent";
    case 85:
    case 86:
      return "Snow showers slight and heavy";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case 96:
    case 99:
      return "Thunderstorm with slight and heavy hail";

    default:
      return null;
  }
}
