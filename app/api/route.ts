import { GetTickets } from "@/features/ticket/queries/getTickets";
import { searchParamsCache } from "@/features/ticket/SearchParams";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const untypedSearchParams = Object.fromEntries(searchParams);
    const typedSearchParams = searchParamsCache.parse(untypedSearchParams)

    const { list, metadata } = await GetTickets(undefined, Promise.resolve(typedSearchParams))

    return Response.json({ list, metadata })
}