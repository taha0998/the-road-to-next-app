import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { homePath, ticketsPath } from "@/lib/paths";

import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <nav
      className="supports-backdrop-blur;bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 justify-between px-4
        "
    >
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg ml-2 font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div>
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export { Header };
