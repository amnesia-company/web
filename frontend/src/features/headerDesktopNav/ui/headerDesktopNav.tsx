import c from "./headerDesktopNav.module.scss";
import {navConfig} from "shared/config/navConfig";
import type {ComponentPropsWithoutRef} from "react";
import {HeaderDesktopNavItem} from "features/headerDesktopNavItem";
import {useTranslation} from "react-i18next";
import {useNavUnderline} from "../model/useNavUnderline";
import clsx from "clsx";

/**
 * Desktop navigation bar with an animated sliding underline indicator.
 *
 * Renders nav links from `navConfig` and positions an underline beneath the
 * active link via inline styles. The underline animates in on first appearance
 * and animates out when navigating to a page with no matching nav link.
 */
export const HeaderDesktopNav = ({ ...props }: ComponentPropsWithoutRef<"nav">) => {
    const {t} = useTranslation();
    const {navRef, displayPosition, isHiding, hasAppeared, onAnimationEnd} = useNavUnderline();

    return (
        <nav ref={navRef} className={c.nav} {...props}>
            {navConfig.map(link =>
                <HeaderDesktopNavItem
                    key={`nav link ${link.href}`}
                    aria-label={t(link.ariaLabel)}
                    title={t(link.title)}
                    href={link.href}
                />
            )}
            {displayPosition && (
                <span
                    className={clsx(
                        c.underline,
                        isHiding && c.underline_hiding,
                        !hasAppeared && !isHiding && c.underline_appearing,
                    )}
                    style={{left: displayPosition.left, width: displayPosition.width}}
                    onAnimationEnd={onAnimationEnd}
                />
            )}
        </nav>
    );
}
