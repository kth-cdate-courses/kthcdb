import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { prisma } from "@/utilities/db";
import { Prisma } from "@prisma/client";

/**
 * In order to reduce round trips to the KTH API, we cache
 * the response in our system without performing any modifications
 * to the data. This way we can pipe it into our system again
 * later.
 * @param remoteCourse
 * @returns
 */
export async function cacheCourse(remoteCourse: CourseDetailsEndpoint) {
  const course = await prisma.course.findUnique({
    where: {
      courseCode: remoteCourse.course.courseCode,
    },
  });
  if (course == null) {
    await prisma.course.create({
      data: {
        courseCode: remoteCourse.course.courseCode,
        cache: remoteCourse as unknown as Prisma.JsonObject,
      },
    });
    return;
  }
  await prisma.course.update({
    where: {
      courseCode: remoteCourse.course.courseCode,
    },
    data: {
      cache: remoteCourse as unknown as Prisma.JsonObject,
    },
  });
}
