import { TicketItem } from "@/features/ticket/components/TicketItem";
import { GetTickets } from "@/features/ticket/queries/GetTickets";

type TicketListProps = {
  userId?: string;
};

const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await GetTickets(userId);
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
export { TicketList };
