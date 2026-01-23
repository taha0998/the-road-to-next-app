'use client'
import { useActionState } from "react";

import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Input } from "@/components/ui/input";

import { signUp } from "../actions/signUp";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form actionState={actionState} action={action}>
      <Input name="username" placeholder="Username" />
      <FieldError actionState={actionState} name="username" />
      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />
      <Input name="password" placeholder="password" type="password" />
      <FieldError actionState={actionState} name="password" />
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
