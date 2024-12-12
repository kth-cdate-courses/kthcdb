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
    mutationFn: async (email: string) => api.auth["sign-in"].post({ email }),
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

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log("signin", values);
    mutation.mutate(values.email);
  }

  return (
    <div className="root">
      <img src="/landing-image.jpg" alt="KTH Logo" className="logo" />
      <div className="sidebar">
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
                <div className="buttonParent">
                  <Button
                    onClick={() => navigate({ to: "/signup" })}
                    type="button"
                    className="changePageButton"
                  >
                    No account? Sign up!
                  </Button>
                  <Button
                    className="submitButton"
                    type="submit"
                    disabled={mutation.isPending}
                  >
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
