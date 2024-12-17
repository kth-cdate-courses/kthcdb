import { CourseRoundDto } from "@/routes/courses/course-round-dto";
import { getCourseRating } from "@/routes/courses/review/course-rating";
import { sanitizeRating } from "@/routes/courses/review/sanitize-rating";
import { prisma } from "@/utilities/db";

export async function getCourseRounds(courseId: string) {
  // We assume the course rounds have been fetched from the KTH API
  const { roundRatings } = await getCourseRating(courseId);
  const courseRounds = await prisma.courseRound.findMany({
    where: {
      courseId,
    },
  });
  return courseRounds
    .toSorted((a, b) => b.term.localeCompare(a.term))
    .map(
      (round) =>
        ({
          id: round.id,
          term: round.term,
          shortName: round.name,
          programCode: round.programCode?.split(", ") ?? null,
          rating: sanitizeRating(
            roundRatings.find((x) => x.courseRoundId === round.id)?.rating ??
              null,
          ),
        }) satisfies CourseRoundDto,
    );
}
