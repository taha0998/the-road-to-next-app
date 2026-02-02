import { useEffect } from "react";

import { Button } from "./ui/button";

type PaginationObject = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PaginationObject;
  onPagination: (pagination: PaginationObject) => void;
};

const Pagination = ({ pagination, onPagination }: PaginationProps) => {
  const startedItemNumber = pagination.page * pagination.size + 1;
  const lastItemNumber = startedItemNumber + (pagination.size - 1);
  const label = `${startedItemNumber}-${lastItemNumber} of X`;

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
    <Button variant="outline" onClick={handleNext}>
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
