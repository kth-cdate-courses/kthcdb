import { Prisma } from "@prisma/client";
import z from "zod";

export const reviewDtoSchema = z.object({
  id: z.string(),
  courseCode: z.string(),
  courseRoundId: z.string(),
  courseRoundName: z.string(),
  courseRoundTerm: z.string().nullable(),
  rating: z.number().min(1).max(5),
  body: z.string().nullable(),
  userId: z.string(),
  author: z.string(),
  authorProgramCode: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ReviewDto = z.infer<typeof reviewDtoSchema>;

export const reviewDtoPrismaInclude = {
  courseRound: {
    select: {
      id: true,
      name: true,
      term: true,
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
      programCode: true,
    },
  },
} satisfies Prisma.ReviewInclude;

export function prismaToReviewDto(
  review: Prisma.ReviewGetPayload<{
    include: typeof reviewDtoPrismaInclude;
  }>,
) {
  return {
    id: review.id,
    courseCode: review.courseRound.course.courseCode,
    courseRoundId: review.courseRound.id,
    courseRoundName: review.courseRound.name,
    courseRoundTerm: review.courseRound.term,
    rating: review.rating,
    body: review.body,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    userId: review.userId,
    author: `${review.user.name} ${review.user.surname}`,
    authorProgramCode: review.user.programCode,
  } satisfies ReviewDto;
}
