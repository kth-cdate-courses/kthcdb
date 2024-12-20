import { ExaminationRound } from "$api/kth-api/course-details/type";
import { Button } from "@/components/ui/button";
import { SubmitReviewCard } from "@/routes/courses/$courseId/-components/submit-review-card";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useSession } from "@/utilities/useSession";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  useParams,
} from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { ExaminationCard } from "./-components/examination-card";
import { CourseDescriptionCard } from "./-components/description-card";
import { ReviewFilters, ReviewsCard } from "./-components/reviews-card";
import { useState } from "react";
import { TitleCard } from "./-components/title-card";
import { RatingChart } from "./-components/rating-chart";

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
  const { data: userSessionData } = useSession();
  const { courseId } = useParams({
    from: "/courses/$courseId/",
  });

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Course, courseId],
    queryFn: async () =>
      api.courses.course.get({
        query: {
          courseCode: courseId,
        },
      }),
  });

  const [reviewFilters, setReviewFilters] = useState<ReviewFilters>({
    rating: null,
    term: null,
  });

  const { data: reviewData, isLoading: reviewDataIsLoading } = useQuery({
    queryKey: [QueryKey.Review, courseId, reviewFilters],
    queryFn: async () => {
      const { term, rating } = reviewFilters;
      const query = {
        count: 5,
        courses: [courseId],
        ...(term && { term }),
        ...(rating && { rating }),
      };
      return api.courses.review.index.get({ query });
    },
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

  const reviewDataSanitized =
    !reviewData || !(reviewData.data && reviewData.data.length > 0)
      ? null
      : reviewData?.data;

  return (
    <div>
      <TitleCard courseData={course} />
      <ExaminationCard rounds={dummyRounds} />
      <CourseDescriptionCard data={course} />

      <ReviewsCard
        data={data.data}
        reviews={reviewDataSanitized}
        filters={reviewFilters}
        onUpdateFilters={(newFilters) => setReviewFilters(newFilters)}
      />
      {userSessionData?.data?.authenticated && (
        <SubmitReviewCard courseRounds={data.data.rounds} />
      )}
      <RatingChart reviewData={reviewDataSanitized} />
    </div>
  );
}
