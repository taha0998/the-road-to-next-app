import { notFound } from "next/navigation";

import CardCompact from "@/components/CardCompact";
import { getAuth } from "@/features/auth/actions/getAuth";
import { isOwner } from "@/features/auth/utils/isOwner";
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
  const { user } = await getAuth();

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
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
