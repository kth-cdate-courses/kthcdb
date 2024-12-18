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

  // For each course round, either create or update it if it already exists
  await Promise.all(
    rounds.map((round) =>
      prisma.courseRound.upsert({
        where: {
          courseId_term_ladokUId: {
            courseId: course.id,
            term: round.term,
            ladokUId: round.round.ladokUID,
          },
        },
        create: {
          courseId: course.id,
          term: round.term,
          name: round.round.shortName,
          ladokUId: round.round.ladokUID,
          programCode: round.round.connectedProgrammes
            .filter(
              (x) => x.programmeCode != null && x.programmeCode.length > 0,
            )
            .map((x) => x.programmeCode)
            .join(", "),
          cache: round.round as unknown as Prisma.JsonObject,
        },
        update: {
          name: round.round.shortName,
          programCode: round.round.connectedProgrammes
            .filter(
              (x) => x.programmeCode != null && x.programmeCode.length > 0,
            )
            .map((x) => x.programmeCode)
            .join(", "),
          cache: round.round as unknown as Prisma.JsonObject,
        },
      }),
    ),
  );
}
