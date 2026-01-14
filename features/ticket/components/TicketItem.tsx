import { Ticket } from "@prisma/client";
import clsx from "clsx";
import {
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { editTicketPath, ticketPath } from "@/lib/paths";

import { deleteTicket } from "../actions/deleteTicket";
import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
  details?: boolean;
};

const TicketItem = ({ ticket, details }: TicketItemProps) => {
  const detailButton = (
    <Button asChild size={"icon"} variant={"outline"}>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button size={"icon"} variant={"outline"} className="cursor-pointer">
        <LucideTrash className="w-4 h-4" />
      </Button>
    </form>
  );

  const updateButton = (
    <Button asChild size={"icon"} variant={"outline"}>
      <Link prefetch href={editTicketPath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx("w-full  flex gap-x-1", {
        "max-w-105": !details,
        "max-w-145": details,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center gap-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate text-2xl">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-2": !details,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1 ">
        {!details ? (
          <>
            {detailButton}
            {updateButton}
          </>
        ) : (
          <>
            {updateButton}
            {deleteButton}
          </>
        )}
      </div>
    </div>
  );
};
export { TicketItem };
