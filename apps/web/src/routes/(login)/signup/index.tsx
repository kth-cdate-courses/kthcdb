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
import "../styles.css";
import { ArrowLeftRight, House, UserRoundPlus } from "lucide-react";

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
      if (res?.error) {
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
    mutation.mutate(values);
  }

  const navigate = useNavigate();

  return (
    <div className="root">
      <img src="/landing-image.jpg" alt="KTH Logo" className="bg" />
      <div className="sidebar">
        <img src="/templogo.png" alt="KTHcdb Logo" className="logo" />
        {success ? (
          <div className="submitted">
            <h2 className="font-bold">Sign-in link has been sent!</h2>
            <p className="mt-2">Please check your email for the magic link.</p>
            <Button
              onClick={() => navigate({ to: "/" })}
              type="button"
              className="returnButton"
            >
              Return
            </Button>
          </div>
        ) : (
          <div className="logonForm">
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
                <div className="buttonGroup">
                  <Button
                    className="submitButton"
                    type="submit"
                    disabled={mutation.isPending}
                  >
                    <UserRoundPlus />
                    {mutation.isPending ? "Pending..." : "Sign-up"}
                  </Button>
                  <div className="buttonTwins">
                    <Button
                      onClick={() => navigate({ to: "/signin" })}
                      type="button"
                      className="changePageButton"
                      variant="secondary"
                    >
                      <ArrowLeftRight />
                      Sign-in
                    </Button>
                    <Button
                      onClick={() => navigate({ to: "/" })}
                      type="button"
                      className="homeButton"
                      variant="secondary"
                    >
                      <House />
                      Home
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
