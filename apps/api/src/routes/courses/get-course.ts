import { KTH } from "@/kth-api";
import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { cacheCourse } from "@/routes/courses/cache-course";
import { CourseDto, kthToCourseDto } from "@/routes/courses/course-dto";
import { prisma } from "@/utilities/db";

/**
 * Get course from db, if it doesn't exist, get it from the database
 */
export async function getCourse(courseCode: string): Promise<CourseDto | null> {
  // Check if course exists in db
  const course = await prisma.course.findUnique({
    where: {
      courseCode,
    },
  });
  if (course != null) {
    return kthToCourseDto(course.cache as unknown as CourseDetailsEndpoint);
  }

  const remoteCourse = await KTH.api.courseDetails(courseCode);
  if (remoteCourse == null) {
    return null;
  }
  await cacheCourse(remoteCourse);

  return kthToCourseDto(remoteCourse);
}
