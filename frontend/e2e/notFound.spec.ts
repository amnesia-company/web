import { test, expect } from "@playwright/test";

const URL = "/non-existent-page?lang=ru";

test.describe("NotFound — 404 error page", () => {
    test("page content loads", async ({ page }) => {
        await page.goto(URL);

        await expect(page.getByRole("dialog")).toBeVisible();
        await expect(page.getByRole("banner")).not.toBeVisible();
    });

    test("page title and meta description", async ({ page }) => {
        await page.goto(URL);

        await expect(page).toHaveTitle("Страница не найдена");
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
            "content",
            "Страница, которую вы ищете, не существует или была удалена"
        );
    });

    test("full page visual regression", async ({ page }) => {
        await page.goto(URL);
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveScreenshot("not-found-page.png");
    });

    test("displays 404 code", async ({ page }) => {
        await page.goto(URL);

        await expect(page.getByText("404")).toBeVisible();
    });

    test("displays error title", async ({ page }) => {
        await page.goto(URL);

        await expect(page.getByText("Ошибка")).toBeVisible();
    });

    test("back-to-home link navigates to the root page", async ({ page }) => {
        await page.goto(URL);

        const link = page.getByRole("link", { name: "Вернуться на главную страницу" });
        await expect(link).toBeVisible();
        await link.click();
        await expect(page).toHaveURL(/\/\?lang=[a-z]{2}$/);
    });
});
