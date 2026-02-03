import { Placeholder } from "@/components/Placeholder";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { GetTickets } from "@/features/ticket/queries/GetTickets";

import { ParsedSearchParams } from "../SearchParams";
import { TicketPagination } from "./TicketPagination";
import { TicketSearchInput } from "./TicketSearchInput";
import { TicketSortSelect } from "./TicketSortSelect";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await GetTickets(
    userId,
    searchParams,
  );
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-top">
      <div className="w-full max-w-105 flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
            { label: "Oldest", sortKey: "createdAt", sortValue: "asc" },
            { label: "Bounty", sortKey: "bounty", sortValue: "desc" },
            { label: "Deadline", sortKey: "deadline", sortValue: "desc" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No ticket found" />
      )}
      <div className="w-full max-w-105 mt-4">
        <TicketPagination paginationTicketMatadata={ticketMetadata} />
      </div>
    </div>
  );
};
export { TicketList };
