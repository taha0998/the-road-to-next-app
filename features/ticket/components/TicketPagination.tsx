"use client";
import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/Pagination";
import { PaginationData } from "@/types/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
  sortOptions,
  sortParser,
} from "../SearchParams";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  paginationMetadata: PaginationData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({ paginationMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  const [search] = useQueryState("search", searchParser);
  const [sortKey] = useQueryStates(sortParser, sortOptions);

  const prevSearch = useRef(search);
  const prevSort = useRef(sortKey);

  useEffect(() => {
    if (prevSearch.current === search) return;
    prevSearch.current = search;
    setPagination({ ...pagination, page: 0 });
  }, [pagination, setPagination, prevSearch, search]);

  useEffect(() => {
    if (prevSort.current === sortKey) return;
    prevSort.current = sortKey;
    setPagination({ ...pagination, page: 0 });
  }, [pagination, setPagination, prevSort, sortKey]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginationMetadata}
    />
  );
};
export { TicketPagination };
