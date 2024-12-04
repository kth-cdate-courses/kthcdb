import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignUpForm } from "./sign-up";
import { SignInForm } from "./sign-in";

export function EmailLoginForm() {
  const [action, setAction] = useState<"sign-in" | "sign-up" | null>(null);

  if (action === "sign-in") {
    return <SignInForm onCancel={() => setAction(null)}></SignInForm>;
  }

  if (action === "sign-up") {
    return <SignUpForm onCancel={() => setAction(null)}></SignUpForm>;
  }

  return (
    <div className="flex w-3/5 flex-col justify-between text-center">
      <h2 className="text-gray-50">Please sign-up or sign-in.</h2>
      <div className="flex justify-evenly">
        <Button onClick={() => setAction("sign-up")}>Sign-up</Button>
        <Button onClick={() => setAction("sign-in")}>Sign-in</Button>
      </div>
    </div>
  );
}
