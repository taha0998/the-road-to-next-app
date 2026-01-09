import { initialTickets } from "@/lib/data";

import { Ticket } from "../types";

export const GetTicket = async (ticketId: string): Promise<Ticket | null> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const maybeTicket = initialTickets.find(ticket => ticketId === ticket.id)

    return new Promise((resolve) => {
        resolve(maybeTicket || null)
    })
} 