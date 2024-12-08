import { KTH } from "@/kth-api";
import { authPlugin } from "@/routes/auth/auth-plugin";
import { CourseDto } from "@/routes/courses/course-dto";
import { getCourse } from "@/routes/courses/get-course";
import { prisma } from "@/utilities/db";
import Elysia, { t } from "elysia";

export const courseRoute = new Elysia({
  prefix: "/courses",
})
  .get("/", async () => {
    // Get all courses
    console.log("Getting all courses");
  })
  .use(authPlugin)
  .get(
    "/search",
    async ({ query: { search, english }, user }) => {
      if (!search) return { courses: [] satisfies CourseDto[] };
      const searchResults = await KTH.api.courseSearch({
        search: search,
        englishOnly: english,
      });

      // Register search if they are logged in
      if (user != null) {
        await prisma.userSearch.create({
          data: {
            userId: user.id,
            search: {
              search,
              english,
            },
          },
        });
      }

      return {
        courses: searchResults.searchHits.map((course) => ({
          code: course.course.courseCode,
          title: course.course.title,
          description: "",
          rating: 0,
        })) satisfies CourseDto[],
      };
    },
    {
      query: t.Object({
        search: t.Optional(t.String()), // An optional search will result in no results
        english: t.Optional(t.Boolean()),
      }),
    },
  )
  .get("/:id", async ({ params: { id } }) => {
    const course = await getCourse(id);

    if (course == null) {
      return new Response("Course not found", {
        status: 404,
      });
    }

    // Get course details
    return Response.json({
      course,
    });
  });
