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

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address." }),
});

export function EmailLoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [submitted, setSubmitted] = useState<"signin" | "signup" | null>(null);

  function handleSignUp(values: z.infer<typeof formSchema>) {
    console.log("signup", values);
    setSubmitted("signup");
  }

  function handleSignIn(values: z.infer<typeof formSchema>) {
    console.log("signin", values);
    setSubmitted("signin");
  }

  if (submitted) {
    return (
      <div className="flex flex-col">
        <h2 className="font-bold">
          {
            submitted === "signup"
              ? "Sign-up link has been sent!"
              : "Sign-in link has been sent!" // TODO: REPLACE WITH REDIRECT
          }
        </h2>
        <p className="mt-2">Please check your email for the magic link.</p>
      </div>
    );
  }

  return (
    <div className="flex w-3/5 flex-col bg-zinc-50 md:rounded-lg">
      <Form {...form}>
        <form className="">
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
          <div className="flex justify-evenly">
            <Button
              type="button"
              onClick={() => form.handleSubmit(handleSignUp)()}
            >
              Sign-up
            </Button>

            <Button
              type="button"
              onClick={() => form.handleSubmit(handleSignIn)()}
            >
              Sign-in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
