import { prisma } from "@/lib/prisma";

import { ParsedSearchParams } from "../SearchParams";

export const GetTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  const SearchParams = await searchParams;
  const fixedPage = SearchParams.page < 0 ? 0 : SearchParams.page;
  const where = {
    userId,
    OR: [{
      title: {
        contains: SearchParams.search,
        mode: 'insensitive' as const
      }
    }, {
      content: {
        contains: SearchParams.search,
        mode: 'insensitive' as const
      }
    }],
  };
  const skip = fixedPage * SearchParams.size;
  const take = SearchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      orderBy: {
        [SearchParams.sortKey]: SearchParams.sortValue
      },
      skip,
      take,
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })
    ,
    prisma.ticket.count({
      where,
    })
  ])

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > (skip + take)
    },
  }

}