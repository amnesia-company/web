import { test, expect } from '@playwright/test';

test.describe('Visual regression tests', () => {
  test('homepage should match screenshot', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
    });
  });

  test('login modal should match screenshot', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="login-button"]');
    await page.waitForSelector('[data-testid="login-modal"]');

    await page.waitForTimeout(300);

    await expect(page.locator('[data-testid="login-modal"]')).toHaveScreenshot('login-modal.png');
  });

  test('responsive design - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });

  test('responsive design - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png');
  });
});
