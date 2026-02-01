import { prisma } from "@/lib/prisma";

import { ParsedSearchParams } from "../SearchParams";

export const GetTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
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
      }],
    },
    orderBy: {
      [SearchParams.sortKey]: SearchParams.sortValue
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