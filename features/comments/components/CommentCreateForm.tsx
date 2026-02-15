"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/toActinoState";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { CommentWithMetada } from "../types";

type CommentFormProps = {
  ticketId: string;
  handleAddComment?: (comment: CommentWithMetada | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  handleAddComment,
}: CommentFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetada | undefined>,
  ) => {
    handleAddComment?.(actionState.data);
  };

  return (
    <>
      <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
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
