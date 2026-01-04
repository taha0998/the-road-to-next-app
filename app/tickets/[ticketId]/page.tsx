import { initialTickets } from "@/lib/data";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const Ticket = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);
  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
};
export default Ticket;
