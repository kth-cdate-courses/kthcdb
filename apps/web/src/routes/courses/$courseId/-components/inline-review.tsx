import { ReviewDto } from "$api/routes/courses/review/review-dto";
import { Button } from "@/components/ui/button";
import { RatingDisplay } from "@/routes/courses/$courseId/-components/rating-display";
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
        <h3>{review.author}</h3>
        <div className="flex items-center gap-2">
          <RatingDisplay rating={review.rating} />-
          <p className="text-sm">{review.courseCode}</p>
        </div>
      </div>
      <div>
        <p className="text-sm italic text-zinc-600">
          "
          {showViewMoreOption && !viewMore
            ? review.body?.slice(0, CUT_OFF)
            : review.body}
          "
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
    </div>
  );
}
