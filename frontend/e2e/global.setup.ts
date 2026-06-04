import { test as setup } from '@playwright/test';

/**
 * Global Playwright setup — runs once before all end-to-end test suites.
 * Intended for authentication and session state initialisation.
 */
setup('auth', async ({ page: _page }) => {

});
