import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',  // 👈 Убедитесь, что здесь ваш путь
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.CI 
      ? 'http://localhost:3000'  // В CI
      : 'http://localhost:5173', // Локальная разработка (Vite)
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // 👇 Добавьте для тестирования SSR (если нужно)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});