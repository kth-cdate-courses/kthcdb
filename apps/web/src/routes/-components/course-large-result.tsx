import { CourseDto } from "$api/routes/courses/course-dto";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/routes/-components/rating";
import { cn } from "@/utilities/shadcn-utils";
import { GraduationCapIcon } from "lucide-react";

export function CourseLargeResult({ course }: { course: CourseDto }) {
  return (
    <div className="group flex cursor-pointer justify-between gap-4 rounded-lg p-4 hover:bg-zinc-200/60 active:opacity-70">
      <div className="flex items-center gap-4">
        <GraduationCapIcon className="shrink-0" />
        <Badge className="h-min shrink-0 text-nowrap">{course.code}</Badge>
        <p
          className={cn("shrink group-hover:opacity-80", {
            "text-sm": course.title.length > 40,
          })}
        >
          {course.title}
        </p>
      </div>

      <Rating rating={course.rating} reviewCount={course.reviewCount} />
    </div>
  );
}
