import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { Comments } from "@/features/comments/components/Comments";
import { editTicketPath, ticketPath } from "@/lib/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./TicketMoreMenu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  details?: boolean;
};

const TicketItem = async ({ ticket, details }: TicketItemProps) => {
  const { user } = await getAuthOrRedirect();
  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button asChild size={"icon"} variant={"outline"}>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const updateButton = isTicketOwner ? (
    <Button asChild size={"icon"} variant={"outline"}>
      <Link prefetch href={editTicketPath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-105": !details,
        "max-w-145": details,
      })}
    >
      <div className="w-full flex gap-x-2">
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
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground ">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
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
              {moreMenu}
            </>
          )}
        </div>
      </div>
      {details && <Comments ticketId={ticket.id} />}
    </div>
  );
};
export { TicketItem };
