"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";

type CommentFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );
  return (
    <>
      <Form action={action} actionState={actionState}>
        <Textarea
          name="content"
          placeholder="What's on your mind..."
          defaultValue={actionState.payload?.get("content") as string}
        />
        <FieldError actionState={actionState} name="content" />
        <SubmitButton label="Comment" />
      </Form>
    </>
  );
};
export { CommentCreateForm };
