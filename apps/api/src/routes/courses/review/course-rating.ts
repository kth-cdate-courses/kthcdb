import { calculateRating } from "@/routes/courses/calculate-rating";
import { prisma } from "@/utilities/db";

export async function getCourseRating(
  courseId: string,
  options?: {
    noAggregation?: boolean; // If true, we will not fetch new data if it's missing
  },
) {
  const coursePromise = prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      cachedRating: true,
    },
  });
  const courseRoundsPromise = prisma.courseRound.findMany({
    where: {
      courseId,
    },
    select: {
      id: true,
      cachedRating: true,
    },
  });

  const [course, courseRounds] = await Promise.all([
    coursePromise,
    courseRoundsPromise,
  ]);
  if (
    (course?.cachedRating == null ||
      courseRounds.some((x) => x.cachedRating == null)) &&
    options?.noAggregation !== true
  ) {
    // TODO[optimization]: Instead of re-aggregating all we could optimize this to only calculate the missing
    return await aggregateCourseRating(courseId);
  }
  return {
    courseRating: course?.cachedRating ?? null,
    roundRatings: courseRounds.map((x) => ({
      courseRoundId: x.id,
      rating: x.cachedRating,
    })),
  };
}

/**
 * Given a course id this function will calculate (and cache) the rating
 * for the course and all of its course rounds.
 */
export async function aggregateCourseRating(courseId: string) {
  const courseRounds = await prisma.courseRound.findMany({
    where: {
      courseId,
    },
  });

  // Get all ratings for each course round
  const result = (
    await Promise.all(
      courseRounds.map(async (courseRound) => ({
        courseRound,
        ratings: await Promise.all(
          // Fetch(Count) each rating step separately
          [1, 2, 3, 4, 5].map((rating) =>
            prisma.review.aggregate({
              where: {
                rating,
                courseRoundId: courseRound.id,
              },
              _count: true,
            }),
          ),
        ),
      })),
    )
  )
    // Calculate aggregated rating for each course round
    .map((x) => ({
      ...x,
      aggregatedRating: calculateRating(
        x.ratings.map((rating, index) => ({
          rating: index + 1,
          _count: rating._count,
        })),
      ),
    }));

  // Calculate aggregated rating for all course rounds together
  // Here we smash together the structured data into one blob to represent the entire course rating
  const courseRatings = result.reduce(
    (acc, current) => {
      for (let i = 0; i < current.ratings.length; i++)
        acc[i] += current.ratings[i]._count;
      return acc;
    },
    [0, 0, 0, 0, 0],
  );

  const returnData = {
    courseRating: calculateRating(
      courseRatings.map((x, i) => ({ rating: i + 1, _count: x })),
    ),
    roundRatings: result.map((x) => ({
      courseRoundId: x.courseRound.id,
      rating: x.aggregatedRating,
    })),
  };
  console.log("RETURN DATA", returnData);
  await saveToCache(courseId, returnData);
  return returnData;
}

async function saveToCache(
  courseId: string,
  input: Awaited<ReturnType<typeof aggregateCourseRating>>,
) {
  return await Promise.all([
    cacheCourseRating(courseId, input.courseRating),
    ...input.roundRatings.map((round) =>
      cacheCourseRoundRating(round.courseRoundId, round.rating),
    ),
  ]);
}

async function cacheCourseRating(courseId: string, rating: number | null) {
  return await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      cachedRating: rating ?? -1, // -1 means "processed" but no data, to not aggregate cach again
    },
  });
}
async function cacheCourseRoundRating(
  courseRoundId: string,
  rating: number | null,
) {
  return await prisma.courseRound.update({
    where: {
      id: courseRoundId,
    },
    data: {
      cachedRating: rating ?? -1, // -1 means "processed" but no data, to not aggregate cach again
    },
  });
}
