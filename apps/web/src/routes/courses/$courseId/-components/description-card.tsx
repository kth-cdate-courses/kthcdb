import { CourseDto } from "$api/routes/courses/course-dto";

export function CourseDescriptionCard({ data }: { data: CourseDto }) {
  return (
    <div>
      <h3>About</h3>
      <div
        className="text-sm italic text-zinc-600"
        dangerouslySetInnerHTML={{ __html: data.content as string }}
      />
    </div>
  );
}
