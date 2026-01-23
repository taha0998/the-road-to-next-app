'use server'

import z from "zod"

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";

const signUpShema = z.object({
    username: z.string().min(1).max(191)
        .refine((value) => !value.includes(' '), 'Username cannot contain spaces'),
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(1).max(191)
})
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password do not match',
                path: ['confirmPassword']
            })
        }
    });


export const signUp = async (_actionStae: ActionState, formData: FormData) => {
    try {
        const { username, email, password } = signUpShema.parse(
            Object.fromEntries(formData)

            //TODO store in database
        );
    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    return toActionState('SUCCESS', 'Sign up successful');
}