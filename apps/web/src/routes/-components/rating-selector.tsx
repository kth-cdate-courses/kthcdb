import { Star } from "@/components/ui/star";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function RatingSelector() {
  const navigate = useNavigate({
    from: "/",
  });
  const { rating } = useSearch({
    from: "/",
  });

  const onPress = (rating: number) => (pressed: boolean) =>
    navigate({
      search: (prev) => ({
        ...prev,
        rating: pressed ? rating : undefined,
      }),
    });

  return (
    <div className="flex gap-2">
      <Toggle
        pressed={rating === 1}
        onPressedChange={onPress(1)}
        variant={"outline"}
        className="flex gap-2"
        size={"sm"}
      >
        <Star viewOnly filled />
        <p>1</p>
      </Toggle>
      <Toggle
        pressed={rating === 2}
        onPressedChange={onPress(2)}
        variant={"outline"}
        className="flex gap-2"
        size={"sm"}
      >
        <Star viewOnly filled />
        <p>2</p>
      </Toggle>
      <Toggle
        pressed={rating === 3}
        onPressedChange={onPress(3)}
        variant={"outline"}
        className="flex gap-2"
        size={"sm"}
      >
        <Star viewOnly filled />
        <p>3</p>
      </Toggle>
      <Toggle
        pressed={rating === 4}
        onPressedChange={onPress(4)}
        variant={"outline"}
        className="flex gap-2"
        size={"sm"}
      >
        <Star viewOnly filled />
        <p>4</p>
      </Toggle>
      <Toggle
        pressed={rating === 5}
        onPressedChange={onPress(5)}
        variant={"outline"}
        className="flex gap-2"
        size={"sm"}
      >
        <Star viewOnly filled />
        <p>5</p>
      </Toggle>
    </div>
  );
}
