import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

import { GeoLocation } from "../../../../_types/geoLocation";

interface GeoLocationSearchQueryProps {
  filters: {
    name: string;
  };
}

interface GeocodingReturnDto {
  results?: {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
    admin1?: string;
  }[];
}

export function useGeoLocationSearchQuery({
  filters: initFilters,
}: GeoLocationSearchQueryProps) {
  const filters = {
    ...initFilters,
    name: initFilters.name.trim(),
  };

  return useSuspenseQuery({
    queryKey: ["geoLocation", filters],
    queryFn: async (): Promise<GeoLocation[]> => {
      // Prevent redundant API calls to the GeoCoding API. An empty string and 1
      // character will return an empty result. 3 characters will perform fuzzy
      // matching. Therefore, ensure the name is 3 characters or longer.
      if (filters.name === "" || filters.name.length < 2) {
        return [];
      }

      // TODO: Validate the DTO with Yup schema validation. Not vital as the
      // GeoCoding API is very popular, and the chances of a breaking change to
      // the API are unlikely.
      const dto = await ky<GeocodingReturnDto>(
        import.meta.env.VITE_GEOCODING_API,
        {
          searchParams: {
            name: filters.name,
          },
        }
      ).json();

      if (!dto?.results) {
        return [];
      }

      return dto.results.map((result) => ({
        id: result.id.toString(),
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone,
        admin1: result.admin1,
      }));
    },
  });
}
