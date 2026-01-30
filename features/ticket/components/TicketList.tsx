import { Placeholder } from "@/components/Placeholder";
import { SearchInput } from "@/components/SearchInput";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { GetTickets } from "@/features/ticket/queries/GetTickets";

import { SearchParams } from "../SearchParams";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await GetTickets(userId, searchParams);
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-top">
      <SearchInput placeholder="Search tickets..." />
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No ticket found" />
      )}
    </div>
  );
};
export { TicketList };
