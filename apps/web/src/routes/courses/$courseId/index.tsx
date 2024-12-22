import { CourseDto } from "$api/routes/courses/course-dto";
import { CourseRoundDto } from "$api/routes/courses/course-round-dto";
import { ReviewDto } from "$api/routes/courses/review/review-dto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  MessageSquarePlusIcon,
} from "lucide-react";
import { z } from "zod";
import { CourseDescriptionCard } from "./-components/description-card";
import { RatingChartCard } from "./-components/rating-chart-card";
import { CourseTitleSection } from "./-components/title-card";

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

function RouteComponent() {
  const { user } = useSession();
  const navigate = useNavigate({
    from: "/courses/$courseId",
  });
  const { rating, courseRoundId, page } = useSearch({
    from: "/courses/$courseId/",
  });
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
    <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <CourseTitleSection courseData={course} />
        <CourseDescriptionCard data={course} />
      </div>
      {/* <ExaminationCard rounds={dummyRounds} /> */}
      <div className="flex flex-col justify-between">
        <div className="flex w-full justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hidden gap-2 md:flex">
                <MessageSquarePlusIcon /> Add a review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <SubmitReviewCard
                courseRounds={
                  data.data.rounds?.filter(
                    (round) =>
                      !ownReviews?.data?.some(
                        (review) => review.courseRoundId === round.id,
                      ),
                  ) ?? []
                }
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex-1 shrink" />
        <div className="flex w-full flex-1 items-end justify-end">
          <div className="flex w-full flex-col gap-2">
            <p className="text-lg">Apply review filters</p>
            <ReviewFiltering rounds={data.data.rounds} />
          </div>
        </div>
      </div>
      <div className="col-span-2 hidden md:block">
        <DesktopLayout reviewData={reviewData?.data ?? null} course={course} />
      </div>
      <TabLayout
        reviewData={reviewData?.data ?? null}
        course={course}
        ownReviews={ownReviews?.data ?? null}
        rounds={data.data.rounds ?? null}
      />

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

function DesktopLayout({
  reviewData,
  course,
}: {
  reviewData: ReviewDto[] | null;
  course: CourseDto;
}) {
  const { courseRoundId } = useSearch({
    from: "/courses/$courseId/",
  });
  return (
    <div className="grid flex-1 grid-cols-2 gap-8 pb-20">
      <div className="col-span-2">
        <RatingChartCard courseId={course.id!} courseRoundId={courseRoundId} />
      </div>
      <div className="col-span-2 grid w-full grid-cols-2 gap-8">
        {reviewData?.map((review) => (
          <InlineReview className="" review={review} />
        ))}
      </div>
    </div>
  );
}

function TabLayout({
  reviewData,
  course,
  ownReviews,
  rounds,
}: {
  reviewData: ReviewDto[] | null;
  course: CourseDto;
  ownReviews: ReviewDto[] | null;
  rounds: CourseRoundDto[] | null;
}) {
  const { isAuthenticated } = useSession();
  const { tab, courseRoundId } = useSearch({
    from: "/courses/$courseId/",
  });
  const navigate = useNavigate({
    from: "/courses/$courseId",
  });
  return (
    <Tabs
      className="md:hidden"
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
          {reviewData?.map((review) => <InlineReview review={review} />)}
        </div>
      </TabsContent>
      <TabsContent value="statistics" hidden={course?.id == null}>
        <RatingChartCard courseId={course.id!} courseRoundId={courseRoundId} />
      </TabsContent>
      {isAuthenticated && (
        <TabsContent value="your-review">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="mb-1">Submit Review</CardTitle>
            </CardHeader>
            <CardContent>
              <SubmitReviewCard
                courseRounds={
                  rounds?.filter(
                    (round) =>
                      !ownReviews?.some(
                        (review) => review.courseRoundId === round.id,
                      ),
                  ) ?? []
                }
              />
            </CardContent>
          </Card>
          <div className="flex flex-col gap-2 py-5">
            {ownReviews &&
              ownReviews.map((review) => <InlineReview review={review} />)}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
