import { renderHook, act } from "@testing-library/react";
import { useHandleCopy } from "./useHandleCopy";

describe("useHandleCopy — combines clipboard copy with hint visibility", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        Object.defineProperty(navigator, "clipboard", {
            value: { writeText: vi.fn().mockResolvedValue(undefined) },
            configurable: true,
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("hint is hidden initially", () => {
        const { result } = renderHook(() => useHandleCopy("amnesia.ru"));
        expect(result.current.hintVisible).toBe(false);
    });

    it("handleCopy writes the text to the clipboard", async () => {
        const { result } = renderHook(() => useHandleCopy("amnesia.ru"));
        await act(() => result.current.handleCopy());
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("amnesia.ru");
    });

    it("hint becomes visible after handleCopy resolves", async () => {
        const { result } = renderHook(() => useHandleCopy("amnesia.ru"));
        await act(() => result.current.handleCopy());
        expect(result.current.hintVisible).toBe(true);
    });
});
