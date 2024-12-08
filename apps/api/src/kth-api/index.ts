import { courseDetailsEndpoint } from "@/kth-api/course-details/endpoint";
import { courseSearchEndpoint } from "@/kth-api/course-search/endpoint";

export const KTH_API_HOST = "https://api.kth.se";
export namespace KTH {
  export const api = {
    courseDetails: courseDetailsEndpoint,
    courseSearch: courseSearchEndpoint,
  };
}
