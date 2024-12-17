import { prisma } from "@/utilities/db";

export async function courseExists(courseCode: string) {
  return (
    (await prisma.course.count({
      where: {
        courseCode,
      },
    })) > 0
  );
}
