import { Prisma } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

type CommentSection = {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: {
          email: true;
        };
      };
    };
  }>;
  className?: string;
};

const Comment = ({ comment, className }: CommentSection) => {
  const commentDate = new Date(comment.createdAt);
  const year = commentDate.getFullYear();
  const mounth = commentDate.getMonth();
  const day = commentDate.getDay();
  const hours = commentDate.getHours();
  const minutes = commentDate.getMinutes();
  const dateString = `${year}-${mounth}-${day}, ${hours}:${minutes}`;
  return (
    <div className={className}>
      <Card className="gap-1 py-3">
        <CardHeader>
          <CardDescription>
            <div className="flex justify-between items-center">
              <p>{comment.user.email}</p>
              <p>{dateString}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{comment.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};
export { Comment };
