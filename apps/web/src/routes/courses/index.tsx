import { BackToSearchBar } from "@/routes/-components/back-to-search-bar";
import { CourseLargeResult } from "@/routes/-components/course-large-result";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/")({
  component: CoursesPage,
});

function CoursesPage() {
  const { data: courses } = useQuery({
    queryKey: [QueryKey.Courses],
    queryFn: async () => {
      const response = await api.courses.index.get({
        query: {
          ordering: "descending",
        },
      });
      return response.data;
    },
  });
  return (
    <div className="mx-auto flex max-w-[600px] flex-col">
      <h1 className="py-5 text-center text-3xl">Courses (best)</h1>
      <div className="flex flex-col">
        {courses?.map((course) => (
          <Link
            key={course.id}
            to="/courses/$courseId"
            params={{ courseId: course.code }}
          >
            <CourseLargeResult course={course} />
          </Link>
        ))}
      </div>
      <BackToSearchBar />
    </div>
  );
}
