import { burgerClickHandler } from "./burgerClickHandler";

describe("burgerClickHandler — toggles the burger menu open/closed state", () => {
    it("calls the setter with a function that toggles false to true", () => {
        const setter = vi.fn();
        burgerClickHandler(setter);
        const updater = setter.mock.calls[0][0];
        expect(updater(false)).toBe(true);
    });

    it("calls the setter with a function that toggles true to false", () => {
        const setter = vi.fn();
        burgerClickHandler(setter);
        const updater = setter.mock.calls[0][0];
        expect(updater(true)).toBe(false);
    });
});
