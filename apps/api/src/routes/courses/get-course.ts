import { KTH } from "@/kth-api";
import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { CourseDto, kthToCourseDto } from "@/routes/courses/course-dto";
import { populateCourse } from "@/routes/courses/populate-course";
import { populateCourseRounds } from "@/routes/courses/populate-course-rounds";
import { getCourseRating } from "@/routes/courses/review/course-rating";
import { prisma } from "@/utilities/db";
import { Course } from "@prisma/client";
import { DateTime } from "luxon";

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
      updatedAt: true,
    },
  });

  let courseId = course?.id;
  let courseCache = course?.cache as unknown as CourseDetailsEndpoint;
  // If course doesn't exist or it is stale, populate it
  if (course == null || courseIsStale(course)) {
    const populationResult = await populateAllCourseData(courseCode);
    if (populationResult == null) return null;
    courseId = populationResult.courseId;
    courseCache = populationResult.courseCache;
  }

  if (courseId == null || courseCache == null) return null;

  const rating = await getCourseRating(courseId);
  return kthToCourseDto(courseCache, {
    id: courseId,
    rating: rating.courseRating,
  });
}

function courseIsStale(course: Pick<Course, "id" | "cache" | "updatedAt">) {
  return (
    DateTime.fromJSDate(course.updatedAt) <
    DateTime.now().minus({
      days: parseInt(process.env.COURSE_STALE_DAYS as string),
    })
  );
}

/**
 * Populate course will fetch the course from KTH API and run
 * cache the response and create all appropriate relations
 * @param courseCode
 * @returns
 */
async function populateAllCourseData(courseCode: string) {
  // If course doesn't exist in db or we want to revalidate, get it from KTH API
  const [remoteCourse, remoteRounds] = await Promise.all([
    KTH.api.courseDetails(courseCode),
    KTH.api.courseRounds(courseCode),
  ]);
  if (remoteCourse == null || remoteRounds == null) return null;

  const courseId = await populateCourse(remoteCourse);
  await populateCourseRounds(courseCode, remoteRounds);
  return { courseId, courseCache: remoteCourse };
}
