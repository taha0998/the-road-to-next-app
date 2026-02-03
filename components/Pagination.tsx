import { useEffect } from "react";

import { Button } from "./ui/button";

type PaginationObject = {
  page: number;
  size: number;
};
export type paginationTicketMatadataObject = {
  count: number;
  hasNextPage: boolean;
};

type PaginationProps = {
  pagination: PaginationObject;
  onPagination: (pagination: PaginationObject) => void;
  paginationMetadata: paginationTicketMatadataObject;
};

const Pagination = ({
  pagination,
  onPagination,
  paginationMetadata,
}: PaginationProps) => {
  const count = paginationMetadata.count;
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset + (pagination.size - 1);
  const fixedEndOffset = Math.min(endOffset, count);

  const label = `${startOffset}-${fixedEndOffset} of ${count}`;

  useEffect(() => {
    if (pagination.page < 0) {
      onPagination({ ...pagination, page: 0 });
    }
  }, [pagination, onPagination]);

  const handleNext = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };
  const hanldePrev = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const nextPage = (
    <Button
      variant="outline"
      onClick={handleNext}
      disabled={!paginationMetadata.hasNextPage}
    >
      Next
    </Button>
  );
  const previous = (
    <Button
      variant="outline"
      disabled={pagination.page < 1}
      onClick={hanldePrev}
    >
      Prev
    </Button>
  );

  return (
    <div className="flex justify-between items-center">
      {label}
      <div className="flex gap-2">
        {previous}
        {nextPage}
      </div>
    </div>
  );
};
export { Pagination };
