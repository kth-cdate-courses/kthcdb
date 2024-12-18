import { KTH } from "@/kth-api";
import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { CourseDto, kthToCourseDto } from "@/routes/courses/course-dto";
import { populateCourse } from "@/routes/courses/populate-course";
import { populateCourseRounds } from "@/routes/courses/populate-course-rounds";
import { getCourseRating } from "@/routes/courses/review/course-rating";
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
    select: {
      id: true,
      cache: true,
    },
  });
  if (course != null) {
    const { courseRating } = await getCourseRating(course.id);
    return kthToCourseDto(course.cache as unknown as CourseDetailsEndpoint, {
      id: course.id,
      rating: courseRating,
    });
  }

  // If course doesn't exist in db, get it from KTH API
  const [remoteCourse, remoteRounds] = await Promise.all([
    KTH.api.courseDetails(courseCode),
    KTH.api.courseRounds(courseCode),
  ]);
  if (remoteCourse == null || remoteRounds == null) return null;

  const courseId = await populateCourse(remoteCourse);
  await populateCourseRounds(courseCode, remoteRounds);

  return kthToCourseDto(remoteCourse, {
    id: courseId,
  });
}
