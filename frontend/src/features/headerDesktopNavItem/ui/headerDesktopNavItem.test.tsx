import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { HeaderDesktopNavItem } from "./headerDesktopNavItem";
import { usePageContext } from "vike-react/usePageContext";

vi.mock("vike-react/usePageContext", () => ({
    usePageContext: vi.fn(),
}));

describe("HeaderDesktopNavItem — desktop nav link with active state detection based on URL", () => {
    it("renders a link with the correct href and title", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/" } as any);
        renderWithProviders(<HeaderDesktopNavItem href="/about" title="About" />);
        const link = screen.getByRole("link", { name: "About" });
        expect(link).toHaveAttribute("href", "/about");
    });

    it("sets aria-current=page when the first URL segment matches the href", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/about/team" } as any);
        renderWithProviders(<HeaderDesktopNavItem href="/about" title="About" />);
        expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
    });

    it("does not set aria-current when the URL does not match", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/news" } as any);
        renderWithProviders(<HeaderDesktopNavItem href="/about" title="About" />);
        expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    });
});
