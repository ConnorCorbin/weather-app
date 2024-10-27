import { forwardRef, type ReactNode } from "react";

import { FormBaseInput, type FormBaseInputProps } from "../FormBaseInput";

export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  function FormTextField({ endAdornment, ...props }, ref) {
    const component = (
      <FormBaseInput ref={ref} className="w-full" type="text" {...props} />
    );

    if (!endAdornment) {
      return component;
    }
    return (
      <div className="flex gap-2">
        {component}
        {endAdornment}
      </div>
    );
  }
);

export interface FormTextFieldProps extends Omit<FormBaseInputProps, "type"> {
  isFull?: boolean;
  endAdornment?: ReactNode;
}
