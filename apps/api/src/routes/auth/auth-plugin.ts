import { prisma } from "@/utilities/db";
import { jwtMiddleware, JwtSession } from "@/utilities/jwt-middleware";
import Elysia from "elysia";

export const authPlugin = new Elysia({
  name: "Elysia auth",
})
  .use(jwtMiddleware)
  .derive({ as: "global" }, async ({ jwt, cookie: { auth } }) => {
    const session = (await jwt.verify(auth.value)) as JwtSession;

    if (session?.id == null) {
      return {
        user: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return {
      user,
    };
  });
