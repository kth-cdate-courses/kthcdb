import { ExaminationRound } from "$api/kth-api/course-details/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ExaminationRoundRowCB(round: ExaminationRound) {
  return (
    <TableRow key={round.examCode}>
      <TableCell className="text-sm font-bold">{round.examCode}</TableCell>
      <TableCell className="text-sm font-semibold">
        {round.credits.toFixed(1)} {round.creditUnitAbbr}
      </TableCell>
      <TableCell className="text-sm">{round.gradeScaleCode}</TableCell>
    </TableRow>
  );
}

export function ExaminationCard({ rounds }: { rounds: ExaminationRound[] }) {
  return (
    <Card className="w-[320px]">
      <CardHeader className="-mb-4">
        <CardTitle>Examinations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]">Code</TableHead>
              <TableHead className="w-[64px]">Credits</TableHead>
              <TableHead className="">Grading</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds.map((round) => ExaminationRoundRowCB(round))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
