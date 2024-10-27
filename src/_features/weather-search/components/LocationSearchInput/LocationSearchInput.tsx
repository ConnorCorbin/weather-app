import { useState } from "react";

import {
  useController,
  type UseFormSetValue,
  type Control,
} from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useAutocomplete } from "@mui/base";

import { FormField } from "../../../../../components/FormField";
import { FormLabel } from "../../../../../components/FormLabel";
import { FormSelect } from "../../../../../components/FormSelect";
import { FormBaseInput } from "../../../../../components/FormBaseInput";
import { FormOptionList } from "../../../../../components/FormOptionList/FormOptionList";
import { FormOptionListItem } from "../../../../../components/FormOptionListItem";
import { FormErrorMessage } from "../../../../_components/FormErrorMessage";

import { useGeoLocationSearchQuery } from "../../hooks/useGeoLocationSearch";
import { LocationFormSchema } from "../../constants/locationFormSchema";

export function LocationSearchInput({
  control,
  setValue,
}: LocationSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const nameField = useController<LocationFormSchema, "id">({
    control,
    name: "id",
  });

  const { data: geoLocations } = useGeoLocationSearchQuery({
    filters: {
      name: debouncedSearchTerm,
    },
  });

  const selectedName = geoLocations.find(
    (geoLocation) => geoLocation.id === nameField.field.value
  );

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: geoLocations,
    value: selectedName ?? null,
    filterOptions: (option) => option,
    inputValue: searchTerm,
    onInputChange: (_, newValue) => {
      setSearchTerm(newValue);
    },
    onChange: (_, newValue) => {
      if (newValue) {
        nameField.field.onChange(newValue.id);

        setValue("latitude", newValue.latitude);
        setValue("longitude", newValue.longitude);
        setValue("timezone", newValue.timezone);
      } else {
        nameField.field.onChange("");

        setValue("latitude", 0);
        setValue("longitude", 0);
        setValue("timezone", "");
      }

      return newValue?.id ?? null;
    },
    getOptionLabel: (option) => {
      return option.name;
    },
    getOptionKey: (option) => {
      return option.id;
    },
  });

  // TODO: Add loading indicator.
  // TODO: Add "No results found" option.
  return (
    <FormField className="max-w-96 mx-auto">
      <FormLabel>Search</FormLabel>
      <FormSelect>
        <div {...getRootProps()}>
          <FormBaseInput
            placeholder="Enter a town, city or postal code"
            isFull
            {...getInputProps()}
          />
        </div>
        {groupedOptions.length > 0 && (
          <FormOptionList {...getListboxProps()}>
            {(groupedOptions as typeof geoLocations).map((option, index) => {
              const { key, ...optionProps } = getOptionProps({
                option,
                index,
              });

              return (
                <FormOptionListItem key={key} {...optionProps}>
                  <span className="flex flex-col gap-1">
                    <span>
                      {option.name}{" "}
                      <span className="text-sm">({option.country})</span>
                    </span>
                    {option.admin1 && (
                      <span className="text-xs">{option.admin1}</span>
                    )}
                  </span>
                </FormOptionListItem>
              );
            })}
          </FormOptionList>
        )}
      </FormSelect>
      <FormErrorMessage<LocationFormSchema>
        errors={nameField.formState.errors}
        name="id"
      />
    </FormField>
  );
}

interface LocationSearchInputProps {
  control: Control<LocationFormSchema>;
  setValue: UseFormSetValue<LocationFormSchema>;
}
