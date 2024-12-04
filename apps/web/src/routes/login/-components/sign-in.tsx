import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/utilities/http-client";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address." }),
});

export function SignInForm({ onCancel }: { onCancel: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (email: string) =>
      api.auth["sign-in"].post({ email }).then((res) => res.data),
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log("signin", values);
    mutation.mutate(values.email);
  }

  if (success) {
    return (
      <div className="flex flex-col">
        <h2 className="font-bold">Sign-in link has been sent!</h2>
        <p className="mt-2">Please check your email for the magic link.</p>
      </div>
    );
  }

  return (
    <div className="flex w-3/5 flex-col bg-zinc-50 p-4 md:rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormDescription>
                  The email address associated with your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex justify-evenly">
            <Button onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Sign-in"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
