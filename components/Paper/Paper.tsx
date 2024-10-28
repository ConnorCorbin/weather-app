import cx from "classix";
import {
  forwardRef,
  type ComponentPropsWithRef,
  type PropsWithChildren,
} from "react";

export const Paper = forwardRef<HTMLDivElement, PropsWithChildren<PaperProps>>(
  function Paper({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx("overflow-hidden rounded-lg bg-white shadow", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export interface PaperProps extends ComponentPropsWithRef<"div"> {}
