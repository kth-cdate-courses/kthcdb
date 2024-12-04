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
import { useQuery } from "@tanstack/react-query";
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
    <div>
      <SignInForm></SignInForm>
      <h2>TEXT TEXT TEXT</h2>
      <SignUpForm></SignUpForm>
    </div>
  );
}
