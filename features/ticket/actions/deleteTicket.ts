'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma"

export const deleteTicket = async (id: string) => {
    await prisma.ticket.delete({
        where: {
            id,
        }
    });

    revalidatePath(ticketsPath())
    await setCookieByKey('toast', 'Ticket deleted')
    redirect(ticketsPath())
}