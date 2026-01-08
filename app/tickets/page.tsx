
import { Heading } from "@/components/Heading";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { initialTickets } from "@/lib/data";

const Tickets = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
export default Tickets;
