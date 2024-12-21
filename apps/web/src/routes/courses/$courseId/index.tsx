import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InlineReview } from "@/routes/courses/$courseId/-components/inline-review";
import { ReviewFiltering } from "@/routes/courses/$courseId/-components/review-filtering";
import { SubmitReviewCard } from "@/routes/courses/$courseId/-components/submit-review-card";
import { stripNullKeys } from "@/routes/courses/$courseId/-utils/strip_null_keys";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { cn } from "@/utilities/shadcn-utils";
import { useSession } from "@/utilities/useSession";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { z } from "zod";
import { CourseDescriptionCard } from "./-components/description-card";
import { RatingChartCard } from "./-components/rating-chart-card";
import { TitleCard } from "./-components/title-card";

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
  validateSearch: z.object({
    tab: z.string().default("reviews"),
    courseRoundId: z.string().optional(),
    rating: z.number().optional(),
    page: z.number().default(0),
  }),
});

/* const dummyRounds: ExaminationRound[] = [
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
]; */

function RouteComponent() {
  const { user } = useSession();
  const navigate = useNavigate({
    from: "/courses/$courseId",
  });
  const { tab, rating, courseRoundId, page } = useSearch({
    from: "/courses/$courseId/",
  });
  const { isAuthenticated } = useSession();
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

  const { data: reviewData } = useQuery({
    queryKey: [
      QueryKey.Review,
      courseId,
      CountQueuingStrategy,
      page,
      courseRoundId,
      rating,
    ],
    queryFn: async () => {
      return api.courses.review.index.get({
        query: stripNullKeys({
          count: 20,
          page,
          courses: [courseId],
          courseRoundId,
          rating,
        }),
      });
    },
  });
  const { data: ownReviews } = useQuery({
    queryKey: [
      QueryKey.Review,
      courseId,
      CountQueuingStrategy,
      page,
      courseRoundId,
      rating,
      user?.id,
    ],
    queryFn: async () =>
      await api.courses.review.index.get({
        query: {
          page,
          courses: [courseId],
          userId: user?.id,
        },
        fetch: {
          credentials: "include",
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
    <div className="grid w-full grid-cols-1 gap-8 px-4 py-10">
      <TitleCard courseData={course} />
      {/* <ExaminationCard rounds={dummyRounds} /> */}
      <ReviewFiltering rounds={data.data.rounds} />
      <CourseDescriptionCard data={course} />
      <Tabs
        value={tab}
        onValueChange={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              tab: value,
            }),
          })
        }
      >
        <TabsList className="flex w-full justify-between">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          {isAuthenticated && (
            <TabsTrigger value="your-review">Your review</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="reviews">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {reviewData?.data?.map((review) => (
              <InlineReview review={review} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="statistics" hidden={course?.id == null}>
          <RatingChartCard
            courseId={course.id!}
            courseRoundId={courseRoundId}
          />
        </TabsContent>
        {isAuthenticated && (
          <TabsContent value="your-review">
            <SubmitReviewCard
              courseRounds={data.data.rounds.filter(
                (round) =>
                  !ownReviews?.data?.some(
                    (review) => review.courseRoundId === round.id,
                  ),
              )}
            />
            <div className="flex flex-col gap-2 py-5">
              {ownReviews &&
                ownReviews.data?.map((review) => (
                  <InlineReview review={review} />
                ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
      {(reviewData?.data?.length ?? 0) >= 20 && (
        <div className="flex w-full items-center justify-between">
          <Button
            disabled={page <= 0}
            className={cn({
              "!opacity-0": page <= 0,
            })}
            onClick={() => navigate({ search: { page: page - 1 } })}
          >
            <ArrowLeftIcon />
          </Button>
          <div className="flex size-8 items-center justify-center rounded-full bg-zinc-100">
            {page + 1}
          </div>
          <Button onClick={() => navigate({ search: { page: page + 1 } })}>
            <ArrowRightIcon />
          </Button>
        </div>
      )}
      <div className="fixed bottom-0 left-0 flex h-14 w-dvw max-w-[1000px] items-center justify-center border-0 border-t-[1px] border-zinc-300 bg-zinc-100 px-2 transition-all duration-200 lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-lg lg:border-[1px]">
        <Link to="/" className="w-full">
          <Button className="flex w-full gap-2" variant="outline">
            <HomeIcon /> Back to search
          </Button>
        </Link>
      </div>
    </div>
  );
}
