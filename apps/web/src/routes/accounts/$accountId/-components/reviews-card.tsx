import { UserDto } from "$api/routes/user/user-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InlineReview } from "@/routes/courses/$courseId/-components/inline-review";

export function ReviewsCard({ userData }: { userData: UserDto }) {
  const reviews = userData.reviews.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1,
  );
  return (
    <Card className="flex w-full flex-col justify-between">
      <CardHeader className="flex items-center p-12">
        <CardTitle className="text-center text-2xl">User Reviews</CardTitle>
      </CardHeader>
      <CardContent className="col-span-2 grid w-[80%] grid-cols-1 gap-8 self-center lg:grid-cols-2">
        {[...reviews, ...reviews, ...reviews].map((review) => (
          <InlineReview
            key={review.id}
            review={review}
            className="h-min rounded-lg border-[1px] border-zinc-200 p-4 px-5"
          />
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
