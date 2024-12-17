import { authPlugin } from "@/routes/auth/auth-plugin";
import { aggregateCourseRating } from "@/routes/courses/review/course-rating";
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
        courseRoundId: t.String(),
        rating: t.Number(),
        comment: t.Optional(t.String()),
      }),
    },
  );
