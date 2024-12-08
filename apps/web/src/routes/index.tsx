import Particles from "@/components/ui/particles";
import { SearchBox } from "@/routes/-components/search-box";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

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
        className="absolute left-0 top-0 -z-10 h-dvh w-dvw opacity-20"
        quantity={1000}
        ease={10}
        color={"red"}
        refresh
      />
      <div className={"shrink md:h-[15dvh]"} />
      <div className="mx-auto flex w-full max-w-[768px] flex-1 grow flex-col">
        <h1 className="font-League-Spartan px-4 py-4 text-3xl text-black md:text-5xl">
          KTH Course Database
        </h1>
        <SearchBox />
      </div>
      <div className="flex-[2] shrink" />
    </div>
  );
}
