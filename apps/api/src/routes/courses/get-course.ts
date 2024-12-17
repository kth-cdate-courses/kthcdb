import { KTH } from "@/kth-api";
import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { calculateRating } from "@/routes/courses/calculate-rating";
import { CourseDto, kthToCourseDto } from "@/routes/courses/course-dto";
import { populateCourse } from "@/routes/courses/populate-course";
import { populateCourseRounds } from "@/routes/courses/populate-course-rounds";
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
    const ratings = await Promise.all(
      // Aggregate over all ratings for 1, 2, 3, 4 and 5 stars
      [1, 2, 3, 4, 5].map((rating) =>
        prisma.review.aggregate({
          where: {
            rating,
            courseRound: {
              courseId: course.id,
            },
          },
          _count: true,
        }),
      ),
    );
    const aggregatedReview = calculateRating(
      ratings.map((rating, index) => ({
        rating: index + 1,
        _count: rating._count,
      })),
    );
    return kthToCourseDto(course.cache as unknown as CourseDetailsEndpoint, {
      rating: aggregatedReview,
    });
  }

  // If course doesn't exist in db, get it from KTH API
  const [remoteCourse, remoteRounds] = await Promise.all([
    KTH.api.courseDetails(courseCode),
    KTH.api.courseRounds(courseCode),
  ]);
  if (remoteCourse == null || remoteRounds == null) return null;

  await populateCourse(remoteCourse);
  await populateCourseRounds(courseCode, remoteRounds);

  return kthToCourseDto(remoteCourse);
}
