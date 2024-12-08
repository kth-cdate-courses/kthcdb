import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { Rating } from "@/routes/-components/rating";
import { api } from "@/utilities/http-client";
import { cn } from "@/utilities/shadcn-utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  GraduationCapIcon,
  LanguagesIcon,
  LoaderCircleIcon,
} from "lucide-react";

export function SearchBox() {
  const navigate = useNavigate({
    from: "/",
  });
  const { searchQuery, english } = useSearch({
    from: "/",
  });

  const { data, isLoading } = useQuery({
    enabled: searchQuery != null && searchQuery.length > 0,
    queryKey: ["courses", searchQuery, english],
    queryFn: async () =>
      api.courses.search.get({
        query: {
          search: searchQuery,
          english,
        },
      }),
  });

  const listShowing =
    isLoading || (data?.data != null && data.data.courses.length > 0);

  const courses = data?.data?.courses.slice(0, 4);
  const otherCourses = data?.data?.courses.slice(4);

  return (
    <div className="mb-10 flex w-full flex-col bg-zinc-50 p-4 md:rounded-lg">
      <div className="relative">
        <div className="flex items-center gap-2 rounded-lg pb-2">
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
            <p className="text-xs">Available in english</p>
          </Toggle>
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
        {courses?.map((course) => (
          <Link
            key={course.code}
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

              <Rating rating={course.rating} />
            </div>
          </Link>
        ))}
        {(otherCourses ?? [])?.length > 0 && (
          <div className="mt-2 flex flex-wrap">
            {otherCourses?.map((course) => (
              <Link
                key={course.code}
                to="/courses/$courseId"
                params={{
                  courseId: course.code,
                }}
              >
                <div className="flex cursor-pointer gap-2 rounded-lg p-2 hover:bg-zinc-200/60">
                  <Badge>{course.code}</Badge>
                  <Rating rating={course.rating} variant="small" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
