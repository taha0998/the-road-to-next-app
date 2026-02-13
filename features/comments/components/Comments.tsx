import CardCompact from "@/components/CardCompact";
import { getAuth } from "@/features/auth/actions/getAuth";
import { isOwner } from "@/features/auth/utils/isOwner";
import { CommentWithMetada } from "../types";
import { CommentCreateForm } from "./CommentCreateForm";
import { CommentDeleteButton } from "./CommentDeleteButton";
import { CommentItem } from "./CommentItem";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetada[];
};

const Comments = async ({ ticketId, comments = [] }: CommentsProps) => {
  const { user } = await getAuth();
  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment  will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                ? [<CommentDeleteButton key="1" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
};
export { Comments };
