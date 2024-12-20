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
  term: string | null;
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
  return (
    <Card className="flex max-h-[480px] w-[320px] flex-col">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>
          <h1>Reviews</h1>
        </CardTitle>
        <Select
          onValueChange={(value) =>
            onUpdateFilters({
              ...filters,
              term: value === "default" ? null : value,
            })
          }
          defaultValue="default"
        >
          <SelectTrigger id="courseRound" className="w-[160px]">
            <SelectValue defaultValue="default" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem
              key={"default"}
              value={"default"}
              className="flex items-center justify-start gap-3"
            >
              <span>Any term</span>
            </SelectItem>
            {data.rounds.map((it) => (
              <SelectItem
                key={it.id}
                value={it.term}
                className="flex items-center justify-start gap-3"
              >
                {courseRoundToPrettyString(it)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={
            (value) => onUpdateFilters({ ...filters, rating: Number(value) }) // "default" will be conveniently converted to null
          }
          defaultValue="default"
        >
          <SelectTrigger id="rating" className="w-[80px]">
            <SelectValue defaultValue="default" />
          </SelectTrigger>
          <SelectContent position="popper" className="">
            <SelectItem
              key={"default"}
              value={"default"}
              className="flex items-center justify-start gap-3"
            >
              <span className="text-center">
                {<Asterisk className="w-4" />}
              </span>
            </SelectItem>
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
        {reviews?.map(reviewCardCB) ?? "No ratings found."}
        {}
      </CardContent>
      <CardFooter className="flex justify-between">Hej</CardFooter>
    </Card>
  );
}
