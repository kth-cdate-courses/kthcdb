import { prisma } from "@/utilities/db";
import Elysia, { t } from "elysia";
import { UserDto } from "./user-dto";

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
      },
    });
    if (!userInfo) {
      return null;
    }
    return {
      id: userId,
      name: userInfo.name,
      surname: userInfo.surname,
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
