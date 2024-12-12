import { cn } from "@/utilities/shadcn-utils";

export const ReviewCard = ({
  courseId,
  author,
  // image,
  rating,
  body,
  createdAt,
}: {
  author: string;
  courseId: string;
  rating: number;
  createdAt: Date;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-40 w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src="/favicon.ico"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium">{author}</figcaption>
          <p className="text-xs font-medium">{courseId}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
      <p className="text-xs font-light">{createdAt.toString()}</p>
    </figure>
  );
};
