"use client";
import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination, PaginationMetadata } from "@/components/Pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../SearchParams";

type TicketPaginationProps = {
  paginationMetadata: PaginationMetadata;
};

const TicketPagination = ({ paginationMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  const [search] = useQueryState("search", searchParser);

  const prevSearch = useRef(search);

  useEffect(() => {
    if (prevSearch.current === search) return;
    prevSearch.current = search;
    setPagination({ ...pagination, page: 0 });
  }, [pagination, setPagination, prevSearch, search]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginationMetadata}
    />
  );
};
export { TicketPagination };
