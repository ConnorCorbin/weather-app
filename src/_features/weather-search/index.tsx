import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { locationFormSchema } from "./constants/locationFormSchema";
import { LocationSearchInput } from "./components/LocationSearchInput";

export function WeatherSearch({}) {
  const { control, setValue } = useForm({
    resolver: yupResolver(locationFormSchema),
    defaultValues: {
      id: "",
      latitude: 0,
      longitude: 0,
      timezone: "",
    },
  });

  return (
    <div className="space-y-2">
      <form>
        <LocationSearchInput control={control} setValue={setValue} />
      </form>
      <div>TODO: search results...</div>
    </div>
  );
}
