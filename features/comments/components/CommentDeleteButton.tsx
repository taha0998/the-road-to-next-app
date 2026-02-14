"use client";
import { LucideTrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { deleteComment } from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  handleDeleteComment: (id: string) => void;
};

const CommentDeleteButton = ({
  id,
  handleDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    ),
    onSuccess: () => handleDeleteComment(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};
export { CommentDeleteButton };
