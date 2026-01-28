import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { closeClassName } from "../constants";
import { NavItem } from "../types";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
};

const SidebarItem = ({ isOpen, navItem }: SidebarItemProps) => {
  const path = usePathname();
  const isActive = navItem.href === path;

  return (
    <Link
      href={navItem.href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative flex h-12 justify-start",
        isActive && "bg-muted font-bold hover:bg-muted",
      )}
    >
      {cloneElement(navItem.icon, {
        className: "h-5 w-5",
      })}
      <span
        className={cn(
          "absolute left-12 text-base duration-200",
          isOpen ? "md:block hidden" : "w-19.5",
          !isOpen && closeClassName,
        )}
      >
        {navItem.title}
      </span>
    </Link>
  );
};

export { SidebarItem };
