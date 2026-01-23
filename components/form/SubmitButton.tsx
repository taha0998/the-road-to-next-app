'use client'
import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="w-4 h-4 mr-2 animate-spin" />}

      {label}
    </Button>
  );
};

export { SubmitButton };
