export interface CourseSearchEndpoint {
  searchHits: SearchHit[];
}

interface SearchHit {
  course: Course;
}

interface Course {
  courseCode: string;
  title: string;
  credits: number;
  creditUnitLabel: string;
  creditUnitAbbr: string;
  educationalLevel: string;
}
