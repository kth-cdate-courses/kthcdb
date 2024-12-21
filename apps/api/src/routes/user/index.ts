import { prisma } from "@/utilities/db";
import Elysia, { t } from "elysia";
import { UserDto } from "./user-dto";
import { ReviewDto } from "../courses/review/review-dto";

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
        reviews: true,
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
            courseCode: "NULL NULL NULL TODO TODO MAYDAY THIS REQUIRES A FIX", // TODO: course code not provided
            courseRoundId: review.courseRoundId,
            rating: review.rating,
            body: review.body,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            userId: review.userId,
            author: `${userInfo.name} ${userInfo.surname}`,
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