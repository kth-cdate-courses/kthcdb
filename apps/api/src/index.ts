import { courseRoute } from "@/routes/courses";
import { jwtMiddleware, JwtSession } from "@/utilities/jwt-middleware";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { DateTime } from "luxon";
import { authRoute } from "./routes/auth";

const app = new Elysia()
  .use(
    cors({
      origin: (req) => {
        const origin = req.headers.get("origin");
        if (origin == null) return false;

        const allowedOrigins = [/.*\.hallkvi.st$/i, /localhost:5173$/];

        return allowedOrigins.some((allowedOrigin) =>
          allowedOrigin.test(origin),
        );
      },
      credentials: true,
    }),
  )
  .use(swagger())
  .use(jwtMiddleware)
  .use(authRoute)
  .use(courseRoute)
  .get("/", async ({ jwt, cookie: { auth } }) => {
    const result = (await jwt.verify(auth.value)) as JwtSession | false;
    if (result == null || result == false) {
      return {
        status: 200,
        body: {
          auth: "User not logged in",
        },
      };
    }
    return {
      status: 200,
      body: {
        auth: result,
      },
    };
  })
  .get("/dummy", async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      data: {
        message: "Hello World",
        year: DateTime.now().year,
        month: DateTime.now().month,
        day: DateTime.now().day,
      },
    };
  })
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
