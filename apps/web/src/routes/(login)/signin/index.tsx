import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

export const Route = createFileRoute("/(login)/signin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();

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

  return (
    <div className="flex w-full justify-between">
      <div className="main">
        <h1>KTHdB</h1>
      </div>
      <div className="flex w-1/3 justify-center bg-red-800">
        {success ? (
          <div className="flex flex-col">
            <h2 className="font-bold">Sign-in link has been sent!</h2>
            <p className="mt-2">Please check your email for the magic link.</p>
          </div>
        ) : (
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
                  <Button
                    onClick={() => navigate({ to: "/signup" })}
                    type="button"
                  >
                    Don't have an account? Sign up!
                  </Button>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Submitting..." : "Sign-in"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
