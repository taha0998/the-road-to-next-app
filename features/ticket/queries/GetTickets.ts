import { initialTickets } from "@/lib/data";

import { Ticket } from "../types";

export const GetTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};
