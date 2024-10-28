import { PropsWithChildren } from "react";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

export function QueryErrorBoundary({
  children,
}: PropsWithChildren<QueryErrorBoundaryProps>) {
  // TODO: style generic error boundary and ability to reset the error
  // boundary. Currently, it has been left very basic.

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="text-red-600">
              There was an error! Click{" "}
              <button
                className="text-red-600 font-bold "
                type="button"
                onClick={() => resetErrorBoundary()}
              >
                here
              </button>{" "}
              to try again
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export interface QueryErrorBoundaryProps {}
