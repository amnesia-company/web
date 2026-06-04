import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { BurgerMenuItem } from "./burgerMenuItem";
import { usePageContext } from "vike-react/usePageContext";

vi.mock("vike-react/usePageContext", () => ({
    usePageContext: vi.fn(),
}));

describe("BurgerMenuItem — mobile menu item with active state detection based on URL", () => {
    it("renders a link with the correct href and text", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/" } as any);
        renderWithProviders(<BurgerMenuItem href="/news" text="News" />);
        const link = screen.getByRole("link", { name: "News" });
        expect(link).toHaveAttribute("href", "/news");
    });

    it("sets aria-current=page when the first URL segment matches the href", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/news/123" } as any);
        renderWithProviders(<BurgerMenuItem href="/news" text="News" />);
        expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
    });

    it("does not set aria-current when the URL does not match", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/about" } as any);
        renderWithProviders(<BurgerMenuItem href="/news" text="News" />);
        expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    });
});
