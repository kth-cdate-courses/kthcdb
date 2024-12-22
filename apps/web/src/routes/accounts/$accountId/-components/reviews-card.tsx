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
  return (
    <Card className="flex w-full flex-col justify-between">
      <CardHeader className="flex items-center p-12">
        <CardTitle className="text-2xl">Recent reviews</CardTitle>
      </CardHeader>
      <CardContent className="col-span-2 grid w-[80%] grid-cols-2 gap-8 self-center">
        {userData.reviews.map((review) => (
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
