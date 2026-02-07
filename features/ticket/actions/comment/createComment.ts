// 'use server';
// import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/toActinoState";
// import { getAuthOrRedirect } from "@/features/auth/queries/getAuthOrRedirect";

// const createComment = async (
//     id: string,
//     ticketId: string,
//     _actionState: ActionState,
//     formData: FormData,
// ) => {
//     const { user } = await getAuthOrRedirect();
//     try {
//         if (!user) {
//             toActionState('ERROR', 'no Auth')
//         }

//     } catch (error) {
//         fromErrorToActionState(error, formData)
//     }

// }

// export { createComment };