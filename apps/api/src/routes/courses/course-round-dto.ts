import z from "zod";

export const courseRoundDto = z.object({
  id: z.string(),
  term: z.string(),
  shortName: z.string(),
  programCode: z.string().array().nullable(),
});
export type CourseRoundDto = z.infer<typeof courseRoundDto>;
