import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

export const ReviewCard = ({
  courseCode,
  author,
  // image,
  rating,
  body,
  createdAt,
}: {
  author: string;
  courseCode: string;
  rating: number;
  createdAt: Date;
  body: string | null;
}) => {
  return (
    <Card className="flex h-48 w-64 flex-col justify-between overflow-hidden rounded-xl">
      <CardHeader className="mb-0 flex flex-col px-3 pb-1 pt-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <img
              className="mt-1 h-[32px] rounded-full"
              alt="User profile picture"
              src="/favicon.ico"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{author}</p>
              <p className="text-xs font-medium">{courseCode}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex w-20 p-0">
              {Array.from({ length: 5 }, (_, index) =>
                index < rating ? (
                  <Star fill="gold" strokeWidth={0} />
                ) : (
                  <Star fill="grey" strokeWidth={0} />
                ),
              )}
            </p>
          </div>
        </div>
        <Separator className="pt-0" />
      </CardHeader>

      <CardContent className="mx-2 h-full overflow-auto hyphens-auto rounded-sm border-[1px] border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-light">
        {body}
      </CardContent>
      <CardFooter className="mb-0 h-4 w-full items-start px-4 pt-0.5 text-xs font-thin">
        {new Date(createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </CardFooter>
    </Card>
  );
};
