import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "@/components/ui/star";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { GraduationCapIcon, LoaderCircleIcon } from "lucide-react";

type CourseSearchResult = {
  id: string;
  name: string;
  code: string;
  rating: number;
};

const fakeData = [
  {
    id: "1",
    name: "Discrete Mathematics",
    code: "SF1688",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Linear Algebra",
    code: "SF1624",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Calculus",
    code: "SF1610",
    rating: 4.0,
  },
  {
    id: "4",
    name: "Programming",
    code: "SF1611",
    rating: 4.8,
  },
] satisfies CourseSearchResult[];

export function SearchBox() {
  const navigate = useNavigate({
    from: "/",
  });
  const { searchQuery } = useSearch({
    from: "/",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["courses", searchQuery],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (searchQuery == null || searchQuery.length === 0) {
        return [];
      }
      return fakeData;
    },
  });

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
          className="mt-2"
        />
        {isLoading && (
          <LoaderCircleIcon
            className="absolute right-2 top-2 animate-spin"
            size={18}
          />
        )}
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-2">
        {isLoading && (
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}
        {data?.map((course) => (
          <div className="group flex cursor-pointer justify-between gap-4 rounded-lg p-4 hover:bg-zinc-200/60 active:opacity-70">
            <div className="flex gap-4">
              <GraduationCapIcon />
              <Badge className="">{course.code}</Badge>
              <p className="group-hover:opacity-80">{course.name}</p>
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
        ))}
      </div>
    </div>
  );
}
