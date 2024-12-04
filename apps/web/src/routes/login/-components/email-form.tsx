import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignUpForm } from "./sign-up";
import { SignInForm } from "./sign-in";

export function EmailLoginForm() {
  const [submitAction, setSubmitAction] = useState<
    "sign-in" | "sign-up" | null
  >(null);

  if (submitAction === "sign-in") {
    return <SignInForm></SignInForm>;
  }

  if (submitAction === "sign-up") {
    return <SignUpForm></SignUpForm>;
  }

  return (
    <div className="flex w-3/5 flex-col justify-between text-center">
      <h2 className="text-gray-50">Please sign-up or sign-in.</h2>
      <div className="flex justify-evenly">
        <Button onClick={() => setSubmitAction("sign-up")}>Sign-up</Button>
        <Button onClick={() => setSubmitAction("sign-in")}>Sign-in</Button>
      </div>
    </div>
  );
}
