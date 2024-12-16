import { createFileRoute } from "@tanstack/react-router";
import { ExaminationCard } from "./-components/examination-card";
import { ExaminationRound } from "$api/kth-api/course-details/type";

export const Route = createFileRoute("/courses/$courseId/")({
  component: RouteComponent,
});

const dummyRounds: ExaminationRound[] = [
  {
    examCode: "LAB1",
    title: "Laboratory assignments",
    gradeScaleCode: "AF",
    credits: 4,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
  {
    examCode: "MAS1",
    title: "Individual master's test",
    gradeScaleCode: "AF",
    credits: 1.5,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
  {
    examCode: "MAS2",
    title: "Individual master's test",
    gradeScaleCode: "AF",
    credits: 1.5,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
  {
    examCode: "TEN1",
    title: "Theory examination",
    gradeScaleCode: "PF",
    credits: 2.5,
    creditUnitLabel: "Credits",
    creditUnitAbbr: "hp",
    ladokUID: "398bbf86-73d8-11e8-b4e0-063f9afb40e3",
  },
];

function RouteComponent() {
  return (
    <div>
      <p>Courses page</p>
      <ExaminationCard rounds={dummyRounds} />
    </div>
  );
}
