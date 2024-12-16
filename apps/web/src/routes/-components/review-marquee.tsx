import Marquee from "@/components/ui/marquee";
import { ReviewCard } from "./review-card";

const dummyReviews = [
  {
    author: "Lars F",
    courseId: "SF1320",
    rating: 5,
    createdAt: new Date("2024-03-15"),
    body: "Great course, really learned a lot about algorithms!!!",
  },
  {
    author: "Marcus D",
    courseId: "DD1500",
    rating: 2,
    createdAt: new Date("2024-04-22"),
    body: "Very interesting, but the workload was way too heavy :(",
  },
  {
    author: "Viggo K",
    courseId: "DD2222",
    rating: 3,
    createdAt: new Date("2024-05-10"),
    body: "Good course but some topics could be more practical.",
  },
  {
    author: "Svante L",
    courseId: "SF1332",
    rating: 4,
    createdAt: new Date("2024-06-05"),
    body: "Good mix of theory and hands-on projects!",
  },
  {
    author: "Petter B",
    courseId: "SF1923",
    rating: 2,
    createdAt: new Date("2024-07-12"),
    body: "The course content was outdated and hard to follow",
  },
  {
    author: "Dena H",
    courseId: "SE1010",
    rating: 5,
    createdAt: new Date("2024-08-30"),
    body: "Excellent course, very engaging and informative!",
  },
];

export function ReviewMarquee() {
  const firstRow = dummyReviews.slice(0, dummyReviews.length / 2);
  const secondRow = dummyReviews.slice(dummyReviews.length / 2);
  return (
    <div className="relative flex w-screen flex-col items-center justify-center overflow-hidden bg-opacity-40">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.author} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.author} {...review} />
        ))}
      </Marquee>

      {/* Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[25vw] max-w-52 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[25vw] max-w-52 bg-gradient-to-l from-white"></div>
    </div>
  );
}
