import { UserDto } from "$api/routes/user/user-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewCard } from "@/routes/-components/review-card";
import { useParams } from "@tanstack/react-router";

export function ReviewsCard({ userData }: { userData: UserDto }) {
  const { accountId } = useParams({
    from: "/accounts/$accountId/",
  });

  return (
    <Card className="mx-4 flex h-[80vh] w-5/12 flex-col justify-between">
      <CardHeader className="flex items-center gap-4">
        <CardTitle className="text-xl">Recent reviews</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto grid grid-cols-2 gap-4">
        {userData.reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
