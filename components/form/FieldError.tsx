import { ActionState } from "./utils/toActinoStatus";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldError[name]?.[0];
  return <span className="text-xs text-red-500">{message}</span>;
};

export { FieldError };
