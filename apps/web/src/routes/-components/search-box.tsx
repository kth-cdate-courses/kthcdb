import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberTicker from "@/components/ui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CourseLargeResult } from "@/routes/-components/course-large-result";
import { Rating } from "@/routes/-components/rating";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { cn } from "@/utilities/shadcn-utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRightIcon, LanguagesIcon, LoaderCircleIcon } from "lucide-react";

export function SearchBox() {
  const navigate = useNavigate({
    from: "/",
  });
  const { searchQuery, english } = useSearch({
    from: "/",
  });

  const { data, isLoading } = useQuery({
    enabled: searchQuery != null && searchQuery.length > 0,
    queryKey: [QueryKey.Search, searchQuery, english],
    queryFn: async () =>
      api.courses.search.get({
        query: {
          search: searchQuery,
          english: english ?? false,
        },
        fetch: {
          credentials: "include",
        },
      }),
  });

  const listShowing =
    isLoading || (data?.data != null && data.data.courses.length > 0);

  const courses = data?.data?.courses.slice(0, 4);
  const otherCourses = data?.data?.courses.slice(4);

  const courseItemRest = 5 - ((otherCourses ?? [])?.length % 5);

  return (
    <div className="z-30 mb-10 flex w-full flex-col border-[1px] border-zinc-200 bg-zinc-50 p-4 md:rounded-lg">
      <div className="relative">
        <div className="flex items-center justify-between gap-2 rounded-lg pb-2">
          <Toggle
            variant={"outline"}
            size={"sm"}
            pressed={english}
            onPressedChange={(e) =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  english: e,
                }),
              })
            }
          >
            <LanguagesIcon size={15} />
            <p className="hidden text-nowrap text-xs sm:block">
              Available in English
            </p>
          </Toggle>
          <Link to="/courses">
            <Button className="flex gap-2" variant="outline" size="sm">
              Most loved courses <ArrowRightIcon />
            </Button>
          </Link>
        </div>
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
        {data?.data?.courses != null && (
          <p className="mt-1 text-xs text-primary/70">
            {data.data.courses.length > 0 ? (
              <p>
                Found{" "}
                <NumberTicker delay={0} value={data.data.courses.length} />{" "}
                courses
              </p>
            ) : (
              "Could not find any courses matching the search query"
            )}
          </p>
        )}
        {isLoading && (
          <LoaderCircleIcon
            className="absolute right-2 top-12 animate-spin"
            size={18}
          />
        )}
      </div>
      <div
        className={cn(
          "mt-1 flex flex-1 flex-col gap-2 transition-all duration-700",
          {
            "mt-0": !listShowing,
          },
        )}
      >
        {isLoading && (
          <div className="mt-4 flex w-full flex-col gap-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}
        {courses?.map((course) => (
          <Link
            key={course.code}
            to="/courses/$courseId"
            params={{
              courseId: course.code,
            }}
          >
            <CourseLargeResult course={course} />
          </Link>
        ))}
        <div className="flex justify-center">
          {(otherCourses ?? [])?.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-between">
              {otherCourses?.map((course) => (
                <Link
                  key={course.code}
                  to="/courses/$courseId"
                  params={{
                    courseId: course.code,
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex cursor-pointer gap-2 rounded-lg p-2 hover:bg-zinc-200/60">
                        <Badge className="font-mono">{course.code}</Badge>
                        <Rating
                          rating={course.rating}
                          reviewCount={course.reviewCount}
                          variant="small"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{course.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              ))}
              {/* Filler elements to keep the list adjusted correctly (for justify-between) */}
              {Array(courseItemRest)
                .fill(0)
                .map((_, index) => (
                  <div className="flex gap-2 p-2 opacity-0" key={index}>
                    <Badge className="font-mono">______</Badge>
                    <Rating variant="small" rating={0} reviewCount={0} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
