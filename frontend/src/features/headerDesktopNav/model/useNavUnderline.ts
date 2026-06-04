import {startTransition, useEffect, useRef, useState} from "react";
import {usePageContext} from "vike-react/usePageContext";
import {useDispatch, useSelector} from "react-redux";
import {selectNavUnderline, selectNavUnderlineHasAppeared} from "./selectors";
import {setNavUnderlinePosition, setNavUnderlineAppeared} from "./navUnderlineSlice";
import type {NavUnderlinePosition} from "./navUnderlineSlice";

/**
 * Manages the animated underline indicator beneath the active desktop nav link.
 *
 * Measures the active `[aria-current="page"]` element on URL change and stores
 * its position in Redux so it persists across client-side navigations.
 * Controls two CSS animation states: appearing (first render) and hiding
 * (when no active link exists). The underline element is removed from the DOM
 * via `onAnimationEnd` only after the hide animation completes.
 *
 * @returns Object with:
 * - `navRef` — ref to attach to the `<nav>` element for offset calculation
 * - `displayPosition` — `{ left, width }` for inline styles; `null` when hidden
 * - `isHiding` — `true` while the hide animation is running
 * - `hasAppeared` — `true` after the appear animation completes; suppresses re-animation on re-renders
 * - `onAnimationEnd` — CSS animationend handler; clears position or marks as appeared
 */
export const useNavUnderline = () => {
    const {urlPathname} = usePageContext();
    const dispatch = useDispatch();
    const navRef = useRef<HTMLElement>(null);
    const position = useSelector(selectNavUnderline);
    const hasAppeared = useSelector(selectNavUnderlineHasAppeared);
    const [displayPosition, setDisplayPosition] = useState<NavUnderlinePosition | null>(position);
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;
        const active = nav.querySelector<HTMLElement>("[aria-current=\"page\"]");
        if (!active) {
            dispatch(setNavUnderlinePosition(null));
            return;
        }
        const {left: navLeft} = nav.getBoundingClientRect();
        const {left, width} = active.getBoundingClientRect();
        dispatch(setNavUnderlinePosition({left: left - navLeft, width}));
    }, [urlPathname, dispatch]);

    useEffect(() => {
        startTransition(() => {
            if (position) {
                setDisplayPosition(position);
                setIsHiding(false);
            } else {
                setIsHiding(true);
            }
        });
    }, [position]);

    const onAnimationEnd = () => {
        if (isHiding) {
            setDisplayPosition(null);
        } else {
            dispatch(setNavUnderlineAppeared());
        }
    };

    return {navRef, displayPosition, isHiding, hasAppeared, onAnimationEnd};
};
