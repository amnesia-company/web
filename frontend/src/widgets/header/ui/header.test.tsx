import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { Header } from "./header";
import { useWindowWidth } from "shared/hooks/useWindowWidth";

vi.mock("vike-react/usePageContext", () => ({
    usePageContext: vi.fn(() => ({ urlPathname: "/" })),
}));

vi.mock("shared/hooks/useWindowWidth", () => ({
    useWindowWidth: vi.fn(),
}));

const mockUser = {
    id: 1,
    name: "testUser",
    rating: 0,
    avatarUrl: "",
    backgroundUrl: "",
    status: "online",
    borderAvatarType: "default",
    createdAt: "2026-04-22T10:00:00.000Z",
};

describe("Header — adaptive header that switches between desktop and mobile layout based on window width", () => {
    it("renders the desktop header when window width is 1200 or more", () => {
        vi.mocked(useWindowWidth).mockReturnValue(1200);
        renderWithProviders(<Header principalUserInfo={mockUser} />);
        expect(screen.getByRole("link", { name: "header.logoAlt" })).toBeInTheDocument();
    });

    it("renders the burger button when window width is less than 1200", () => {
        vi.mocked(useWindowWidth).mockReturnValue(1199);
        renderWithProviders(<Header principalUserInfo={mockUser} />);
        expect(screen.getByRole("button", { name: "ariaLabel.openBurger" })).toBeInTheDocument();
    });
});
