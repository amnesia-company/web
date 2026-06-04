import { test, expect } from "@playwright/test";

const URL = "/?lang=ru";

test.describe("Home — widget visual regression", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.waitForLoadState("networkidle");
    });

    test("hero widget visual regression", async ({ page }) => {
        const hero = page.locator("section").first();
        await expect(hero).toHaveScreenshot("widget-hero.png");
    });

    test("advantages widget visual regression", async ({ page }) => {
        const advantages = page.locator("section").nth(1);
        await expect(advantages).toHaveScreenshot("widget-advantages.png");
    });

    test("homeNav widget visual regression", async ({ page }) => {
        const homeNav = page.locator("section").nth(2);
        await expect(homeNav).toHaveScreenshot("widget-homeNav.png");
    });
});


test.describe("Home — main page with hero, advantages and navigation sections", () => {
    test("page content loads", async ({ page }) => {
        await page.goto(URL);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("page title and meta description", async ({ page }) => {
        await page.goto(URL);

        await expect(page).toHaveTitle("Главная страница");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Amnesia — Minecraft сервер с уникальными режимами, ивентами и поддержкой 24/7. Более 700 игроков уже с нами — присоединяйся!"
        );
    });

    test("full page visual regression", async ({ page }) => {
        await page.goto(URL);
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveScreenshot("home-page.png");
    });

    test("renders hero section content", async ({ page }) => {
        await page.goto(URL);

        await expect(page.getByText("ДОБРО ПОЖАЛОВАТЬ")).toBeVisible();
        await expect(page.getByRole("button", { name: "Копировать" }).first()).toBeVisible();
    });

    test("renders advantages section content", async ({ page }) => {
        await page.goto(URL);

        await expect(page.getByRole("heading", { name: "ПОЧЕМУ МЫ?" })).toBeVisible();
        await expect(page.getByText("БОЛЕЕ 700+ ИГРОКОВ")).toBeVisible();
        await expect(page.getByText("ИНТЕРЕСНЫЕ ИВЕНТЫ")).toBeVisible();
        await expect(page.getByText("ПОДДЕРЖКА 24/7")).toBeVisible();
    });

    test("copy button is present and interactive", async ({ page }) => {
        await page.goto(URL);

        const copyButton = page.getByRole("button", { name: "Копировать" }).first();
        await expect(copyButton).toBeVisible();
        await expect(copyButton).toBeEnabled();
    });

    test("renders 4 navigation anchor links", async ({ page }) => {
        await page.goto(URL);

        const homeNav = page.locator("section").nth(2);
        await expect(homeNav.getByRole("link")).toHaveCount(4);
    });

    test("navigation links point to the correct anchors", async ({ page }) => {
        await page.goto(URL);

        const homeNav = page.locator("section").nth(2);
        const links = homeNav.getByRole("link");
        await expect(links.nth(0)).toHaveAttribute("href", "#about");
        await expect(links.nth(1)).toHaveAttribute("href", "#top");
        await expect(links.nth(2)).toHaveAttribute("href", "#register");
        await expect(links.nth(3)).toHaveAttribute("href", "#news");
    });
});
