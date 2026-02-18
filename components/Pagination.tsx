import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationData } from "@/types/pagination";
import { Button } from "./ui/button";

type PaginationObject = {
  page: number;
  size: number;
};
type PaginationMetadata = PaginationData<unknown>["metadata"];

type PaginationProps = {
  pagination: PaginationObject;
  onPagination: (pagination: PaginationObject) => void;
  paginationMetadata: PaginationMetadata;
};

const Pagination = ({
  pagination,
  onPagination,
  paginationMetadata,
}: PaginationProps) => {
  const count = paginationMetadata.count;
  const hasNext = paginationMetadata.hasNextPage;
  const firstItem = pagination.page * pagination.size + 1;
  const lastItem = firstItem + (pagination.size - 1);
  const fixedLastItem = Math.min(lastItem, count);

  const label = `${firstItem}-${fixedLastItem} of ${count}`;

  const handleNext = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };
  const handlePrev = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  useEffect(() => {
    if (pagination.page < 0) {
      onPagination({ ...pagination, page: 0 });
    }
    if (firstItem > count) {
      const fixMaxPages = Math.floor(count / pagination.size);
      onPagination({ ...pagination, page: fixMaxPages });
    }
  }, [pagination, onPagination, count, firstItem]);

  const nextButton = (
    <Button variant="outline" disabled={!hasNext} onClick={handleNext}>
      Next
    </Button>
  );
  const prevButton = (
    <Button
      variant="outline"
      disabled={pagination.page < 1}
      onClick={handlePrev}
    >
      Prev
    </Button>
  );

  const handleChangeSize = (value: string) => {
    onPagination({ page: 0, size: parseInt(value) });
  };

  const selectSize = (
    <Select
      defaultValue={pagination.size.toString()}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex justify-between items-center">
      {label}
      <div className="flex justify-center items-center gap-2">
        {selectSize}
        {prevButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };
