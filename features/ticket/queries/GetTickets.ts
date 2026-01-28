import { prisma } from "@/lib/prisma";

export const GetTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany(
    {
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    }
  )
}
