import { KTH_API_HOST } from "@/kth-api";
import { CourseRoundsEndpoint } from "@/kth-api/course-round/type";

export async function courseRoundsEndpoint(id: string) {
  const result = await fetch(
    `${KTH_API_HOST}/api/kopps/v2/course/${id}/courseroundterms`,
  ).then((res) => res.json());

  return result as CourseRoundsEndpoint;
}
