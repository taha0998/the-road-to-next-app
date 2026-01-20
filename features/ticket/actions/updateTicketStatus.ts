"use server";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/toActinoStatus";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

export const updaeTicketStatus = async (id: string, status: TicketStatus) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated");
};
