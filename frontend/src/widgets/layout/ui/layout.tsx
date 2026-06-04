import c from "./layout.module.scss";
import {Header} from "widgets/header";
import type {ReactNode} from "react";
import type {UserType} from "entities/user";

interface LayoutProps {
    /** Authenticated user profile. */
    principalUserInfo: UserType;
    /** Content rendered inside the hero section (unique per page). */
    heroContent?: ReactNode;
    /** Content rendered below the hero section. */
    children?: ReactNode;
    /** Controls header visibility. Defaults to `true`. */
    isShowHeader?: boolean;
}

/**
 * Root page layout.
 *
 * Wraps page content in a `Header` and a `<main>` element. The first
 * child of `<main>` is a hero section with a shared background image;
 * the rest of the page content follows as `children`.
 */
export const Layout = ({
    isShowHeader = true,
    principalUserInfo,
    heroContent,
    children
}: LayoutProps) => {
	return (
		<>
            {isShowHeader && <Header principalUserInfo={principalUserInfo} />}
            <main className={c.main}>
                <section className={c.hero}>
                    {heroContent}
                </section>
                {children}
            </main>
		</>
	)
}
