import c from "./primaryButton.module.scss";
import type {ComponentPropsWithoutRef, ReactNode} from "react";

/**
 * Polymorphic button: renders `<a>` when `isLink={true}`,
 * `<button>` when `isLink={false}`. All native attributes of the
 * chosen element are forwarded via `...props`.
 */
type PrimaryButtonProps = {
    /** Extra CSS class merged on top of the base button style. */
    className?: string;
    children: ReactNode;
} & (
    | ({ isLink: true } & ComponentPropsWithoutRef<"a">)
    | ({ isLink?: false } & ComponentPropsWithoutRef<"button">)
);

export const PrimaryButton = ({
    children,
    className = "",
    isLink = false,
    ...props
}: PrimaryButtonProps) => {
    return (
        <>
            {isLink ?
                <a className={`${c.button} ${className}`} {...(props as ComponentPropsWithoutRef<"a">)}>
                    {children}
                </a>
            :
                <button className={`${c.button} ${className}`} {...(props as ComponentPropsWithoutRef<"button">)}>
                    {children}
                </button>
            }
        </>
    );
}
