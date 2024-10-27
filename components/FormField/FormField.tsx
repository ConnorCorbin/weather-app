import cx from "classix";
import {
  ComponentPropsWithRef,
  forwardRef,
  type PropsWithChildren,
} from "react";

export const FormField = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FormFieldProps>
>(function FormField({ children, className, ...props }, ref) {
  return (
    <div ref={ref} className={cx("space-y-0.5", className)} {...props}>
      {children}
    </div>
  );
});

export interface FormFieldProps extends ComponentPropsWithRef<"div"> {}
