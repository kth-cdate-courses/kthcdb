import { Badge } from "@/components/ui/badge";
import { Star } from "@/components/ui/star";

export function Rating({
  rating,
  variant = "default",
  reviewCount,
}: {
  rating: number | null;
  reviewCount: number | null;
  variant?: "small" | "default";
}) {
  if (rating == null && variant === "default")
    return (
      <Badge variant="outline" className="text-nowrap">
        Not rated
      </Badge>
    );

  if (variant === "small") {
    return (
      <div className="flex items-center">
        <Star rating={1} filled={(rating ?? 0) > 0} viewOnly />
        {rating == null ? (
          <Badge variant="outline" className="ml-2">
            N/A
          </Badge>
        ) : (
          <p className="ml-2 text-center text-muted-foreground">
            {rating.toFixed(1)}
          </p>
        )}
      </div>
    );
  }

  if (rating == null) return null; // This will never be reached (just for type checking)

  const reviewCountShort =
    reviewCount == null
      ? null
      : Intl.NumberFormat("en-US", {
          notation: "compact",
        }).format(reviewCount);

  // Even though the rating is default size it will become small if screen is small enough
  return (
    <div className="flex items-center">
      <p className="mr-2 text-center text-muted-foreground">
        {rating.toFixed(1)}{" "}
        <span className="text-sm">
          {reviewCount == null ? null : `(${reviewCountShort})`}
        </span>
      </p>
      <Star rating={1} filled={rating > 0.5} viewOnly />
      <Star
        className="hidden md:block"
        rating={2}
        filled={rating > 1.5}
        viewOnly
      />
      <Star
        className="hidden md:block"
        rating={3}
        filled={rating > 2.5}
        viewOnly
      />
      <Star
        className="hidden md:block"
        rating={4}
        filled={rating > 3.5}
        viewOnly
      />
      <Star
        className="hidden md:block"
        rating={5}
        filled={rating > 4.5}
        viewOnly
      />
    </div>
  );
}
