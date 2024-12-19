import { CourseDto } from "$api/routes/courses/course-dto";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CourseDescriptionCard({ data }: { data: CourseDto }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
