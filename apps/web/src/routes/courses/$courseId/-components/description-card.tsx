import { CourseDto } from "$api/routes/courses/course-dto";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CourseDescriptionCard({ data }: { data: CourseDto }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          {data.description ? "Course Description" : "Course Goals"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{ __html: data.description || data.goals }}
        ></div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
