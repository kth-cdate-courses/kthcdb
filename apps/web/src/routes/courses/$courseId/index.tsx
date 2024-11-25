import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <p>Courses page</p>;
}
