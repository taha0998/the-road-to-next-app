"use client";
import { useState } from "react";
import CardCompact from "@/components/CardCompact";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/getComments";
import { CommentWithMetada } from "../types";
import { CommentCreateForm } from "./CommentCreateForm";
import { CommentDeleteButton } from "./CommentDeleteButton";
import { CommentItem } from "./CommentItem";

type CommentsProps = {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMetada[];
    metadata: {
      count: number;
      hasNext: boolean;
    };
  };
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginationComments = await getComments(ticketId, comments.length);
    const moreComments = morePaginationComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginationComments.metadata);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id),
    );
  };

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
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="1"
                      id={comment.id}
                      handleDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
        {metadata.hasNext && (
          <div className="flex flex-col justify-center ml-8">
            <Button variant="ghost" onClick={handleMore}>
              More
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export { Comments };
