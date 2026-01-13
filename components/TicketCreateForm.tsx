import { createTicket } from "@/features/ticket/actions/createTicket";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const TicketCreateForm = () => {

  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text"  />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />

      <Button type="submit">Create</Button>
    </form>
  );
};
export { TicketCreateForm };
