'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma"

export const deleteTicket = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const { user } = await getAuthOrRedirect();

    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id }
        })
        if (!ticket || !isOwner(user, ticket)) {
            return toActionState('ERROR', 'Not authorized')
        }

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