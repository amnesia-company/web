import c from "./socials.module.scss";
import {socialsConfig} from "../config/socialsConfig";
import type {ComponentPropsWithoutRef} from "react";
import {useTranslation} from "react-i18next";

/**
 * Social network links, sourced from `socialsConfig`.
 * Each link is opened with `rel="noopener noreferrer nofollow"`.
 */
export const Socials = ({ ...props }: ComponentPropsWithoutRef<"div">) => {
    const { t } = useTranslation();

	return (
		<div className={c.socials} {...props}>
            {socialsConfig.map(link =>
                <a
                    rel="noopener noreferrer nofollow"
                    aria-label={t(link.ariaLabel)}
                    key={`link ${link.href}`}
                    href={link.href}
                    className={c.link}
                >
                    <img
                        decoding="async"
                        width="25"
                        height="25"
                        src={link.icon}
                        alt={t(link.alt)}
                        className={c.img}
                    />
                </a>
            )}
		</div>
	)
}
