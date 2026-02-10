import { redirect } from "next/navigation";
import { signInPath } from "@/lib/paths";
import { getAuth } from "../actions/getAuth"

export const getAuthOrRedirect = async () => {
    const auth = await getAuth();
    if (!auth.user) {
        redirect(signInPath())
    }
    return auth;
}