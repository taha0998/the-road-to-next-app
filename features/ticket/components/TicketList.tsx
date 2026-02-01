import { Placeholder } from "@/components/Placeholder";
import { SearchInput } from "@/components/SearchInput";
import { SortSelect } from "@/components/SortSelect";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { GetTickets } from "@/features/ticket/queries/GetTickets";

import { ParsedSearchParams } from "../SearchParams";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await GetTickets(userId, searchParams);
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-top">
      <div className="w-full max-w-105 flex gap-x-2">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
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
    </div>
  );
};
export { TicketList };
