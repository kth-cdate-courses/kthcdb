import { ReviewDto } from "$api/routes/courses/review/review-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  return (
    <Card className="flex w-[320px] flex-col">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent className="inline-block">
        <p className="break-words">{JSON.stringify(data)}</p>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
