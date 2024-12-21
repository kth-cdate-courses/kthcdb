import { cn } from "@/utilities/shadcn-utils";
import { StarIcon } from "lucide-react";

export function RatingDisplay({
  rating,
  className,
  size,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? (
          <StarIcon fill="black" size={size ?? 12} />
        ) : (
          <StarIcon size={size ?? 12} />
        ),
      )}
    </div>
  );
}
