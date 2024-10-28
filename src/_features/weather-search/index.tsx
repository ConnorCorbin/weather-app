import { Suspense } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { QueryErrorBoundary } from "../../_components/QueryErrorBoundary";

import {
  locationFormSchema,
  type LocationFormSchema,
} from "./constants/locationFormSchema";
import { LocationSearchInput } from "./components/LocationSearchInput";
import { WeatherResults } from "./components/WeatherResults";

export function WeatherSearch({}) {
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(locationFormSchema),
    defaultValues: {
      id: "",
      latitude: -1,
      longitude: -1,
      timezone: "",
    },
  });

  const onSubmit: SubmitHandler<LocationFormSchema> = (_, e) => {
    // We do not care about submitting data for this form, so prevent the
    // default behavior.
    e?.preventDefault();
  };

  const [latitude, longitude, timezone] = watch([
    "latitude",
    "longitude",
    "timezone",
  ]);

  return (
    <>
      <div className="mx-auto mb-10 max-w-3xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
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
