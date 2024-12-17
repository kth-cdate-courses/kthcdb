import { ExaminationRound } from "$api/kth-api/course-details/type";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "@/routes/courses/$courseId/-components/review-form";
import { api } from "@/utilities/http-client";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  useParams,
} from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { ExaminationCard } from "./-components/examination-card";

export const Route = createFileRoute("/courses/$courseId/")({
  component: RouteComponent,
  notFoundComponent() {
    return (
      <div className="flex h-dvh flex-col items-center justify-center">
        <h1 className="text-6xl">Oups</h1>
        <h2 className="text-3xl text-opacity-50">
          Looks like the course you were looking for doesn't exist
        </h2>
        <Link to="/">
          <Button variant="secondary" className="mt-10">
            Back to home
          </Button>
        </Link>
      </div>
    );
  },
});

const dummyRounds: ExaminationRound[] = [
  {
    examCode: "LAB1",
    title: "Laboratory assignments",
    gradeScaleCode: "AF",
    credits: 4,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
  {
    examCode: "MAS1",
    title: "Individual master's test",
    gradeScaleCode: "AF",
    credits: 1.5,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
  {
    examCode: "MAS2",
    title: "Individual master's test",
    gradeScaleCode: "AF",
    credits: 1.5,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
  {
    examCode: "TEN1",
    title: "Theory examination",
    gradeScaleCode: "PF",
    credits: 2.5,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
];

function RouteComponent() {
  const { courseId } = useParams({
    from: "/courses/$courseId/",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () =>
      api.courses.course.get({
        query: {
          courseCode: courseId,
        },
      }),
  });

  if (isLoading) {
    return (
      <div className="flex h-dvh w-dvw items-center justify-center">
        <LoaderCircleIcon className="animate-spin" size={40} />
      </div>
    );
  }

  const course = data?.data?.course;
  if (course == null || data?.data?.rounds == null) {
    throw notFound({
      routeId: "/courses/$courseId/",
    });
  }

  return (
    <div>
      <p>Courses page</p>
      <h1 className="text-2xl">
        {course.title} - {course.code}
      </h1>
      <h2>{course.description}</h2>
      <ExaminationCard rounds={dummyRounds} />
      {}
      <ReviewForm courseRounds={data.data.rounds} />
    </div>
  );
}
