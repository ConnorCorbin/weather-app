import { forwardRef, type ComponentPropsWithoutRef } from "react";

import cx from "classix";

export const FormOptionListItem = forwardRef<
  HTMLLIElement,
  FormOptionListItemProps
>(function FormOptionListItem({ children, className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={cx(
        "list-none p-2 rounded",
        "aria-selected:bg-blue-100 aria-selected:text-blue-900 aria-selected:cursor-default",
        "hover:bg-gray-100 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
});

interface FormOptionListItemProps extends ComponentPropsWithoutRef<"li"> {}
