import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

/** Underline position relative to the left edge of the `<nav>` element, in pixels. */
export interface NavUnderlinePosition {
    /** Distance in pixels from the left edge of the `<nav>` to the active link. */
    left: number;
    /** Width in pixels of the active link element. */
    width: number;
}

/** Redux state for the desktop nav underline indicator. */
interface NavUnderlineState {
    /** Current underline position; `null` when no nav link is active. */
    position: NavUnderlinePosition | null;
    /** `true` after the appear animation completes. Reset to `false` when position
     *  is cleared so the next appearance triggers the animation again. */
    hasAppeared: boolean;
}

const initialState: NavUnderlineState = {
    position: null,
    hasAppeared: false,
};

/** Redux slice that manages the animated underline indicator for the active desktop nav link. */
export const navUnderlineSlice = createSlice({
    name: "navUnderline",
    initialState,
    reducers: {
        /** Sets the underline position. Passing `null` hides the underline and resets `hasAppeared`. */
        setNavUnderlinePosition: (state, action: PayloadAction<NavUnderlinePosition | null>) => {
            state.position = action.payload;
            if (!action.payload) state.hasAppeared = false;
        },
        /** Marks the appear animation as completed so it does not replay on re-renders. */
        setNavUnderlineAppeared: (state) => {
            state.hasAppeared = true;
        },
    },
});

export const {setNavUnderlinePosition, setNavUnderlineAppeared} = navUnderlineSlice.actions;
export const navUnderlineReducer = navUnderlineSlice.reducer;
