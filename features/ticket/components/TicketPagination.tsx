"use client";
import { useQueryStates } from "nuqs";

import {
  Pagination,
  paginationTicketMatadataObject,
} from "@/components/Pagination";

import { paginationOptions, paginationParser } from "../SearchParams";

type TicketPaginationProps = {
  paginationTicketMatadata: paginationTicketMatadataObject;
};

const TicketPagination = ({
  paginationTicketMatadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginationTicketMatadata}
    />
  );
};

export { TicketPagination };
