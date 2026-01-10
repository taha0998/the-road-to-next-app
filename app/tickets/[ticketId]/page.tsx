import { notFound } from "next/navigation";

import { TicketItem } from "@/features/ticket/components/TicketItem";
import { GetTicket } from "@/features/ticket/queries/GetTicket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const Ticket = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await GetTicket(ticketId);
  if (!ticket) {
    return notFound();
  }

  return (
    <div className="w-full flex justify-center animate-fade-in-top">
      <TicketItem ticket={ticket} details />
    </div>
  );
};
export default Ticket;
