import { createFileRoute } from "@tanstack/react-router";
import { ProfileCard } from "./-components/profile-card";

export const Route = createFileRoute("/accounts/$accountId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="my-auto flex h-dvh flex-row items-center">
      <ProfileCard></ProfileCard>
    </div>
  );
}
