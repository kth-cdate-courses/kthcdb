import { authPlugin } from "@/routes/auth/auth-plugin";
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
      const course = await prisma.courseRound.findUnique({
        where: { id: body.courseRoundId },
      });
      if (course == null) {
        return { success: false, message: "Course does not exist" };
      }

      await prisma.review.create({
        data: {
          courseRoundId: course.id,
          userId: user.id,
          rating: body.rating,
          body: body.comment,
        },
      });

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
