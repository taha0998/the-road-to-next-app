"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CardCompact from "@/components/CardCompact";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationData } from "@/types/pagination";
import { getComments } from "../queries/getComments";
import { CommentWithMetada } from "../types";
import { CommentCreateForm } from "./CommentCreateForm";
import { CommentDeleteButton } from "./CommentDeleteButton";
import { CommentItem } from "./CommentItem";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginationData<CommentWithMetada>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();

  const handleAddComment = () => queryClient.invalidateQueries({ queryKey });

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment  will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            handleAddComment={handleAddComment}
          />
        }
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
        {comments.length === 0 ? (
          <div className="flex justify-end">
            <span className="text-sm italic float-right">No comments yet.</span>
          </div>
        ) : (
          <div ref={ref}>
            {isFetchingNextPage && <Skeleton className="h-19" />}
            {!hasNextPage && (
              <span className="text-sm italic float-right">
                No more comments.
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export { Comments };
