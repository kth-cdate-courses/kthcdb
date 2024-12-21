import { Combobox } from "@/components/combo-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "@/components/ui/star";
import { courseRoundToPrettyString } from "@/routes/courses/$courseId/-utils/parse-kth-term";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Asterisk } from "lucide-react";

export function ReviewFiltering({
  rounds,
}: {
  rounds: {
    id: string;
    term: string;
    shortName: string;
    programCode: string[] | null;
    rating: number | null;
  }[];
}) {
  const navigate = useNavigate({
    from: "/courses/$courseId",
  });
  const { rating, courseRoundId } = useSearch({
    from: "/courses/$courseId/",
  });
  return (
    <div className="flex w-full gap-2">
      <Combobox
        className="flex-1"
        options={[
          {
            label: "All terms",
            value: "default",
          },
          ...rounds.map((round) => ({
            label: courseRoundToPrettyString(round),
            value: round.id,
          })),
        ]}
        value={courseRoundId ?? "default"}
        setValue={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              courseRoundId: value === "default" ? undefined : value,
            }),
          })
        }
      />
      <Select
        onValueChange={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              rating: value === "default" ? undefined : parseInt(value),
            }),
          })
        }
        value={rating?.toString()}
        defaultValue="default"
      >
        <SelectTrigger id="rating" className="w-[90px]">
          <SelectValue defaultValue="default" />
        </SelectTrigger>
        <SelectContent position="popper" className="">
          <SelectItem
            key={"default"}
            value={"default"}
            className="flex items-center justify-start gap-3"
          >
            <span className="text-center">{<Asterisk className="w-4" />}</span>
          </SelectItem>
          {[1, 2, 3, 4, 5].map((it) => (
            <SelectItem key={it} value={it.toString()}>
              <div className="flex items-center justify-between gap-3">
                <Star filled className="h-5 w-5" />
                <p className="text-center font-mono">{it}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
