import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/rootReducer";
import { selectNavUnderline, selectNavUnderlineHasAppeared } from "./selectors";
import { setNavUnderlinePosition, setNavUnderlineAppeared } from "./navUnderlineSlice";

describe("selectNavUnderline, selectNavUnderlineHasAppeared — nav underline state selectors", () => {
    it("selectNavUnderline returns the current position from state", () => {
        const store = configureStore({ reducer: rootReducer });
        store.dispatch(setNavUnderlinePosition({ left: 50, width: 120 }));
        expect(selectNavUnderline(store.getState())).toEqual({ left: 50, width: 120 });
    });

    it("selectNavUnderlineHasAppeared returns the hasAppeared flag from state", () => {
        const store = configureStore({ reducer: rootReducer });
        expect(selectNavUnderlineHasAppeared(store.getState())).toBe(false);
        store.dispatch(setNavUnderlineAppeared());
        expect(selectNavUnderlineHasAppeared(store.getState())).toBe(true);
    });
});
