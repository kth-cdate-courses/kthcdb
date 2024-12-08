import { CourseDto } from "@/routes/courses/course-dto";
import { prisma } from "@/utilities/db";

/**
 * Get course from db, if it doesn't exist, get it from the database
 */
export async function getCourse(courseCode: string): Promise<CourseDto | null> {
  const course = await prisma.course.findUnique({
    where: {
      courseCode,
    },
  });
  if (course != null) {
    return {
      code: course.courseCode,
      title: course.title,
      description: course.description,
      rating: 0,
    };
  }

  return null;
  /*   const remoteCourse = await KTH.api.courseDetails(courseCode);
  if (remoteCourse == null) {
    return null;
  }

  //await createCourseFromKth(remoteCourse);
  return kthToCourseDto(remoteCourse); */
}
