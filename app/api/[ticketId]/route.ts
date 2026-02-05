import { GetTicket } from "@/features/ticket/queries/GetTicket";

type paramsProps = {
    params: Promise<{
        ticketId: string
    }>
}

export async function GET(
    _request: Request,
    { params }: paramsProps,
) {
    const { ticketId } = await params;
    const ticket = await GetTicket(ticketId)

    return Response.json({ ticket })
}