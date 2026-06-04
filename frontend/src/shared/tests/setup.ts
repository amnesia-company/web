/**
 * Global Vitest test setup.
 *
 * Starts the MSW server before all tests, resets request handlers and
 * cleans up the DOM after each test, and closes the server once all
 * tests complete. Mocks window.matchMedia because jsdom does not
 * implement the Media Queries API.
 */
import '@testing-library/jest-dom';
import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mswServer';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

afterEach(() => {
    server.resetHandlers()
    cleanup()
});

afterAll(() => server.close());

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
