import { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { rootReducer } from 'app/store/rootReducer';

type PreloadedState = Parameters<
  typeof configureStore<ReturnType<typeof rootReducer>>
>[0]['preloadedState'];

/**
 * Options for the renderWithProviders helper.
 *
 * @property preloadedState - Pre-populated Redux state for the test scenario.
 * @property route          - Starting URL for the in-memory router (default: "/").
 */
interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: PreloadedState;
  route?: string;
}

/**
 * Renders a React element wrapped in all application providers for use
 * in unit tests. Wraps the given UI in a Redux Provider, I18nextProvider,
 * and MemoryRouter, replicating the real application environment.
 *
 * @param ui                     - The React element to render.
 * @param options.preloadedState - Initial Redux store state for the test.
 * @param options.route          - Initial URL passed to MemoryRouter (default: "/").
 * @returns The Testing Library render result extended with the store instance.
 */
export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = '/', ...renderOptions }: RenderWithProvidersOptions = {}
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </I18nextProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
