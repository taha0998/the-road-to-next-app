import { Prisma } from "@prisma/client";

export type CommentWithMetada = Prisma.CommentGetPayload<{
    include: {
        user: {
            select: {
                username: true;
            }
        },
    },
}> & { isOwner: boolean };