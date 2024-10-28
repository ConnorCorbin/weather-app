import { Suspense } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { QueryErrorBoundary } from "../../_components/QueryErrorBoundary";

import { locationFormSchema } from "./constants/locationFormSchema";
import { LocationSearchInput } from "./components/LocationSearchInput";
import { WeatherResults } from "./components/WeatherResults";

export function WeatherSearch({}) {
  const { control, setValue, watch } = useForm({
    resolver: yupResolver(locationFormSchema),
    defaultValues: {
      id: "",
      latitude: -1,
      longitude: -1,
      timezone: "",
    },
  });

  const [latitude, longitude, timezone] = watch([
    "latitude",
    "longitude",
    "timezone",
  ]);

  return (
    <>
      <div className="mx-auto mb-10 max-w-3xl ">
        <form>
          <QueryErrorBoundary>
            <LocationSearchInput control={control} setValue={setValue} />
          </QueryErrorBoundary>
        </form>
      </div>
      {latitude !== -1 && longitude !== -1 && timezone !== "" && (
        // TODO: improve suspense loading. It has been left very basic.
        <Suspense
          fallback={<p className="italic">Weather forcast loading...</p>}
        >
          <QueryErrorBoundary>
            <WeatherResults
              geoLocation={{
                latitude,
                longitude,
                timezone,
              }}
            />
          </QueryErrorBoundary>
        </Suspense>
      )}
    </>
  );
}
