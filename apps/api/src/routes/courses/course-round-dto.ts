import z from "zod";

export const courseRoundDto = z.object({
  term: z.string(),
  shortName: z.string(),
});
export type CourseRoundDto = z.infer<typeof courseRoundDto>;
