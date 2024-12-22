import Marquee from "@/components/ui/marquee";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ReviewCard } from "./review-card";

export function ReviewMarquee() {
  const { data: reviewsResponse } = useQuery({
    queryKey: [QueryKey.Review],
    queryFn: async () =>
      await api.courses.review.index.get({
        query: {
          count: 20,
          requireBody: true,
        },
      }),
  });

  const reviews = reviewsResponse?.data;

  if (reviews == null || reviews.length == 0) return null;

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <div className="relative flex w-screen flex-col items-center justify-center overflow-hidden bg-opacity-40">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <Link
            to="/courses/$courseId"
            params={{ courseId: review.courseCode }}
          >
            <ReviewCard key={review.id} review={review} />
          </Link>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <Link
            to="/courses/$courseId"
            params={{ courseId: review.courseCode }}
          >
            <ReviewCard key={review.id} review={review} />
          </Link>
        ))}
      </Marquee>

      {/* Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[25vw] max-w-52 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[25vw] max-w-52 bg-gradient-to-l from-white"></div>
    </div>
  );
}
