import z from "zod";

export const courseRoundDto = z.object({
  id: z.string(),
  term: z.string(),
  shortName: z.string(),
  programCode: z.string().array().nullable(),
  rating: z.number().nullable(), // Average rating for this course round
});
export type CourseRoundDto = z.infer<typeof courseRoundDto>;
