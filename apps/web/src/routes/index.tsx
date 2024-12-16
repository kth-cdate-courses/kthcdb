import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Particles from "@/components/ui/particles";
import { SearchBox } from "@/routes/-components/search-box";
import { useSession } from "@/utilities/useSession";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import { z } from "zod";
import { ReviewMarquee } from "./-components/review-marquee";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: z.object({
    searchQuery: z.string().optional(),
    english: z.boolean().optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh w-screen flex-col items-center">
      <Particles
        className="absolute left-0 top-0 -z-50 h-dvh w-dvw opacity-50"
        quantity={500}
        size={0.5}
        ease={10}
        color={"red"}
        refresh
      />
      <LoginAvatar />
      <div className={"shrink md:h-[15dvh]"} />
      <div className="w-full">
        <div className="z-20 mx-auto flex w-full max-w-[768px] flex-1 grow flex-col">
          <h1 className="font-League-Spartan px-4 py-4 text-3xl text-black md:text-5xl">
            KTH Course Database
          </h1>
          <SearchBox />
        </div>
        <div className="absolute bottom-10 left-0">{<ReviewMarquee />}</div>
      </div>
      <div className="flex-[2] shrink" />
    </div>
  );
}

function LoginAvatar() {
  const navigate = useNavigate();
  const { data, isLoading } = useSession();
  const isAuthorized = data?.data?.authenticated;

  function onClickAvatar() {}

  if (isLoading) return null;

  return (
    <div className="flex w-full justify-end p-4">
      {isAuthorized ? (
        <DropdownMenu onOpenChange={onClickAvatar}>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5 w-52">
            <DropdownMenuLabel className="capitalize">
              {data.data?.user?.name} {data.data?.user?.surname}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOutIcon /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate({ to: "/signin" })}>
          <LogInIcon /> Log in
        </Button>
      )}
    </div>
  );
}
