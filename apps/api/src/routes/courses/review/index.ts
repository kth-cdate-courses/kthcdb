import { authPlugin } from "@/routes/auth/auth-plugin";
import { aggregateCourseRating } from "@/routes/courses/review/course-rating";
import { ReviewDto } from "@/routes/courses/review/review-dto";
import { prisma } from "@/utilities/db";
import Elysia, { t } from "elysia";

export const reviewRoute = new Elysia({
  prefix: "/review",
})
  .use(authPlugin)
  .post(
    "/",
    async ({ user, body }) => {
      if (user == null) return { success: false, message: "Not logged in" };

      // Check that the user hasn't already reviewed this course
      const existingReview = await prisma.review.findUnique({
        where: {
          userId_courseRoundId: {
            userId: user.id,
            courseRoundId: body.courseRoundId,
          },
        },
      });
      if (existingReview != null) {
        return {
          success: false,
          message: "You have already reviewed this course",
        };
      }

      // Check that the course exists
      const courseRound = await prisma.courseRound.findUnique({
        where: { id: body.courseRoundId },
      });
      if (courseRound == null) {
        return { success: false, message: "Course does not exist" };
      }

      await prisma.review.create({
        data: {
          courseRoundId: courseRound.id,
          userId: user.id,
          rating: body.rating,
          body: body.comment,
        },
      });

      // TODO[optimization] This is a heavy operation, should not be performed on every review submit
      // It should be sent into a queue and processed in the background
      await aggregateCourseRating(courseRound.courseId);

      return { success: true, message: "Successfully submitted review" };
    },
    {
      body: t.Object({
        courseRoundId: t.String({
          description: "The id of the specific course round you want to review",
        }),
        rating: t.Number({
          minimum: 1,
          maximum: 5,
          error: "Rating must be between 1 and 5",
        }),
        comment: t.Optional(t.String()),
      }),
      tags: ["Courses"],
      detail: {
        description: "Post a review, requires an authenticated user",
      },
    },
  )
  .get(
    "/",
    async ({ query: { count, courses, term, rating } }) => {
      const randomReviews = await prisma.review.findMany({
        orderBy: { updatedAt: "desc" },
        take: count ?? 20,
        where: {
          rating: rating,
          courseRound: {
            term: term,
            course: {
              courseCode: {
                in: courses,
              },
            },
          },
        },
        include: {
          courseRound: {
            select: {
              id: true,
              course: {
                select: {
                  courseCode: true,
                },
              },
            },
          },
          user: {
            select: {
              name: true,
              surname: true,
            },
          },
        },
      });

      return randomReviews.map(
        (review) =>
          ({
            id: review.id,
            courseCode: review.courseRound.course.courseCode,
            courseRoundId: review.courseRound.id,
            rating: review.rating,
            comment: review.body,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            userId: review.userId,
            author: `${review.user.name} ${review.user.surname}`,
          }) satisfies ReviewDto,
      );
    },
    {
      query: t.Object({
        term: t.Optional(
          t.String({
            title: "Search term",
            description: "eg 20243, year+period",
          }),
        ),
        count: t.Optional(
          t.Number({
            minimum: 1,
            maximum: 100,
            error: "Count must be between 1 and 100",
            description: "Number of reviews to get",
          }),
        ),
        courses: t.Optional(
          t.Array(t.String(), {
            title: "Course code",
            description: 'eg: ["SF1320"]',
          }),
        ),
        rating: t.Optional(
          t.Number({
            minimum: 1,
            maximum: 5,
            title: "Rating",
            error: "Rating must be between 1 and 5",
            description: 'The rating of the review, eg "2"',
          }),
        ),
      }),
      tags: ["Courses"],
    },
  );
