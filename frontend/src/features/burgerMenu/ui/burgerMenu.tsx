import c from "./burgerMenu.module.scss";
import {useTranslation} from "react-i18next";
import theme from "shared/icons/icon-theme-mobile.svg";
import support from "shared/icons/icon-support-mobile.svg";
import type {ComponentPropsWithoutRef} from "react";
import {BurgerMenuItem} from "features/burgerMenuItem";
import {navConfig} from "shared/config/navConfig";
import {Socials} from "features/socials";
import clsx from "clsx";

interface BurgerMenuProps extends ComponentPropsWithoutRef<"div"> {
    /** Whether the menu is open; applies the CSS open animation class. */
    isOpenMenu: boolean;
    /** Display name shown as the profile link label. */
    userName: string;
    /** User ID used to build the profile link path `/profile/{userId}`. */
    userId: number;
}

/**
 * Mobile navigation menu.
 *
 * Contains the full nav link list from `navConfig`, a profile link, theme
 * toggle, support link, and social links. Visibility is controlled via a CSS
 * class driven by `isOpenMenu`.
 */
export const BurgerMenu = ({ isOpenMenu, userName, userId, ...props }: BurgerMenuProps) => {
    const { t } = useTranslation();

	return (
        <div className={(clsx(c.wrapper, isOpenMenu && c.open))}>
            <div className={c.top}>
                <div className={c.buttons}>
                    <button
                        type="button"
                        aria-label={t("ariaLabel.changeTheme")}
                        className={`${c.button} ${c.theme_button}`}
                    >
                        <img
                            decoding="async"
                            width="20"
                            height="20"
                            src={theme}
                            alt={t("header.themeAlt")}
                            className={c.icon}
                        />
                    </button>
                    <a
                        aria-label={t("ariaLabel.goToSupport")}
                        href="/support"
                        className={`${c.button} ${c.support_link}`}
                    >
                        <img
                            decoding="async"
                            width="20"
                            height="20"
                            src={support}
                            alt={t("header.supportAlt")}
                            className={c.icon}
                        />
                    </a>
                </div>
                <div className={c.name_wrapper}>
                    <a
                        aria-label={t("ariaLabel.goToMyProfile")}
                        href={`/profile/${userId}`}
                        className={c.name}
                    >
                        {userName}
                    </a>
                </div>
            </div>
            <nav className={c.menu} {...props}>
                {navConfig.map(link =>
                    <BurgerMenuItem
                        aria-label={t(link.ariaLabel)}
                        key={`nav mobile ${link.href}`}
                        text={t(link.title)}
                        href={link.href}
                    />
                )}
            </nav>
            <Socials />
        </div>
	)
}
