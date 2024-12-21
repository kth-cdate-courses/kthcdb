import z from "zod";

export const reviewDtoSchema = z.object({
  id: z.string(),
  courseCode: z.string(),
  courseRoundId: z.string(),
  rating: z.number().min(1).max(5),
  body: z.string().nullable(),
  userId: z.string(),
  author: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ReviewDto = z.infer<typeof reviewDtoSchema>;
