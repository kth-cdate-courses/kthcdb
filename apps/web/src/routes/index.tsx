import { SearchBox } from "@/routes/-components/search-box";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: z.object({
    searchQuery: z.string().optional(),
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh w-screen flex-col items-center">
      <img
        src="/landing-image.jpg"
        alt="logo"
        className="fixed -z-10 h-dvh w-full object-cover brightness-50"
      />

      <div className={"shrink md:h-[15dvh]"} />
      <div className="mx-auto flex w-full max-w-[768px] flex-1 grow flex-col">
        <h1 className="font-League-Spartan px-4 py-4 text-3xl text-white md:text-5xl">
          KTH Course Database
        </h1>
        <SearchBox />
      </div>
      <div className="flex-[2] shrink" />
    </div>
  );
}
