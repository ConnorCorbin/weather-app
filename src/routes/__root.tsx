import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">hello world</div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
