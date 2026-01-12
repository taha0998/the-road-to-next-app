import { prisma } from "@/lib/prisma";

export const GetTicket = async (id: string) => {
    return await prisma.ticket.findUnique({
        where: {
            id,
        }
    })
}