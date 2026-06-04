/**
 * Application-level Vike configuration.
 *
 * Extends the base vike-react configuration, enabling React-based
 * server-side and client-side rendering for all pages.
 */
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

export default {
  extends: [vikeReact],
  passToClient: ['locale'],
} satisfies Config;
