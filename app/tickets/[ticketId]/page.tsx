import Link from "next/link";

import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { initialTickets } from "@/lib/data";
import { ticketsPath } from "@/lib/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const Ticket = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);
  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="w-full flex justify-center animate-fade-in-top">
      <TicketItem ticket={ticket} details />
    </div>
  );
};
export default Ticket;
