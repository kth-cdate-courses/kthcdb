import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { sanitizeRating } from "@/routes/courses/review/sanitize-rating";
import z from "zod";

export const courseDtoSchema = z.object({
  id: z.string().nullable(),
  code: z.string(),
  title: z.string(),
  description: z.string(),
  rating: z.number().nullable(), // Null means no reviews exists, average course rating
});
export type CourseDto = z.infer<typeof courseDtoSchema>;

export function kthToCourseDto(
  kthCourse: CourseDetailsEndpoint,
  courseDto?: Partial<CourseDto>,
) {
  return {
    id: null,
    code: kthCourse.course.courseCode,
    title: kthCourse.course.title,
    description: kthCourse.course.addOn,
    ...courseDto,
    rating: sanitizeRating(courseDto?.rating ?? null),
  } satisfies CourseDto;
}
