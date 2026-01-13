import { Suspense } from "react";

import CardCompact from "@/components/CardCompact";
import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";
import { TicketList } from "@/features/ticket/components/TicketList";

const Tickets = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        className="w-full max-w-105 self-center"
        title="Create Ticket"
        description="A new ticket will be created"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};
export default Tickets;
