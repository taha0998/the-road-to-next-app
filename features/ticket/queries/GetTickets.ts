import { prisma } from "@/lib/prisma";

import { SearchParams } from "../SearchParams";

export const GetTickets = async (userId: string | undefined, searchParams: SearchParams) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(searchParams.search) ? {
        OR: [{
          title: {
            contains: searchParams.search,
            mode: 'insensitive'
          }
        }, {
          content: {
            contains: searchParams.search,
            mode: 'insensitive'
          }
        }]
      } : {}
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
  })
}