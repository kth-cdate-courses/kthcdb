import { createAuthEmail } from "@/routes/auth/create-email";
import { prisma } from "@/utilities/db";
import { jwtMiddleware, JwtSession } from "@/utilities/jwt-middleware";
import Elysia, { t } from "elysia";
import { DateTime } from "luxon";

export const authRoute = new Elysia({
  prefix: "/auth",
})
  .use(jwtMiddleware)
  .post(
    "/sign-up",
    async ({ body }) => {
      // Verify that the user doesn't exist
      if (
        (await prisma.user.count({
          where: {
            email: body.email,
          },
        })) > 0
      ) {
        return {
          status: 400,
          body: {
            message: "Email is taken",
          },
        };
      }

      const user = await prisma.user.create({
        data: {
          name: body.name,
          surname: body.surname,
          email: body.email,
        },
      });

      if (user == null) {
        throw new Error("Failed to create user");
      }

      await createAuthEmail({
        email: body.email,
        userId: user.id,
        subject: "KTHcdb Verify email",
      });

      return {
        status: 201,
        body: {
          message:
            "User created, an email has been sent to verify your account",
        },
      };
    },
    {
      body: t.Object({
        name: t.String(),
        surname: t.String(),
        email: t.String(),
      }),
    },
  )
  .post(
    "/sign-in",
    async ({ body }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (user == null) {
        return {
          status: 404,
          body: {
            message: "User not found",
          },
        };
      }

      await createAuthEmail({
        userId: user.id,
        email: user.email,
        subject: "KTHcdb Sign in",
      });

      return {
        status: 200,
        body: {
          message: "Sign in email sent!",
        },
      };
    },
    {
      body: t.Object({
        email: t.String(),
      }),
    },
  )
  .get(
    "/verify",
    async ({ jwt, query, cookie: { auth } }) => {
      const token = await prisma.token.findUnique({
        where: {
          token: query.token,
        },
        include: {
          user: {
            select: {
              id: true,
              verified: true,
            },
          },
        },
      });

      if (token == null) {
        return {
          status: 404,
          body: {
            message: "Token not found",
          },
        };
      }

      if (DateTime.fromJSDate(token.expiresAt) < DateTime.now()) {
        return {
          status: 400,
          body: {
            message: "Token expired",
          },
        };
      }

      // Invalidate token
      await prisma.token.update({
        where: {
          id: token.id,
        },
        data: {
          expiresAt: DateTime.now().toISO(),
        },
      });

      if (!token.user.verified) {
        await prisma.user.update({
          where: {
            id: token.userId,
          },
          data: {
            verified: true,
          },
        });
      }

      // Create JWT session
      auth.set({
        value: await jwt.sign({
          id: token.userId,
        } satisfies JwtSession),
        httpOnly: true,
      });

      return {
        status: 200,
        body: {
          message: "User verified",
        },
      };
    },
    {
      query: t.Object({
        token: t.String(),
      }),
    },
  );
