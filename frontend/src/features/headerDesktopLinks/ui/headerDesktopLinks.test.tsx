import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { HeaderDesktopLinks } from "./headerDesktopLinks";
import { usePageContext } from "vike-react/usePageContext";

vi.mock("vike-react/usePageContext", () => ({
    usePageContext: vi.fn(),
}));

describe("HeaderDesktopLinks — right header block with theme button, support link, and profile avatar", () => {
    it("renders the theme button, support link, and profile link", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/" } as any);
        renderWithProviders(
            <HeaderDesktopLinks userId={1} userAvatarUrl="" userName="testUser" />
        );
        expect(screen.getByRole("button", { name: "ariaLabel.changeTheme" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "ariaLabel.goToSupport" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "ariaLabel.goToMyProfile" })).toBeInTheDocument();
    });

    it("support link has aria-current=page when on the /support page", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/support" } as any);
        renderWithProviders(
            <HeaderDesktopLinks userId={1} userAvatarUrl="" userName="testUser" />
        );
        expect(screen.getByRole("link", { name: "ariaLabel.goToSupport" })).toHaveAttribute("aria-current", "page");
    });

    it("profile link has aria-current=page when on the /profile page", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/profile/1" } as any);
        renderWithProviders(
            <HeaderDesktopLinks userId={1} userAvatarUrl="" userName="testUser" />
        );
        expect(screen.getByRole("link", { name: "ariaLabel.goToMyProfile" })).toHaveAttribute("aria-current", "page");
    });

    it("renders the avatar image when userAvatarUrl is provided", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/" } as any);
        renderWithProviders(
            <HeaderDesktopLinks userId={1} userAvatarUrl="/avatar.png" userName="testUser" />
        );
        expect(screen.getByAltText("testUser")).toBeInTheDocument();
    });

    it("does not render the avatar image when userAvatarUrl is empty", () => {
        vi.mocked(usePageContext).mockReturnValue({ urlPathname: "/" } as any);
        renderWithProviders(
            <HeaderDesktopLinks userId={1} userAvatarUrl="" userName="testUser" />
        );
        expect(screen.queryByAltText("testUser")).toBeNull();
    });
});
