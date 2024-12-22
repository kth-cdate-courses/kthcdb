import { CourseDto } from "$api/routes/courses/course-dto";
import NumberTicker from "@/components/ui/number-ticker";
import { Star, StarHalf } from "lucide-react";

function RatingStars({
  rating,
  numRatings,
}: {
  rating: number;
  numRatings: number;
}) {
  const fraction = rating % 1;
  const includeHalfStar = 0.25 <= fraction && fraction < 0.75; // Include half star if rating fraction between .25-.75
  const numFilled = Math.floor(rating) + (fraction > 0.75 ? 1 : 0);
  return (
    <div className="relative flex flex-col justify-center">
      <div className="relative flex justify-center text-lg">
        {numRatings > 0 ? (
          <div>
            <NumberTicker value={rating} decimalPlaces={2} /> (
            <NumberTicker value={numRatings} />)
          </div>
        ) : (
          <p className="mt-2 text-sm">No ratings</p>
        )}
      </div>
      <div className="flex">
        <div className="relative flex">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star key={"full" + index} fill="grey" strokeWidth={0} />
            ))}
        </div>
        <div className="absolute flex">
          {Array(numFilled)
            .fill(0)
            .map((_, index) => (
              <Star key={"empty" + index} fill="gold" strokeWidth={0} />
            ))}
          {includeHalfStar && <StarHalf fill="gold" strokeWidth={0} />}
        </div>
      </div>
    </div>
  );
}
export function CourseTitleSection({ courseData }: { courseData: CourseDto }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h1 className="font-mono text-4xl">{courseData.code}</h1>
        <h2 className="text-lg">{courseData.title}</h2>
      </div>
      {courseData.rating && courseData.reviewCount && (
        <RatingStars
          rating={courseData.rating}
          numRatings={courseData.reviewCount}
        />
      )}
    </div>
  );
}
