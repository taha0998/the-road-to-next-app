"use client";
import Link from "next/link";

import { initialTickets } from "@/lib/data";
import { ticketPath } from "@/lib/paths";

const TICKET_ICONS = {
  OPEN: "O",
  DONE: "X",
  IN_PROGRESS: ">",
};

const Tickets = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">HomePage</h2>
        <p className="text-sm text-muted-foreground">
          Your home place to start
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="
          w-full max-w-105 p-4 border border-slate-100 rounded
          "
          >
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
            <p className="text-sm text-slate-500 truncate">
              {ticket.content +
                ticket.content +
                ticket.content +
                ticket.content +
                ticket.content}
            </p>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              view
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tickets;
