import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <p>Search page</p>;
}
