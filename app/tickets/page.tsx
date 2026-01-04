import Link from "next/link";

import { initialTickets } from "@/lib/data";
import { ticketPath } from "@/lib/paths";

const Tickets = () => {
  return (
    <div>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <h2 className="text-lg">{ticket.title}</h2>
          <Link href={ticketPath(ticket.id)} className="text-sm underline">
            view
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Tickets;
