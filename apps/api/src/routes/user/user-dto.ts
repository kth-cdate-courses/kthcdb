import z from "zod";

export const userDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
});
export type UserDto = z.infer<typeof userDtoSchema>;
