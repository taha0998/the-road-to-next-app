"use server";
import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect"
import { isOwner } from "@/features/auth/utils/isOwner";
import { ticketPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma"

export const deleteComment = async (id: string) => {
    const { user } = await getAuthOrRedirect();
    const comment = await prisma.comment.findUnique({
        where: { id },
    });

    if (!comment || !isOwner(user, comment)) {
        return toActionState('ERROR', 'Not authorized')
    }

    try {
        await prisma.comment.delete({
            where: {
                id,
            }
        })
    } catch (error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(ticketPath(comment.ticketId))
    return toActionState('SUCCESS', "Comment Deleted")
}