import { CourseRoundDto } from "$api/routes/courses/course-round-dto";

export function parseKthTerm(value: string) {
  return {
    year: parseInt(value.slice(0, 4)),
    period: parseInt(value.slice(4)),
  };
}

export function courseRoundToPrettyString(round: CourseRoundDto) {
  return `[${parseKthTerm(round.term).year} p${parseKthTerm(round.term).period}] ${round.shortName || round.programCode?.[0]}`;
}
