"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ticketPath, ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

export const upsertTicket = async (
  id: string | undefined,
  formData: FormData
) => {
  const data = {
    title: formData.get("title") as string,
    content: formData.get('content') as string
  };
  await prisma.ticket.upsert({
    where: {
      id: id || '',
    },
    update: data,
    create: data
  });

  revalidatePath(ticketsPath())

  if (id) {
    revalidatePath(ticketPath(id))
    redirect(ticketPath(id))
  }
};
