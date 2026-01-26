'use server'

import { verify } from "@node-rs/argon2"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState"
import { lucia } from "@/lib/lucia"
import { ticketsPath } from "@/lib/paths"
import { prisma } from "@/lib/prisma"

import { getAuth } from "./getAuth"


const signInShema = z.object({
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(1).max(191),
})


export const signIn = async (_actionState: ActionState, formData: FormData) => {
    const {session} = await getAuth();
    if(session){redirect(ticketsPath())}

    try {
        const { email, password } = signInShema.parse(
            Object.fromEntries(formData)
        )

        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) return toActionState('ERROR', 'Incorrect email or password', formData);

        const validPassword = await verify(user.passwordHash, password)
        if (!validPassword) return toActionState('ERROR', 'Incorrect email or password', formData)

        const session = await lucia.createSession(user.id, {});
        
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    redirect(ticketsPath())
}