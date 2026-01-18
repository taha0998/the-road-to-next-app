import { prisma } from "@/lib/prisma";


const tickets = [
    {
        title: 'Ticket 1',
        content: 'this is the first ticket from database',
        status: 'DONE' as const,
        deadline: '2026-01-01',
        bounty : 1
    },
    {
        title: 'Ticket 2',
        content: 'this is the second ticket from database',
        status: 'OPEN' as const,
        deadline: '2026-01-01',
        bounty : 1
    }, {
        title: 'Ticket 3',
        content: 'this is the third ticket from database',
        status: 'IN_PROGRESS' as const,
        deadline: '2026-01-01',
        bounty : 1
    }
]
const seed = async () => {
    const t0 = performance.now();
    console.log("DB Seed: Started...")
    await prisma.ticket.deleteMany();

    await prisma.ticket.createMany({
        data: tickets,
    })
    const t1 = performance.now();
    console.log(`DB Seed: Finished (${(t1 - t0).toFixed()}ms)`)
}

seed()