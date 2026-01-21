'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form/utils/toActinoState";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma"

export const deleteTicket = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
        await prisma.ticket.delete({
            where: {
                id,
            }
        });
    } catch (error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(ticketsPath())
    await setCookieByKey('toast', 'Ticket deleted')
    redirect(ticketsPath())
}