import { hash } from "@node-rs/argon2";

import { prisma } from "@/lib/prisma";


const users = [
    {
        username: 'admin',
        email: 'admin@admin.com',
    },
    {
        username: 'Taha',
        email: 'taha2020tahataha@gmail.com'
    }
]

const tickets = [
    {
        title: 'Ticket 1',
        content: 'this is the first ticket from database',
        status: 'DONE' as const,
        deadline: '2026-01-01',
        bounty: 1
    },
    {
        title: 'Ticket 2',
        content: 'this is the second ticket from database',
        status: 'OPEN' as const,
        deadline: '2026-01-01',
        bounty: 1
    }, {
        title: 'Ticket 3',
        content: 'this is the third ticket from database',
        status: 'IN_PROGRESS' as const,
        deadline: '2026-01-01',
        bounty: 1
    }
]
const seed = async () => {
    const t0 = performance.now();
    console.log("DB Seed: Started...")

    await prisma.user.deleteMany();

    const passwordHash = await hash('123456')

    const dbUsers = await prisma.user.createManyAndReturn({
        data: users.map((user) => ({
            ...user,
            passwordHash,
        })),
    });

    await prisma.ticket.createMany({
        data: tickets.map((ticket)=>({
            ...ticket,
            userId : dbUsers[0].id
        }))
    })
    const t1 = performance.now();
    console.log(`DB Seed: Finished (${(t1 - t0).toFixed()}ms)`)
}

seed()