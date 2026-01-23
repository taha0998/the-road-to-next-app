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
  content: React.ReactElement;
};

const CardCompact = ({
  className,
  title,
  description,
  footer,
  content,
}: CardCompactProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CardCompact;
