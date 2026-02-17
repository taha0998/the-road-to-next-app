"use client";
import {
  cloneElement,
  HTMLAttributes,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useActionFeedback } from "./form/hooks/useActionFeedback";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/toActinoState";
import { Button } from "./ui/button";

type useConfirmDialogProps = {
  title?: string;
  content?: string;
  action: () => Promise<ActionState>;
  trigger:
    | React.ReactElement<HTMLAttributes<HTMLElement>>
    | ((isPending: boolean) => React.ReactElement<HTMLAttributes<HTMLElement>>);
  onSuccess?: (actionState: ActionState) => void;
};

export const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  content = "This action cannot be undone. Make sure you understand the consequences.",
  action,
  trigger,
  onSuccess,
}: useConfirmDialogProps) => {
  const [isOpen, setOpen] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

  const confirmButton = cloneElement(
    typeof trigger === "function" ? trigger(isPending) : trigger,
    {
      onClick: () => setOpen((state) => !state),
    },
  );

  const toastRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading("Deleting ...");
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  const confirmDialog = (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [confirmButton, confirmDialog];
};
