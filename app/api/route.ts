
import { GetTickets } from "@/features/ticket/queries/GetTickets";

export async function GET() {
    const { list, metadata } = await GetTickets(undefined, Promise.resolve({
        search: '',
        sortKey: 'createdAt',
        sortValue: 'desc',
        page: 0,
        size: 5
    }))

    return Response.json({ list, metadata })
}