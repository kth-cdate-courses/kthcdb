import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";

export type CourseDto = {
  code: string;
  title: string;
  description: string;
  rating: number;
};

export function kthToCourseDto(kthCourse: CourseDetailsEndpoint) {
  return {
    code: kthCourse.course.courseCode,
    title: kthCourse.course.title,
    description: kthCourse.course.addOn,
    rating: 0,
  } satisfies CourseDto;
}
