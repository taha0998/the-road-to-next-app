import { HTMLAttributes } from "react";

export type NavItem = {
    title: string;
    icon: React.ReactElement<HTMLAttributes<HTMLElement>>;
    href: string
}