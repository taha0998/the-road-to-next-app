import { HTMLAttributes } from "react";

export type NavItem = {
    separator?: boolean;
    title: string;
    icon: React.ReactElement<HTMLAttributes<HTMLElement>>;
    href: string
}