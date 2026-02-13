import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comments/queries/getComments";
import { TicketItem } from "@/features/ticket/components/TicketItem";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/lib/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);
  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { title: "tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="w-full flex justify-center animate-fade-in-top pt-4">
        <TicketItem ticket={ticket} comments={comments} details />
      </div>
    </div>
  );
};
export default TicketPage;
