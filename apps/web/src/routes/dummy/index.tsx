import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dummy/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["dummy"],
    queryFn: async () =>
      fetch("http://localhost:3000/api/dummy").then((res) => res.json()),
  });

  return (
    <div>
      <p>DATA: {JSON.stringify(data)}</p>
      <p>LOADING: {isLoading ? "true" : "false"}</p>
    </div>
  );
}
