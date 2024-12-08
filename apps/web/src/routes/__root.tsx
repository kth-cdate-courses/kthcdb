import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      {process.env.NODE_ENV === "developtment" && <TanStackRouterDevtools />}
    </>
  ),
});
