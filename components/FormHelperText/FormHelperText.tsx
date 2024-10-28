import { ComponentPropsWithRef, forwardRef, PropsWithChildren } from "react";

import cx from "classix";

export const FormHelperText = forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<FormHelperTextProps>
>(function FormHelperText({ children, isError = false, ...initProps }, ref) {
  const { className, ...props } = initProps;

  return (
    <p
      ref={ref}
      className={cx("text-sm", isError && "text-red-600", className)}
      {...props}
    >
      {children}
    </p>
  );
});

export interface FormHelperTextProps extends ComponentPropsWithRef<"p"> {
  isError?: boolean;
}
