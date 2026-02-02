"use client";
import { useQueryStates } from "nuqs";

import { Pagination } from "@/components/Pagination";

import { paginationOptions, paginationParser } from "../SearchParams";

const TicketPagination = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  return <Pagination pagination={pagination} onPagination={setPagination} />;
};

export { TicketPagination };
