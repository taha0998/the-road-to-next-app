"use client";
import { useActionState } from "react";

import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Input } from "@/components/ui/input";

import { signIn } from "../actions/signIn";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);
  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />
      <Input
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
