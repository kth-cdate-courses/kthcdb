import z from "zod";

export const reviewDtoSchema = z.object({
  id: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ReviewDto = z.infer<typeof reviewDtoSchema>;
