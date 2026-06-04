/**
 * @file Vitest configuration.
 *
 * Configures a jsdom environment for unit tests, enables Vitest global
 * variables (describe, it, expect), excludes end-to-end tests from unit
 * test runs, and sets a minimum coverage threshold for lines and
 * functions.
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/shared/tests/setup.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    css: {
      modules: { classNameStrategy: 'non-scoped' },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.*',
        'src/**/*.d.ts',
        'src/**/mockConst.ts',
        'src/**/index.ts',
        'src/**/+Page.tsx',
        'src/**/+route.ts',
        'src/**/+Head.tsx',
        'src/**/+Layout.tsx',
        'src/**/+config.ts',
        'src/**/*Config.ts',
        'src/pages/**',
        'src/app/providers/**',
        'src/app/App.tsx',
        'src/shared/const/**',
      ],
      thresholds: { lines: 70, functions: 70 },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      shared: resolve(__dirname, 'src/shared'),
      entities: resolve(__dirname, 'src/entities'),
      features: resolve(__dirname, 'src/features'),
      widgets: resolve(__dirname, 'src/widgets'),
      pages: resolve(__dirname, 'src/pages'),
      processes: resolve(__dirname, 'src/processes'),
      app: resolve(__dirname, 'src/app'),
    },
  },
});
