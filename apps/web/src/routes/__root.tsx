import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
  component: () => (
    <>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
      <Toaster />
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </>
  ),
});
