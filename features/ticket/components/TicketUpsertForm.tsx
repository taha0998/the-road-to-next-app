"use client";
import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/fromErrorToActionState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { upsertTicket } from "../actions/upsertTicket";

type TicketUpsertProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

     <div className="flex gap-x-2 mb-1">
      <div className="w-1/2 flex flex-col gap-y-1">
       <Label htmlFor="deadline">Deadline</Label>
      <Input
        id="deadline"
        name="deadline"
        type="date"
        defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
          />
      <FieldError actionState={actionState} name="deadline" />
      </div>
      <div className="w-1/2 flex flex-col gap-y-1">
      <Label htmlFor="bounty" >Bounty ($)</Label>
      <Input 
      id="bounty"
      name="bounty"
      type="number"
      step=".01"
      defaultValue={
       (actionState.payload?.get('bounty') as string) ?? ticket?.bounty 
      }
      />
      </div>
     </div>

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
