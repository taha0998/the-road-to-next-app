"use client";
import { LucideTrash } from "lucide-react";
import { useActionState } from "react";
import { Form } from "@/components/form/Form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
};

const CommentDeleteButton = ({ id }: CommentDeleteButtonProps) => {
  const [actionState, action] = useActionState(
    deleteComment.bind(null, id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    </Form>
  );
};
export { CommentDeleteButton };
