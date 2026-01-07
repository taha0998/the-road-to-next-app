import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import Link from "next/link";

import { Heading } from "@/components/Heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialTickets } from "@/lib/data";
import { ticketPath } from "@/lib/paths";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
};

const Tickets = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-105">
            <CardHeader>
              <CardTitle className="flex gap-x-2 items-center gap-2">
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className="truncate text-2xl">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="line-clamp-2">{ticket.content}</span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(ticket.id)} className="text-sm underline">
                view
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Tickets;
