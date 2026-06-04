import { appConfigSlice, setAppConfig, setLanguage } from "./appConfigSlice";

const reducer = appConfigSlice.reducer;
const initialState = { onlineCount: 0, language: "" };

describe("appConfigSlice — stores application-level configuration", () => {
    it("returns the initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("setAppConfig updates onlineCount", () => {
        const state = reducer(initialState, setAppConfig({ onlineCount: 42 }));
        expect(state.onlineCount).toBe(42);
    });

    it("setAppConfig with an empty object does not change the state", () => {
        const state = reducer({ onlineCount: 10, language: "" }, setAppConfig({}));
        expect(state.onlineCount).toBe(10);
    });

    it("setLanguage updates the language field", () => {
        const state = reducer(initialState, setLanguage("ru"));
        expect(state.language).toBe("ru");
    });

    it("setLanguage overwrites a previously set language", () => {
        const state = reducer({ onlineCount: 0, language: "ru" }, setLanguage("en"));
        expect(state.language).toBe("en");
    });
});
