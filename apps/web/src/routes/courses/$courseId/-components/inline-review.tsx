import { ReviewDto } from "$api/routes/courses/review/review-dto";
import { Button } from "@/components/ui/button";
import { RatingDisplay } from "@/routes/courses/$courseId/-components/rating-display";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function InlineReview({
  review,
  ...rest
}: { review: ReviewDto } & React.ComponentProps<"div">) {
  const [viewMore, setViewMore] = useState(false);

  const CUT_OFF = 100;
  const showViewMoreOption = (review.body?.length ?? 0) > CUT_OFF;

  return (
    <div {...rest}>
      <div className="">
        <Link
          to={"/accounts/" + review.userId}
          params={{ courseId: review.courseCode }}
        >
          <h3>{review.author}</h3>
        </Link>
        <div className="wrap flex flex-wrap items-center gap-2">
          <RatingDisplay rating={review.rating} />
          <p className="text-sm font-medium">{review.courseCode}</p>
        </div>
      </div>
      <div>
        <p className="text-sm italic text-zinc-600">
          {showViewMoreOption && !viewMore
            ? review.body?.slice(0, CUT_OFF)
            : review.body}
        </p>
      </div>
      {showViewMoreOption && (
        <Button
          variant="link"
          onClick={() => setViewMore(!viewMore)}
          className="px-0"
        >
          {viewMore ? "view less..." : "view more..."}
        </Button>
      )}
      <p className="-mb-1 mt-2 text-xs font-light">
        {new Date(review.createdAt).toLocaleDateString("en-UK", {
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
