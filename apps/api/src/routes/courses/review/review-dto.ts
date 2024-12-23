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
