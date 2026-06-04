/**
 * MSW Node.js server instance for intercepting HTTP requests in unit tests.
 * Uses the handlers defined in ./handlers.
 */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
