import { getTicket } from "@/features/ticket/queries/get-ticket";

type ParamsProps = {
    params: Promise<{
        ticketId: string;
    }>
}

export async function GET(_request: Request, { params }: ParamsProps) {
    const { ticketId } = await params;
    const ticket = await getTicket(ticketId);

    return Response.json({ ticket })
}