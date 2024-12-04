import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EmailLoginForm } from "./-components/email-form";
import { z } from "zod";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-full justify-between">
      <div className="main">
        <h1>KTHdB</h1>
      </div>
      <div className="flex w-1/3 justify-center bg-red-800">
        <EmailLoginForm></EmailLoginForm>
      </div>
    </div>
  );
}
