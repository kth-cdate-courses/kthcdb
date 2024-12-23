import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

export function BackToSearchBar() {
  return (
    <div className="fixed bottom-0 left-0 flex h-14 w-dvw max-w-[1000px] items-center justify-center border-0 border-t-[1px] border-zinc-300 bg-zinc-100 px-2 transition-all duration-200 lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-lg lg:border-[1px]">
      <Link to="/" className="w-full">
        <Button className="flex w-full gap-2" variant="outline">
          <HomeIcon /> Back to search
        </Button>
      </Link>
    </div>
  );
}
