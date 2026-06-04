import { StoreProvider } from './providers/storeProvider';
import { I18nProvider } from './providers/i18nProvider';
import { InitProvider } from './providers/initProvider';
import type { ReactNode } from 'react';
import './App.scss';
import './variables.scss';

/**
 * Root application component.
 *
 * Wraps the entire component tree in the required providers in the
 * following order: StoreProvider (Redux), I18nProvider (i18next),
 * InitProvider (initial data loading).
 */
interface AppProps {
  /** React child nodes to be wrapped by the providers. */
  children: ReactNode;
}

export function App({ children }: AppProps) {
  return (
    <StoreProvider>
      <I18nProvider>
        <InitProvider>{children}</InitProvider>
      </I18nProvider>
    </StoreProvider>
  );
}
