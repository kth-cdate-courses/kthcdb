import { createFileRoute } from "@tanstack/react-router";
import { ProfileCard } from "./-components/profile-card";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { ReviewsCard } from "./-components/reviews-card";
import { LoginAvatar } from "@/routes/-components/login-avatar";
import { BackToSearchBar } from "@/routes/-components/back-to-search-bar";
import Particles from "@/components/ui/particles";

export const Route = createFileRoute("/accounts/$accountId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { accountId } = useParams({
    from: "/accounts/$accountId/",
  });

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.UserAccount, accountId],
    queryFn: async () =>
      api.user.index.get({
        query: {
          userId: accountId,
        },
      }),
  });

  if (isLoading) {
    return (
      <div className="flex h-dvh w-dvw items-center justify-center">
        <LoaderCircleIcon className="animate-spin" size={40} />
      </div>
    );
  }

  const userData = data?.data;
  if (!userData) {
    return "User not found.";
  }

  return (
    <div>
      <Particles
        className="absolute left-0 top-0 -z-50 h-dvh w-dvw opacity-50"
        quantity={500}
        size={0.5}
        ease={10}
        color={"red"}
        refresh
      />
      <LoginAvatar className="absolute right-0 flex justify-end p-4" />
      <div className="mx-auto mt-4 flex w-[60dvw] flex-col items-center gap-4">
        <ProfileCard userData={userData}></ProfileCard>
        <ReviewsCard userData={userData}></ReviewsCard>
        <BackToSearchBar />
      </div>
    </div>
  );
}
