import c from "./hero.module.scss";
import {useTranslation} from "react-i18next";
import type {ComponentPropsWithoutRef} from "react";
import {CopyButton} from "features/copyButton";
import {useSelector} from "react-redux";
import {selectOnlineCount} from "entities/appConfig";
import {useHandleCopy} from "../model/useHandleCopy";

/** Hero section of the main page: page title, server address with copy button, and online player count. */
export const Hero = ({ ...props }: ComponentPropsWithoutRef<"div">) => {
    const { t } = useTranslation();

    const address = import.meta.env.VITE_SERVER_ADDRESS;

    const onlineCount = useSelector(selectOnlineCount);
    const {handleCopy, hintVisible, hintKey} = useHandleCopy(address);

	return (
        <div className={c.hero} {...props}>
            <div className="container">
                <h1 className={c.title}>
                    <span className={c.top}>{t("index.title_top").toUpperCase()}</span>{" "}
                    <span className={c.bottom}>
                        {t("index.title_bottom").toUpperCase()}{" "}
                        <span className={c.title}>{t("index.title_name").toUpperCase()}</span>
                    </span>
                </h1>
                <div className={c.info}>
                    <div onClick={handleCopy} aria-label={t("ariaLabel.copy")} role="button" className={c.server_link}>
                        <span className={c.server_link_text}>{address}</span>
                        <CopyButton className={c.copy} text={address} />
                        {hintVisible && <span key={hintKey} className={c.hint}>{t("copied")}</span>}
                    </div>
                    <p className={c.online}>{onlineCount}</p>
                </div>
            </div>
        </div>
	)
}
