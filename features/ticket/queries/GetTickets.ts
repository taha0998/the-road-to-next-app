import { prisma } from "@/lib/prisma";

export const GetTickets = async () => {
  return await prisma.ticket.findMany(
    {
      orderBy: {
        createdAt: 'desc'
      }
    }
  )
}
