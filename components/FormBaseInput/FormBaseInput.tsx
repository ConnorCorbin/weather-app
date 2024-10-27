import cx from "classix";
import { forwardRef, type ComponentPropsWithRef } from "react";

export const FormBaseInput = forwardRef<HTMLInputElement, FormBaseInputProps>(
  function FormbaseInput({ className, isFull, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cx(isFull && "w-full", className)}
        {...props}
      />
    );
  }
);

export interface FormBaseInputProps extends ComponentPropsWithRef<"input"> {
  isFull?: boolean;
}
