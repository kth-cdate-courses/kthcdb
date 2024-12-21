import { prisma } from "@/utilities/db";
import Elysia, { t } from "elysia";
import { ReviewDto } from "../courses/review/review-dto";
import { UserDto } from "./user-dto";

export const userRoute = new Elysia({
  prefix: "/user",
}).get(
  "/",
  async ({ query: { userId } }) => {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        surname: true,
        createdAt: true,
        programCode: true,
        reviews: {
          include: {
            courseRound: {
              select: {
                course: {
                  select: {
                    courseCode: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!userInfo) {
      return null;
    }

    return {
      id: userId,
      name: userInfo.name,
      surname: userInfo.surname,
      userCreatedDate: userInfo.createdAt,
      reviews: userInfo.reviews.map(
        (review) =>
          ({
            id: review.id,
            courseCode: review.courseRound.course.courseCode,
            courseRoundId: review.courseRoundId,
            rating: review.rating,
            body: review.body,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            userId: review.userId,
            author: `${userInfo.name} ${userInfo.surname}`,
            authorProgramCode: userInfo.programCode,
          }) satisfies ReviewDto,
      ),
    } satisfies UserDto;
  },
  {
    query: t.Object({
      userId: t.String({
        title: "User ID",
        description: "ID of the User",
      }),
    }),
    tags: ["Users"],
  },
);
