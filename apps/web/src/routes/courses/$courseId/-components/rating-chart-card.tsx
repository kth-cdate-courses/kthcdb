import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripNullKeys } from "@/routes/courses/$courseId/-utils/strip_null_keys";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RatingChartCard({
  courseId,
  courseRoundId,
}: {
  courseId: string;
  courseRoundId?: string;
}) {
  const { data: statisticsResponse } = useQuery({
    queryKey: [QueryKey.ReviewStatistics, courseId, courseRoundId],
    queryFn: async () => {
      return api.courses.review.statistics.get({
        query: stripNullKeys({
          courseRoundId,
          courseId,
        }),
      });
    },
  });
  const statistics = statisticsResponse?.data;
  if (!statistics) {
    return (
      <div className="w-full text-center">
        <p className="text-zinc-600">No reviews found</p>
      </div>
    );
  }
  const data = statistics?.map((num, index) => ({
    name: (index + 1).toString(),
    ratings: num,
  }));

  const numRatings = data.reduce((acc, it) => acc + it.ratings, 0);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          {!courseRoundId
            ? "Overall rating distribution"
            : "Rating distribution for the selected round"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis domain={[0, "dataMax"]} />
            <Tooltip />
            <Bar
              dataKey="ratings"
              fill="gold"
              activeBar={<Rectangle fill="gray" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="text-xs font-light italic">
        Showing {numRatings} rating{numRatings != 1 && "s"}{" "}
        {courseRoundId && "for the selected course round"}
      </CardFooter>
    </Card>
  );
}
