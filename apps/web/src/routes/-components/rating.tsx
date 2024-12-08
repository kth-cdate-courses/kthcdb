import { Star } from "@/components/ui/star";

export function Rating({
  rating,
  variant = "default",
}: {
  rating: number;
  variant?: "small" | "default";
}) {
  if (variant === "small") {
    return (
      <div className="flex items-center">
        <Star rating={1} filled={rating > 0} viewOnly />
        <p className="ml-2 text-center text-muted-foreground">
          {rating.toFixed(1)}
        </p>
      </div>
    );
  }

  // Even though the rating is default size it will become small if screen is small enough
  return (
    <div className="flex items-center">
      <p className="mr-2 text-center text-muted-foreground">
        {rating.toFixed(1)}
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
