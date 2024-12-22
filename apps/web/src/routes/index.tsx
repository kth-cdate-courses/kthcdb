import Particles from "@/components/ui/particles";
import { SearchBox } from "@/routes/-components/search-box";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ReviewMarquee } from "./-components/review-marquee";
import { LoginAvatar } from "./-components/login-avatar";

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
      <LoginAvatar className="absolute right-0 m-2 flex md:p-4" />
      <div className={"shrink md:h-[15dvh]"} />
      <div className="w-full">
        <div className="z-20 mx-auto flex w-full max-w-[768px] flex-1 grow flex-col">
          <h1 className="font-League-Spartan px-4 py-4 text-lg text-black sm:text-3xl md:text-5xl">
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
