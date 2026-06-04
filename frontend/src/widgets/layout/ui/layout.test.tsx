import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { Layout } from "./layout";

vi.mock("vike-react/usePageContext", () => ({
    usePageContext: vi.fn(() => ({ urlPathname: "/" })),
}));

vi.mock("shared/hooks/useWindowWidth", () => ({
    useWindowWidth: vi.fn(() => 1200),
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

describe("Layout — root page layout with a header and a main content area", () => {
    it("renders the header and the main element", () => {
        renderWithProviders(<Layout principalUserInfo={mockUser} />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("renders heroContent inside the hero section", () => {
        renderWithProviders(
            <Layout principalUserInfo={mockUser} heroContent={<h1>Hero</h1>} />
        );
        expect(screen.getByRole("heading", { name: "Hero" })).toBeInTheDocument();
    });

    it("renders children below the hero section", () => {
        renderWithProviders(
            <Layout principalUserInfo={mockUser}>
                <p>Page content</p>
            </Layout>
        );
        expect(screen.getByText("Page content")).toBeInTheDocument();
    });

    it("hides the header when isShowHeader is false", () => {
        renderWithProviders(
            <Layout principalUserInfo={mockUser} isShowHeader={false} />
        );
        expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    });
});
