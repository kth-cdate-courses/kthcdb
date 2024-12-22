import { ReviewDto } from "$api/routes/courses/review/review-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReviewCard } from "@/routes/-components/review-card";

export type ReviewFilters = {
  rating: number | null;
  term: string | null;
};

export function ReviewsCard({ reviews }: { reviews: ReviewDto[] | null }) {
  return (
    <Card className="flex max-h-[480px] w-[320px] flex-col">
      <CardHeader className="flex flex-col justify-between">
        <CardTitle className="mb-1">
          <h1>Reviews</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="block max-h-full gap-2 overflow-scroll">
        {reviews?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        )) ?? "No reviews found."}
      </CardContent>
      {reviews && reviews.length > 0 && (
        <CardFooter className="flex flex-col">
          <Separator className="my-4" />
          <p className="self-start text-left">
            Found {reviews.length} review{reviews.length > 1 ? "s" : ""}
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
