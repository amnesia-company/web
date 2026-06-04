import type {RootState} from "app/store";

/** Selects the current underline position; `null` when no nav link is active. */
export const selectNavUnderline = (state: RootState) => state.navUnderline.position;

/** Selects whether the underline appear animation has already completed. */
export const selectNavUnderlineHasAppeared = (state: RootState) => state.navUnderline.hasAppeared;
