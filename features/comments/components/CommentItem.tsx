import { Card } from "@/components/ui/card";
import { CommentWithMetada } from "../types";
import { CommentDeleteButton } from "./CommentDeleteButton";

type CommentItemProps = {
  comment: CommentWithMetada;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-2">
      <Card className="p-4 flex flex-1 flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      <div className="flex flex-col gap-1">
        <CommentDeleteButton id={comment.id} />
      </div>
    </div>
  );
};
export { CommentItem };
