import { KTH_API_HOST } from "@/kth-api";
import { CourseDetailsEndpoint } from "@/kth-api/course-details/type";

export async function courseDetailsEndpoint(id: string) {
  const result = await fetch(
    `${KTH_API_HOST}/api/kopps/v2/course/${id}/detailedinformation`,
  ).then((res) => res.json());

  return result as CourseDetailsEndpoint;
}
