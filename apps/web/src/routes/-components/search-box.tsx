import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "@/components/ui/star";
import { api } from "@/utilities/http-client";
import { cn } from "@/utilities/shadcn-utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { GraduationCapIcon, LoaderCircleIcon } from "lucide-react";

export function SearchBox() {
  const navigate = useNavigate({
    from: "/",
  });
  const { searchQuery } = useSearch({
    from: "/",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["courses", searchQuery],
    queryFn: async () =>
      api.courses.search.get({
        query: {
          search: searchQuery,
        },
      }),
  });

  const listShowing =
    isLoading || (data?.data != null && data.data.courses.length > 0);

  return (
    <div className="flex w-full flex-col bg-zinc-50 p-4 md:rounded-lg">
      <div className="relative">
        <Input
          placeholder="Search for courses"
          autoFocus
          value={searchQuery}
          onChange={(event) =>
            navigate({
              search: (prev) => ({
                ...prev,
                searchQuery: event.target.value,
              }),
            })
          }
        />
        {isLoading && (
          <LoaderCircleIcon
            className="absolute right-2 top-2 animate-spin"
            size={18}
          />
        )}
      </div>
      <div
        className={cn(
          "mt-5 flex flex-1 flex-col gap-2 transition-all duration-700",
          {
            "mt-0": !listShowing,
          },
        )}
      >
        {isLoading && (
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}
        {data?.data?.courses?.map((course) => (
          <Link
            to="/courses/$courseId"
            params={{
              courseId: course.code,
            }}
          >
            <div className="group flex cursor-pointer justify-between gap-4 rounded-lg p-4 hover:bg-zinc-200/60 active:opacity-70">
              <div className="flex items-center gap-4">
                <GraduationCapIcon className="shrink-0" />
                <Badge className="h-min shrink-0 text-nowrap">
                  {course.code}
                </Badge>
                <p
                  className={cn("shrink group-hover:opacity-80", {
                    "text-sm": course.title.length > 40,
                  })}
                >
                  {course.title}
                </p>
              </div>

              <div className="flex items-center">
                <p className="mr-2 text-center text-muted-foreground">
                  {course.rating.toFixed(1)}
                </p>
                <Star rating={1} filled={course.rating > 0.5} viewOnly />
                <Star
                  className="hidden md:block"
                  rating={2}
                  filled={course.rating > 1.5}
                  viewOnly
                />
                <Star
                  className="hidden md:block"
                  rating={3}
                  filled={course.rating > 2.5}
                  viewOnly
                />
                <Star
                  className="hidden md:block"
                  rating={4}
                  filled={course.rating > 3.5}
                  viewOnly
                />
                <Star
                  className="hidden md:block"
                  rating={5}
                  filled={course.rating > 4.5}
                  viewOnly
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
