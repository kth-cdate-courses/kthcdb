import Particles from "@/components/ui/particles";
import ShinyButton from "@/components/ui/shiny-button";
import { SearchBox } from "@/routes/-components/search-box";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LoginAvatar } from "./-components/login-avatar";
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
      <a href="https://kthcdb-api.hallkvi.st" className="hidden md:block">
        <ShinyButton className="absolute left-0 z-50 flex md:m-4">
          <p>
            <span className="mr-1 text-xs">🎉 </span>Visit our api
          </p>
        </ShinyButton>
      </a>
      <LoginAvatar className="absolute right-0 z-50 m-2 flex md:p-4" />
      <div className={"shrink md:h-[15dvh]"} />
      <div className="flex w-full flex-col gap-14">
        <div className="z-20 mx-auto flex w-full max-w-[768px] flex-1 grow flex-col">
          <h1 className="font-League-Spartan px-4 py-4 text-lg text-black sm:text-3xl md:text-5xl">
            KTH Course Database
          </h1>
          <SearchBox />
        </div>
        <div className="absolute bottom-0 left-0 mb-10 flex">
          <ReviewMarquee />
        </div>
      </div>
      <div className="flex-[2] shrink" />
    </div>
  );
}
