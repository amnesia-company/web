import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { BurgerMenu } from "./burgerMenu";
import { navConfig } from "shared/config/navConfig";

vi.mock("vike-react/usePageContext", () => ({
    usePageContext: vi.fn(() => ({ urlPathname: "/" })),
}));

describe("BurgerMenu — mobile menu with navigation and user links", () => {
    it("renders all nav items from navConfig", () => {
        renderWithProviders(
            <BurgerMenu isOpenMenu={false} userName="testUser" userId={1} />
        );
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThanOrEqual(navConfig.length);
    });

    it("applies the open CSS class when isOpenMenu is true", () => {
        const { container } = renderWithProviders(
            <BurgerMenu isOpenMenu={true} userName="testUser" userId={1} />
        );
        expect(container.firstChild).toHaveClass("open");
    });

    it("profile link href contains the userId", () => {
        renderWithProviders(
            <BurgerMenu isOpenMenu={false} userName="testUser" userId={42} />
        );
        expect(screen.getByText("testUser").closest("a")).toHaveAttribute("href", "/profile/42");
    });
});
