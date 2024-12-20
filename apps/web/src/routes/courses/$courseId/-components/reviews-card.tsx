import { CourseDto } from "$api/routes/courses/course-dto";
import { CourseRoundDto } from "$api/routes/courses/course-round-dto";
import { ReviewDto } from "$api/routes/courses/review/review-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "@/components/ui/star";
import { ReviewCard } from "@/routes/-components/review-card";
import { Asterisk } from "lucide-react";
import { courseRoundToPrettyString } from "../-utils/parse-kth-term";

function reviewCardCB(review: ReviewDto) {
  return <ReviewCard key={review.id} {...review} />;
}

export type ReviewFilters = {
  rating: number | null;
  courseRoundId: string | null;
};

export function ReviewsCard({
  data,
  reviews,
  filters,
  onUpdateFilters,
}: {
  data: { course: CourseDto; rounds: CourseRoundDto[] };
  reviews: ReviewDto[] | null;
  filters: ReviewFilters;
  onUpdateFilters: (newFilters: ReviewFilters) => void;
}) {
  if (!reviews) {
    return (
      <Card className="w-[320px]">
        <CardHeader>
          <CardTitle>No reviews found</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card className="flex max-h-[480px] w-[320px] flex-col">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>
          <h1>Reviews</h1>
        </CardTitle>
        <Select
          onValueChange={(value) =>
            onUpdateFilters({ ...filters, courseRoundId: value })
          }
        >
          <SelectTrigger id="courseRound" className="w-[160px]">
            <SelectValue placeholder="Any round" />
          </SelectTrigger>
          <SelectContent position="popper">
            {data.rounds.map((it) => (
              <SelectItem
                key={it.id}
                value={it.id}
                className="flex items-center justify-start gap-3"
              >
                {courseRoundToPrettyString(it)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            onUpdateFilters({ ...filters, rating: Number(value) })
          }
        >
          <SelectTrigger id="rating" className="w-[80px]">
            <SelectValue placeholder={<Asterisk className="w-4" />} />
          </SelectTrigger>
          <SelectContent position="popper" className="">
            {[1, 2, 3, 4, 5].map((it) => (
              <SelectItem
                key={it}
                value={it.toString()}
                className="flex items-center justify-start gap-3"
              >
                <span className="text-center">{it}</span>
                <Star filled className="h-5 w-5" />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="block max-h-full gap-2 overflow-scroll">
        {reviews.map(reviewCardCB)}
      </CardContent>
      <CardFooter className="flex justify-between">Hej</CardFooter>
    </Card>
  );
}
