import cx from "classix";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const FormOptionList = forwardRef<HTMLUListElement, FormOptionListProps>(
  function FormOptionList({ children, className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        className={cx(
          "p-1.5 my-3 bg-white max-h-80 overflow-auto shadow z-10 absolute left-0 right-0 rounded border-gray-200",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

interface FormOptionListProps extends ComponentPropsWithoutRef<"ul"> {}
