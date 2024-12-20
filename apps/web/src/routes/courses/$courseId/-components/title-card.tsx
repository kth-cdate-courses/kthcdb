import { CourseDto } from "$api/routes/courses/course-dto";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

function RatingStars(rating: number) {
  const fraction = rating % 1;
  const includeHalfStar = 0.25 < fraction && fraction < 0.75; // Include half star if rating fraction between .25-.75
  const numFilled = Math.floor(rating) + (fraction > 0.75 ? 1 : 0);
  return (
    <div className="flex flex-col self-center">
      <h2 className="relative self-center text-lg">{rating.toFixed(2)}</h2>
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
    <Card className="max-w-[480px]">
      <CardHeader className="bottom-0 flex flex-row justify-between pb-1">
        <h1 className="text-5xl">{courseData.code}</h1>
        {RatingStars(courseData.rating ?? 0)}
      </CardHeader>
      <CardContent className="top-0 mt-0">
        <h2 className="text-lg">{courseData.title}</h2>
      </CardContent>
    </Card>
  );
}
