import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { GetTicket } from "@/features/ticket/queries/GetTicket";
import { homePath } from "@/lib/paths";

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
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="w-full flex justify-center animate-fade-in-top">
        <TicketItem ticket={ticket} details />
      </div>
    </div>
  );
};
export default Ticket;
