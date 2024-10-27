import {
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { FormHelperText } from "../../../components/FormHelperText";

export function FormErrorMessage<TFieldValues extends FieldValues>({
  errors,
  name,
}: FormErrorMessageProps<TFieldValues>) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <FormHelperText isError>{message}</FormHelperText>
      )}
    />
  );
}

interface FormErrorMessageProps<TFieldValues extends FieldValues> {
  errors: FieldErrors;
  name: FieldPath<TFieldValues>;
}
