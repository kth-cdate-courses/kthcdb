import { CourseDto } from "$api/routes/courses/course-dto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberTicker from "@/components/ui/number-ticker";
import { Star, StarHalf } from "lucide-react";

function RatingStars(rating: number, numRatings: number) {
  const fraction = rating % 1;
  const includeHalfStar = 0.25 < fraction && fraction < 0.75; // Include half star if rating fraction between .25-.75
  const numFilled = Math.floor(rating) + (fraction > 0.75 ? 1 : 0);
  return (
    <div className="relative flex flex-col self-center pt-1">
      <h2 className="relative self-center text-lg">
        {<NumberTicker value={rating} decimalPlaces={2} />} (
        <NumberTicker value={numRatings} />)
      </h2>
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
export function TitleCard({ courseData }: { courseData: CourseDto }) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="bottom-0 flex flex-row justify-between pb-1">
        <CardTitle className="text-5xl">{courseData.code}</CardTitle>
        {RatingStars(courseData.rating ?? 0, courseData.reviewCount ?? 0)}
      </CardHeader>
      <CardContent className="-mt-4">
        <h2 className="text-lg">{courseData.title}</h2>
      </CardContent>
    </Card>
  );
}
