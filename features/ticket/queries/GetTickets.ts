import { prisma } from "@/lib/prisma";

import { PastedSearchParams } from "../SearchParams";

export const GetTickets = async (userId: string | undefined, searchParams: PastedSearchParams) => {
  const SearchParams = await searchParams;
  return await prisma.ticket.findMany({
    where: {
      userId,
      OR: [{
        title: {
          contains: SearchParams.search,
          mode: 'insensitive'
        }
      }, {
        content: {
          contains: SearchParams.search,
          mode: 'insensitive'
        }
      }]
    },
    orderBy: {
      ...(SearchParams.sort === 'newwest') && { createdAt: 'desc' },
      ...(SearchParams.sort === 'bounty') && { bounty: 'desc' },
      ...(SearchParams.sort === 'deadline') && { deadline: 'desc' },
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