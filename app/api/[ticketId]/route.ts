import { GetTicket } from "@/features/ticket/queries/GetTicket";

type ParamsProps = {
    params: Promise<{
        ticketId: string;
    }>
}

export async function GET(_request: Request, { params }: ParamsProps) {
    const { ticketId } = await params;
    const ticket = await GetTicket(ticketId);

    return Response.json({ ticket })
}