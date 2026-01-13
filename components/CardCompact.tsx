import { TicketCreateForm } from "@/components/TicketCreateForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardCompactProps = {
  className?: string;
  title: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
};

const CardCompact = ({
  className,
  title,
  description,
  footer,
}: CardCompactProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TicketCreateForm />
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CardCompact;
