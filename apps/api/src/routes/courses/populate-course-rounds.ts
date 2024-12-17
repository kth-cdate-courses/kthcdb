import { CourseRoundsEndpoint } from "@/kth-api/course-round/type";
import { prisma } from "@/utilities/db";
import { Prisma } from "@prisma/client";

/**
 * Given data from the KTH API, we transform
 * it into our format and store it in the database.
 */
export async function populateCourseRounds(
  courseCode: string,
  courseRoundsResult: CourseRoundsEndpoint,
) {
  const course = await prisma.course.findUnique({
    where: {
      courseCode,
    },
  });
  if (course == null) return false;

  const rounds = courseRoundsResult.termsWithCourseRounds.flatMap((term) =>
    term.rounds.map((round) => ({
      term: term.term,
      round,
    })),
  );
  return await prisma.courseRound.createMany({
    data: rounds.map((round) => ({
      courseId: course.id,
      term: round.term,
      name: round.round.shortName,
      programCode: round.round.connectedProgrammes
        .map((x) => x.programmeCode)
        .join(", "),
      cache: round.round as unknown as Prisma.JsonObject,
    })),
  });
}
