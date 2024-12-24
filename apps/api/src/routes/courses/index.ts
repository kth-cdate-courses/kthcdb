import { KTH } from "@/kth-api";
import { authPlugin } from "@/routes/auth/auth-plugin";
import { CourseDto } from "@/routes/courses/course-dto";
import { getCourse } from "@/routes/courses/get-course";
import { getCourseRounds } from "@/routes/courses/get-course-rounds";
import { reviewRoute } from "@/routes/courses/review";
import { sanitizeCachedNumericValue } from "@/routes/courses/review/sanitize-rating";
import { prisma } from "@/utilities/db";
import Elysia, { t } from "elysia";

export const courseRoute = new Elysia({
  prefix: "/courses",
})
  .use(reviewRoute)
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

      const courses = await prisma.course.findMany({
        where: {
          courseCode: {
            in: searchResults.searchHits.map(
              (course) => course.course.courseCode,
            ),
          },
        },
        orderBy: {
          cachedRating: "desc",
        },
        select: {
          id: true,
          courseCode: true,
          cachedRating: true,
          cachedReviewCount: true,
        },
      });

      const result = searchResults.searchHits.map((course) => {
        const dbCourse = courses.find(
          (x) => x.courseCode === course.course.courseCode,
        );
        return {
          id: dbCourse?.id ?? null,
          code: course.course.courseCode,
          title: course.course.title,
          rating: sanitizeCachedNumericValue(dbCourse?.cachedRating ?? null),
          reviewCount: sanitizeCachedNumericValue(
            dbCourse?.cachedReviewCount ?? null,
          ),
        } satisfies CourseDto;
      });

      // Courses that have a non-null rating should come first
      return {
        courses: result.toSorted((a, b) => {
          if (a.rating != null && b.rating == null) return -1;
          if (a.rating == null && b.rating != null) return 1;
          return 0;
        }),
      };
    },
    {
      query: t.Object({
        search: t.Optional(t.String()), // An optional search will result in no results
        english: t.Optional(t.Boolean()),
        minRating: t.Optional(t.Number()),
        maxRating: t.Optional(t.Number()),
      }),
      detail: {
        description: "Search for courses by course code",
      },
      response: {
        200: t.Object({
          courses: t.Array(
            t.Object({
              id: t.Nullable(t.String()),
              code: t.String({
                examples: ["SF1688"],
              }),
              title: t.String({ examples: ["Discrete Mathematics"] }),
              rating: t.Nullable(
                t.Number({ examples: [2.23], minimum: 1, maximum: 5 }),
              ),
              reviewCount: t.Nullable(
                t.Number({
                  examples: [123],
                  minimum: 0,
                }),
              ),
            }),
          ),
        }),
      },
      tags: ["Courses"],
    },
  )
  .get(
    "/course",
    async ({ query: { courseCode } }) => {
      const course = await getCourse(courseCode);
      if (course?.id == null) {
        return {
          course: null,
          rounds: [],
        };
      }

      const rounds = await getCourseRounds(course.id); // Potential proplem here, if course doesn't exist, this will fail

      return {
        course,
        rounds,
      };
    },
    {
      query: t.Object({
        courseCode: t.String(),
      }),
      tags: ["Courses"],
    },
  )
  .get(
    "/",
    async ({ query: { ordering, count, page } }) => {
      const courses = await prisma.course.findMany({
        take: count ?? 20,
        skip: (page ?? 0) * (count ?? 20),
        orderBy: {
          cachedRating: ordering === "ascending" ? "asc" : "desc",
        },
        where: {
          cachedReviewCount: {
            gt: 0,
          },
        },
        select: {
          courseCode: true,
        },
      });

      return (
        await Promise.all(courses.map((course) => getCourse(course.courseCode)))
      ).filter((x) => x != null);
    },
    {
      tags: ["Courses"],
      query: t.Object({
        page: t.Optional(
          t.Number({
            minimum: 0,
          }),
        ),
        count: t.Optional(
          t.Number({
            minimum: 1,
            maximum: 100,
          }),
        ),
        ordering: t.Enum(
          {
            ascending: "ascending",
            descending: "descending",
          },
          {
            default: "descending",
            title: "Ordering",
            description:
              "Descending will pick the best-rated courses, ascending the worst rated",
          },
        ),
      }),
    },
  );
