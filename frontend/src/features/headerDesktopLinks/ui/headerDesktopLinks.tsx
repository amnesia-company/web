import c from "./headerDesktopLinks.module.scss";
import type {ComponentPropsWithoutRef} from "react";
import {useTranslation} from "react-i18next";
import theme from "shared/icons/icon-theme-desktop.svg";
import support from "shared/icons/icon-support-desktop.svg";
import {usePageContext} from "vike-react/usePageContext";

interface HeaderDesktopLinksProps extends ComponentPropsWithoutRef<"div"> {
    /** User ID used to build the profile link path `/profile/{userId}`. */
    userId: number;
    /** URL of the user's avatar image; if empty, the image is not rendered. */
    userAvatarUrl: string;
    /** User display name used as the avatar image alt text. */
    userName: string;
}

/**
 * Right-side block of the desktop header.
 *
 * Contains a theme toggle button, a support page link, and a user avatar
 * linking to the profile page. Active state for links is determined by
 * comparing the first segment of the current URL.
 */
export const HeaderDesktopLinks = ({ userId, userAvatarUrl, userName, ...props }: HeaderDesktopLinksProps) => {
    const { t } = useTranslation();
    const { urlPathname } = usePageContext();

    const segmentUrl = urlPathname.split("/")[1];
    const isSupportPage = segmentUrl === "support";
    const isProfilePage = segmentUrl === "profile";

	return (
		<div className={c.links} {...props}>
			<div className={c.buttons}>
                <button aria-label={t("ariaLabel.changeTheme")} className={`${c.button} ${c.theme}`}>
                    <img src={theme} alt={t("header.themeAlt")} className={c.img} />
                </button>
                <a
                    aria-current={isSupportPage ? "page" : undefined}
                    aria-label={t("ariaLabel.goToSupport")}
                    href="/support"
                    className={`${c.button} ${c.support}`}
                >
                    <img src={support} alt={t("header.supportAlt")} className={c.img} />
                </a>
            </div>
            <a
                aria-current={isProfilePage ? "page" : undefined}
                aria-label={t("ariaLabel.goToMyProfile")}
                href={`/profile/${userId}`}
                className={c.profile}
            >
                {userAvatarUrl &&
                    <img src={userAvatarUrl} alt={userName} className={c.img} />
                }
            </a>
		</div>
	)
}
