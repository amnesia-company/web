import c from "./headerDesktopNavItem.module.scss";
import {usePageContext} from "vike-react/usePageContext";
import type {ComponentPropsWithoutRef} from "react";
import clsx from "clsx";

interface HeaderDesktopNavItemProps extends ComponentPropsWithoutRef<"a"> {
    /** Visible label text of the navigation link. */
    title: string;
    /** Route path the link navigates to. */
    href: string;
}

/**
 * Desktop navigation bar link.
 *
 * Determines the active state by comparing the first segment of the current
 * URL via `usePageContext`. When matched, applies the `active` CSS class and
 * sets `aria-current="page"`.
 */
export const HeaderDesktopNavItem = ({ title, href, ...props }:  HeaderDesktopNavItemProps) => {
    const { urlPathname } = usePageContext();
    const isActive = urlPathname.split("/")[1] === href.split("/")[1];

	return (
        <a
            aria-current={isActive ? "page" : undefined}
            href={href}
            className={clsx(c.link, isActive && c.active)}
            {...props}
        >
            {title}
        </a>
	)
}
