import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";
import { sanitizeCachedNumericValue } from "@/routes/courses/review/sanitize-rating";
import z from "zod";

export const courseDtoSchema = z.object({
  id: z.string().nullable(),
  code: z.string(),
  title: z.string(),
  content: z.string().optional(),
  goals: z.string().optional(),
  rating: z.number().nullable(), // Null means no reviews exists, average course rating
  reviewCount: z.number().nullable(), // Null means no reviews exists
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
    content: kthCourse.publicSyllabusVersions[0].courseSyllabus.content,
    goals: kthCourse.publicSyllabusVersions[0].courseSyllabus.goals,
    ...courseDto,
    rating: sanitizeCachedNumericValue(courseDto?.rating ?? null),
    reviewCount: sanitizeCachedNumericValue(courseDto?.reviewCount ?? null),
  } satisfies CourseDto;
}
