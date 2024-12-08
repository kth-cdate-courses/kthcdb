import { KTH_API_HOST } from "@/kth-api";
import { CourseSearchEndpoint } from "@/kth-api/course-search/type";

export enum EducationLevel {
  BASIC = "BASIC",
  ADVANCED = "ADVANCED",
  RESEARCH = "RESEARCH",
  PREPARATORY = "PREPARATORY",
}

export async function courseSearchEndpoint({
  search,
  englishOnly,
  educationLevel,
}: {
  search?: string;
  englishOnly?: boolean;
  educationLevel?: EducationLevel;
}) {
  // Apply search param criterias
  const params = new URLSearchParams();
  if (search != null) params.append("text_pattern", search ?? "");
  if (englishOnly != null)
    params.append("in_english_only", englishOnly.toString());
  if (educationLevel != null) params.append("education_level", educationLevel);

  console.log("QUERY", `${KTH_API_HOST}/api/kopps/v2/courses/search?${params}`);

  return (await fetch(
    `${KTH_API_HOST}/api/kopps/v2/courses/search?${params}`,
  ).then((res) => res.json())) as CourseSearchEndpoint;
}
