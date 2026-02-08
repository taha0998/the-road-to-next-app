import { Prisma } from "@prisma/client";

type CommentItemProps = {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: {
          email: true;
        };
      };
    };
  }>;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return <> {comment.content}</>;
};
export { CommentItem };
