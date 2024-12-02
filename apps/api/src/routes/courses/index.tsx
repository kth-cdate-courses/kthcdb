import Elysia, { t } from "elysia";

export const authRoute = new Elysia({
  prefix: "/courses",
})
  .get("/", async () => {
    // Get all courses
    console.log("Getting all courses");
  })
  .get(
    "/search",
    async ({ query: { search } }) => {
      // Search for courses
      console.log("Searching for courses", search);
    },
    {
      query: t.Object({
        search: t.String(),
      }),
    },
  )
  .get("/:id", async ({ params: { id } }) => {
    // Get course details
    console.log("Looking for course ", id);
  });
