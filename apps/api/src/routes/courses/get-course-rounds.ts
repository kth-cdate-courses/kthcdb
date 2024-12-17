import { CourseRoundDto } from "@/routes/courses/course-round-dto";
import { prisma } from "@/utilities/db";

export async function getCourseRounds(courseCode: string) {
  // We assume the course rounds have been fetched from the KTH API
  return (
    await prisma.courseRound.findMany({
      where: {
        course: {
          courseCode,
        },
      },
    })
  ).map(
    (round) =>
      ({
        id: round.id,
        term: round.term,
        shortName: round.name,
        programCode: round.programCode?.split(", ") ?? null,
      }) satisfies CourseRoundDto,
  );
}
