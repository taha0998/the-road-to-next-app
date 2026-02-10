'use server'
import { revalidatePath } from "next/cache";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";

export const deleteComment = async (id: string, _actionState: ActionState) => {
    const { user } = await getAuthOrRedirect();

    const comment = await prisma.comment.findUnique({
        where: { id },
    })

    if (!comment || !isOwner(user, comment)) {
        return toActionState('ERROR', 'No authorized')
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
    revalidatePath(comment.ticketId)
    return toActionState('SUCCESS', 'Comment Deleted')
}