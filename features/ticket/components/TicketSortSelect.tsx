"use client";

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOption } from "@/components/SortSelect";
import { sortOptions, sortParser } from "../SearchParams";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);
  return <SortSelect options={options} sort={sort} onChange={setSort} />;
};

export { TicketSortSelect };
