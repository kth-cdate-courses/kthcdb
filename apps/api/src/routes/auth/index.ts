import { authPlugin } from "@/routes/auth/auth-plugin";
import { createAuthEmail } from "@/routes/auth/create-email";
import { prisma } from "@/utilities/db";
import { JwtSession } from "@/utilities/jwt-middleware";
import Elysia, { t } from "elysia";
import { DateTime } from "luxon";

export const authRoute = new Elysia({
  prefix: "/auth",
  detail: {
    hide: true,
  },
})
  .use(authPlugin)
  .get(
    "/session",
    async ({ jwt, cookie: { auth } }) => {
      const session = (await jwt.verify(auth.value)) as JwtSession | false;

      if (session === false) {
        return {
          authenticated: false,
        };
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
      });
      if (user == null) {
        return {
          authenticated: false,
        };
      }

      return {
        authenticated: true,
        user,
      };
    },
    {
      tags: ["Auth"],
      detail: {
        hide: false,
        description: "Get the current user session",
      },
      response: {
        200: t.Object({
          authenticated: t.Boolean(),
          user: t.Optional(
            t.Object({
              name: t.String({ examples: ["John"] }),
              id: t.String({ examples: ["1"] }),
              email: t.String({ examples: ["john.doe@example.com"] }),
              surname: t.String({ examples: ["Doe"] }),
              verified: t.Boolean(),
            }),
          ),
        }),
      },
    },
  )
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
      tags: ["Auth"],
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
      tags: ["Auth"],
    },
  )
  .get(
    "/verify",
    async ({ jwt, query, cookie: { auth }, redirect }) => {
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

      return redirect(`${process.env.APP_URL}`);
    },
    {
      query: t.Object({
        token: t.String(),
      }),
      tags: ["Auth"],
    },
  )
  .post("/logout", async ({ jwt, cookie: { auth }, user }) => {
    console.log(user, jwt, auth);
    console.log("REMOVE COOKIE", auth.value);
    auth.set({
      value: "",
      expires: new Date(0),
      httpOnly: true,
    });
    auth.remove();

    return {
      success: true,
    };
  });
