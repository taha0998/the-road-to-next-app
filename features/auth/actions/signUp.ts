'use server'

import { hash } from '@node-rs/argon2'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from "zod"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
import { lucia } from '@/lib/lucia';
import { homePath } from '@/lib/paths';
import { prisma } from '@/lib/prisma';


const signUpShema = z.object({
    username: z.string().min(1).max(191),
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(1).max(191)
})
    .superRefine(({ password, confirmPassword, username }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password do not match',
                path: ['confirmPassword']
            })
        };
        if (password === username) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password cannot be the same as your username',
                path: ['password']
            })
        };
        if (username.includes(' ')) {
            ctx.addIssue({
                code: 'custom',
                message: 'Username cannot contain spaces',
                path: ['username']
            })
        }
    });


export const signUp = async (_actionStae: ActionState, formData: FormData) => {

    try {
        const { username, email, password } = signUpShema.parse(
            Object.fromEntries(formData)
        );

        const passwordHash = await hash(password)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash
            },
        });

        const session = await lucia.createSession(user.id, {});

        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    redirect(homePath())
    return toActionState('SUCCESS', 'Sign up successful');
}