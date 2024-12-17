import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import z from "zod";

export const courseDtoSchema = z.object({
  code: z.string(),
  title: z.string(),
  description: z.string(),
  rating: z.number().nullable(), // Null means no reviews exists
});
export type CourseDto = z.infer<typeof courseDtoSchema>;

export function kthToCourseDto(
  kthCourse: CourseDetailsEndpoint,
  courseDto?: Partial<CourseDto>,
) {
  return {
    code: kthCourse.course.courseCode,
    title: kthCourse.course.title,
    description: kthCourse.course.addOn,
    rating: null,
    ...courseDto,
  } satisfies CourseDto;
}
