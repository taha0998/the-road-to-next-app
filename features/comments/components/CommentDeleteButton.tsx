"use client";
import { LucideLoader2, LucideTrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { deleteComment } from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  handleDeleteComment: (id: string) => void;
};

export const CommentDeleteButton = ({
  id,
  handleDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending) => (
      <Button variant="outline" size="icon">
        {isPending ? (
          <LucideLoader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LucideTrash className="w-4 h-4" />
        )}
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
