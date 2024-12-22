import { UserDto } from "$api/routes/user/user-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewCard } from "@/routes/-components/review-card";

export function ReviewsCard({ userData }: { userData: UserDto }) {
  return (
    <Card className="flex w-full flex-col justify-between">
      <CardHeader className="flex items-center gap-4">
        <CardTitle className="text-xl">Recent reviews</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto grid grid-cols-2 gap-4 overflow-auto">
        {userData.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
