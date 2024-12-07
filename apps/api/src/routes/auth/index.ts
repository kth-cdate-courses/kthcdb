import { authPlugin } from "@/routes/auth/auth-plugin";
import { createAuthEmail } from "@/routes/auth/create-email";
import { prisma } from "@/utilities/db";
import { JwtSession } from "@/utilities/jwt-middleware";
import Elysia, { t } from "elysia";
import { DateTime } from "luxon";

export const authRoute = new Elysia({
  prefix: "/auth",
})
  .use(authPlugin)
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
        return new Response("User already exists", {
          status: 400,
        });
      }

      const user = await prisma.user.create({
        data: {
          name: body.name,
          surname: body.surname,
          email: body.email,
        },
      });

      if (user == null) {
        return new Response("Failed to create user", {
          status: 500,
        });
      }

      await createAuthEmail({
        email: body.email,
        userId: user.id,
        subject: "KTHcdb Verify email",
      });

      return Response.json(
        {
          body: {
            message:
              "User created, an email has been sent to verify your account",
          },
        },
        {
          status: 201,
        },
      );
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
        return new Response("User not found", {
          status: 404,
        });
      }

      await createAuthEmail({
        userId: user.id,
        email: user.email,
        subject: "KTHcdb Sign in",
      });

      return Response.json(
        {
          body: {
            message: "Sign in email sent!",
          },
        },
        {
          status: 200,
        },
      );
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
        return new Response("Token not found", {
          status: 404,
        });
      }

      if (DateTime.fromJSDate(token.expiresAt) < DateTime.now()) {
        return new Response("Token expired", {
          status: 401,
        });
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

      return Response.json(
        {
          body: {
            message: "User verified",
          },
        },
        {
          status: 200,
        },
      );
    },
    {
      query: t.Object({
        token: t.String(),
      }),
    },
  );
