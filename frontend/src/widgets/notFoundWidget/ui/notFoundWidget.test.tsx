import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { NotFoundWidget } from "./notFoundWidget";

vi.mock("shared/hooks/useWindowWidth", () => ({
    useWindowWidth: vi.fn(() => 1200),
}));

describe("NotFoundWidget — full-screen 404 overlay with error code and back button", () => {
    it("renders the 404 code", () => {
        renderWithProviders(<NotFoundWidget />);
        expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("renders the error message", () => {
        renderWithProviders(<NotFoundWidget />);
        expect(screen.getByText("error.error")).toBeInTheDocument();
    });

    it("renders a link back to the home page", () => {
        renderWithProviders(<NotFoundWidget />);
        expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    });

    it("uses the desktop button label when viewport is 1200px or wider", () => {
        renderWithProviders(<NotFoundWidget />);
        expect(screen.getByRole("link")).toHaveTextContent("backToMainPageDesktop");
    });

    it("uses the mobile button label when viewport is narrower than 1200px", () => {
        vi.mocked(useWindowWidth).mockReturnValueOnce(768);
        renderWithProviders(<NotFoundWidget />);
        expect(screen.getByRole("link")).toHaveTextContent("backToMainPageMobile");
    });
});
