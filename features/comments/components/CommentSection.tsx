import { Ticket } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetComments } from "@/features/ticket/queries/GetComments";

import { Comment } from "./Comment";
// import { CommentCreateForm } from "./CommentCreateForm";

type CommentSectionProps = {
  ticket: Ticket;
};

const CommentSection = async ({ ticket }: CommentSectionProps) => {
  const Comments = await GetComments(ticket.id);
  return (
    <div className="w-full flex flex-col gap-4 max-w-145 justify-center">
      <Card className="w-full py-5">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl">Create Comment</h2>
          </CardTitle>
          <CardDescription>A new comment will be created</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <CommentCreateForm ticketId={ticket.id} /> */}
        </CardContent>
      </Card>
      <div className="flex flex-col w-full items-end gap-3">
        {Comments.length ? (
          Comments.map((comment) => (
            <Comment comment={comment} key={comment.id} className="w-[90%]" />
          ))
        ) : (
          <h1>No first comment yet</h1>
        )}
        <span className="text-sm italic">No more comments</span>
      </div>
    </div>
  );
};

export { CommentSection };
