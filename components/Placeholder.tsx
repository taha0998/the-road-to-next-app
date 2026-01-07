import { LucideMessageSquareWarning } from "lucide-react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning className="w-full h-full" />,
  button = <div className="h-10" />,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-col flex-1 self-center items-center justify-center gap-y-2">
      <div className="w-16 h-16">{icon}</div>
      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  );
};
export { Placeholder };
