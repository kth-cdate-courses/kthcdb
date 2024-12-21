import z from "zod";
import { reviewDtoSchema } from "../courses/review/review-dto";

export const userDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  userCreatedDate: z.date(),
  reviews: z.array(reviewDtoSchema),
});
export type UserDto = z.infer<typeof userDtoSchema>;
