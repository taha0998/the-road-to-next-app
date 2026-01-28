"use client";
import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";

import { navItems } from "../constants";
import { SidebarItem } from "./SidebarItem";

const Sidebar = () => {
  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { user, isFetched } = useAuth();

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => {
      setTransition(false);
    }, 200);
  };
  if (!user || !isFetched) {
    return <div className="w-19.5 bg-secondary/20" />;
  }

  return (
    <nav
      className={cn(
        "h-screen border-r pt-24 animate-sidebar-from-left",
        isTransition && "duration-300",
        isOpen ? "md:w-60 w-19.5" : "w-19.5",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => {
            return (
              <SidebarItem
                key={navItem.title}
                isOpen={isOpen}
                navItem={navItem}
              />
            );
          })}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
