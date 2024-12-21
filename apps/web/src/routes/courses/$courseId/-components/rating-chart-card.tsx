import { ReviewDto } from "$api/routes/courses/review/review-dto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Rectangle, Tooltip, XAxis, YAxis } from "recharts";

export function RatingChartCard({
  reviewData,
}: {
  reviewData: ReviewDto[] | null;
}) {
  if (!reviewData) {
    return "";
  }
  const ratings = reviewData.map((it) => it.rating);
  const numOfEachRatingScore = ratings
    ? Array(5)
        .fill(0)
        .map(
          (_, index) => ratings.filter((rating) => rating === index + 1).length,
        )
    : null;
  const data = numOfEachRatingScore?.map((num, index) => ({
    name: (index + 1).toString(),
    ratings: num,
  }));

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="ratings"
            fill="gold"
            activeBar={<Rectangle fill="gray" />}
          />
        </BarChart>
      </CardContent>
    </Card>
  );
}
