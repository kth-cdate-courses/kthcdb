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
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Must be minimum 2 characters long.")
    .max(20, "Must be maximum 20 characters long."),
  surname: z
    .string()
    .min(2, "Must be minimum 2 characters long.")
    .max(20, "Must be maximum 20 characters long."),
  email: z.string().email({ message: "Must be a valid email address." }),
});

export const Route = createFileRoute("/(login)/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    },
  });

  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      name,
      surname,
      email,
    }: {
      name: string;
      surname: string;
      email: string;
    }) => api.auth["sign-up"].post({ name, surname, email }),
    onSuccess: async (res) => {
      if (res?.status !== 200) {
        toast.error(res.error?.value as string);
        return;
      }
      setSuccess(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log("sign-up", values);
    mutation.mutate(values);
  }

  const navigate = useNavigate();

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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field}></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input {...field}></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    onClick={() => navigate({ to: "/signin" })}
                    type="button"
                  >
                    Already have an account? Sign in!
                  </Button>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Submitting..." : "Sign-up"}
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
