import { ReviewDto } from "$api/routes/courses/review/review-dto";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utilities/shadcn-utils";
import { useSession } from "@/utilities/useSession";
import { Link } from "@tanstack/react-router";
import { StarIcon } from "lucide-react";

export const ReviewCard = ({
  review: {
    userId,
    author,
    body,
    courseCode,
    authorProgramCode: programCode,
    rating,
    createdAt,
  },
}: {
  review: ReviewDto;
}) => {
  const { user } = useSession();
  const CUT_OFF = 200;
  const authorIsCurrentUser = user?.id === userId;
  return (
    <Card
      className={cn("flex h-48 w-64 flex-col justify-between rounded-xl", {
        "shadow-yellow-500": authorIsCurrentUser,
      })}
    >
      <CardHeader className="mb-0 flex flex-col px-3 pb-1 pt-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-full flex-row gap-3">
            <div className="flex flex-1">
              <div>
                <Link
                  to="/accounts/$accountId"
                  params={{
                    accountId: userId,
                  }}
                >
                  {authorIsCurrentUser ? (
                    <Badge variant="outline" className="text-nowrap">
                      Your review
                    </Badge>
                  ) : (
                    <p className="text-nowrap text-sm font-medium hover:underline">
                      {author}
                    </p>
                  )}
                </Link>
                {programCode && (
                  <p className="text-nowrap text-xs font-medium">
                    Studying {programCode}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col items-end gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) =>
                    index < rating ? (
                      <StarIcon fill="black" size={12} />
                    ) : (
                      <StarIcon size={12} />
                    ),
                  )}
                </div>
                <p className="text-xs font-medium">{courseCode}</p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="pt-0" />
      </CardHeader>

      <CardContent className="mx-2 h-full overflow-auto hyphens-auto rounded-sm px-2 py-1 text-[11px] font-light">
        {body?.slice(0, CUT_OFF)}
        {(body?.length ?? 0) > CUT_OFF ? "..." : ""}
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
