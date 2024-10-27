import { forwardRef, type ComponentPropsWithoutRef } from "react";

import cx from "classix";

export const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  function FormSelect({ children, className, ...props }, ref) {
    return (
      <div ref={ref} className={cx("relative", className)} {...props}>
        {children}
      </div>
    );
  }
);

interface FormSelectProps extends ComponentPropsWithoutRef<"div"> {}
