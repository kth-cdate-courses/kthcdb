import { CourseDto } from "$api/routes/courses/course-dto";
import { Card, CardHeader } from "@/components/ui/card";

export function TitleCard({ courseData }: { courseData: CourseDto }) {
  return (
    <Card className="w-[480px]">
      <CardHeader>
        <h1 className="text-5xl">{courseData.code}</h1>
        <h2 className="text-lg">{courseData.title}</h2>
      </CardHeader>
    </Card>
  );
}
