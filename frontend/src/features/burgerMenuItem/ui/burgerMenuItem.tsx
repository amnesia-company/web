import c from "./burgerMenuItem.module.scss";
import type {ComponentPropsWithoutRef} from "react";
import {usePageContext} from "vike-react/usePageContext";
import clsx from "clsx";

interface BurgerMenuItemProps extends ComponentPropsWithoutRef<"a"> {
    /** Route path the link navigates to. */
    href: string;
    /** Visible label text of the menu item. */
    text: string;
}

/**
 * Mobile navigation menu item.
 *
 * Determines the active state by comparing the first segment of the current
 * URL via `usePageContext`. When matched, applies the `active` CSS class and
 * sets `aria-current="page"`.
 */
export const BurgerMenuItem = ({ text, href, ...props }: BurgerMenuItemProps) => {
    const { urlPathname } = usePageContext();
    const isActive = urlPathname.split("/")[1] === href.split("/")[1];

	return (
		<a
            href={href}
            className={clsx(c.button, isActive && c.active)}
            aria-current={isActive ? "page" : undefined}
            {...props}
        >
            {text}
		</a>
	)
}
