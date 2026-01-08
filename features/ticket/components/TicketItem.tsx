import clsx from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPath } from "@/lib/paths";

import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
  details?: boolean;
};

const TicketItem = ({ ticket, details }: TicketItemProps) => {
  const detailButton = (
    <Button asChild size={"icon"} variant={"outline"}>
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight />
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
      {!details && <div className="flex flex-col gap-y-1 ">{detailButton}</div>}
    </div>
  );
};
export { TicketItem };
