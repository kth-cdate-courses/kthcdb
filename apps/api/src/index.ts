import { jwtMiddleware, JwtSession } from "@/utilities/jwt-middleware";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authRoute } from "./routes/auth";

const app = new Elysia({
  prefix: "/api",
})
  .use(swagger())
  .use(jwtMiddleware)
  .use(authRoute)
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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
