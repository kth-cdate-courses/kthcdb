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
import { useState } from "react";

function reviewCardCB(review: ReviewDto) {
  return <ReviewCard key={review.id} {...review} />;
}

export type ReviewFilters = {
  rating: number | null;
  courseRound: string | null;
};

export function ReviewsCard({
  data,
  filters,
  onUpdateFilters,
}: {
  data: ReviewDto[] | null;
  filters: ReviewFilters;
  onUpdateFilters: (newFilters: ReviewFilters) => void;
}) {
  if (!data) {
    return (
      <Card className="w-[320px]">
        <CardHeader>
          <CardTitle>No reviews found</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  const reviews = data;
  return (
    <Card className="flex max-h-[480px] w-[320px] flex-col">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>
          <h1>Reviews</h1>
        </CardTitle>
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
