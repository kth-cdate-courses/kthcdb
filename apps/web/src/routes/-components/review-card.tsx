export const ReviewCard = ({
  courseCode,
  author,
  // image,
  rating,
  comment,
  createdAt,
}: {
  author: string;
  courseCode: string;
  rating: number;
  createdAt: Date;
  comment: string | null;
}) => {
  return (
    <figure className="flex h-36 w-60 cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-zinc-50 p-4">
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
          <div className="flex gap-2">
            <p className="text-xs font-medium">{courseCode}</p>
            <p className="text-xs font-medium">
              {Array.from({ length: 5 }, (_, index) =>
                index < rating ? "★" : "☆",
              )}
            </p>
          </div>
        </div>
      </div>
      <blockquote className="mt-2 text-xs">{comment}</blockquote>
      <p className="text-xs font-light">
        {new Date(createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </figure>
  );
};
