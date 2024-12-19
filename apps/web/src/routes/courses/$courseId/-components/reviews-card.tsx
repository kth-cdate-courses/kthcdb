import { ReviewDto } from "$api/routes/courses/review/review-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewCard } from "@/routes/-components/review-card";

function reviewCardCB(review: ReviewDto) {
  return <ReviewCard key={review.id} {...review} />;
}

export function ReviewsCard({ data }: { data: ReviewDto[] | null }) {
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
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent className="block max-h-full gap-2 overflow-scroll">
        {reviews.map(reviewCardCB)}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
