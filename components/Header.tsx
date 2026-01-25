"use client";
import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";

import { signOut } from "@/features/auth/actions/signOut";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/lib/paths";

import { SubmitButton } from "./form/SubmitButton";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>

      <form action={signOut} className="flex items-center gap-2">
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
      animate-header-from-top
      supports-backdrop-blur;bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 justify-between px-4 items-center
        "
    >
      <div className="flex items-center gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg ml-2 font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex gap-x-2 items-center">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
