import { notFound } from "next/navigation";

import CardCompact from "@/components/CardCompact";
import { TicketUpsertForm } from "@/features/ticket/components/TicketUpsertForm";
import { GetTicket } from "@/features/ticket/queries/GetTicket";

type TicketUpdateProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketUpdatePage = async ({ params }: TicketUpdateProps) => {
  const { ticketId } = await params;
  const ticket = await GetTicket(ticketId);

  if (!ticket) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-105  animate-fade-in-top"
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};
export default TicketUpdatePage;
