import { CourseRoundDto } from "$api/routes/courses/course-round-dto";
import { Combobox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "@/components/ui/star";
import { Textarea } from "@/components/ui/textarea";
import {
  courseRoundToPrettyString,
  parseKthTerm,
} from "@/routes/courses/$courseId/-utils/parse-kth-term";
import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  courseRoundId: z.string(),
  rating: z
    .number()
    .int()
    .min(1, "Must be minimum 1.")
    .max(5, "Must be maximum 5."),
  review: z.string().optional(),
});

export function ReviewForm({
  courseRounds,
}: {
  courseRounds: CourseRoundDto[];
}) {
  const { courseId } = useParams({
    from: "/courses/$courseId/",
  });
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      api.courses.review.index.post(
        {
          courseRoundId: values.courseRoundId,
          rating: values.rating,
          comment: values.review,
        },
        {
          fetch: {
            credentials: "include",
          },
        },
      ),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const result = await mutateAsync(values);
    if (result.status === 200 && result.data?.success) {
      form.reset();
      // Will force the course page to revalidate
      queryClient.invalidateQueries({
        exact: true,
        queryKey: [QueryKey.Course, courseId],
      });
      toast.success("Review submitted");
    } else if (result.data?.success === false) {
      toast.error("Error", { description: result.data.message });
    }
  }

  return (
    <div className="max-w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="flex items-end justify-between gap-5">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RatingSelector
                      rating={field.value}
                      onRatingSet={(rating) => field.onChange(rating)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseRoundId"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <Combobox
                      value={field.value}
                      setValue={field.onChange}
                      options={courseRounds.map((round) => ({
                        label: courseRoundToPrettyString(round),
                        value: round.id,
                      }))}
                      noResultFoundText="No terms found"
                      searchText="Select a course term"
                      hideSearch={courseRounds.length < 5}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2">Submit review</Button>
        </form>
      </Form>
    </div>
  );
}

function RatingSelector({
  rating,
  onRatingSet,
}: {
  rating: number | null;
  onRatingSet: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1">
      <div onClick={() => onRatingSet(1)}>
        <Star filled={rating != null} />
      </div>
      <div onClick={() => onRatingSet(2)}>
        <Star filled={rating != null && rating >= 2} />
      </div>
      <div onClick={() => onRatingSet(3)}>
        <Star filled={rating != null && rating >= 3} />
      </div>
      <div onClick={() => onRatingSet(4)}>
        <Star filled={rating != null && rating >= 4} />
      </div>
      <div onClick={() => onRatingSet(5)}>
        <Star filled={rating != null && rating >= 5} />
      </div>
    </div>
  );
}
