import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/rootReducer';
import { selectOnlineCount, selectLanguage } from './selectors';
import { setAppConfig, setLanguage } from './appConfigSlice';

describe('selectOnlineCount — returns the online player count from the store', () => {
  it('returns 0 from the initial state', () => {
    const store = configureStore({ reducer: rootReducer });
    expect(selectOnlineCount(store.getState())).toBe(0);
  });

  it('returns the updated count after dispatch', () => {
    const store = configureStore({ reducer: rootReducer });
    store.dispatch(setAppConfig({ onlineCount: 150 }));
    expect(selectOnlineCount(store.getState())).toBe(150);
  });
});

describe('selectLanguage — returns the active language code from the store', () => {
  it('returns an empty string from the initial state', () => {
    const store = configureStore({ reducer: rootReducer });
    expect(selectLanguage(store.getState())).toBe('');
  });

  it('returns the language after dispatch', () => {
    const store = configureStore({ reducer: rootReducer });
    store.dispatch(setLanguage('ru'));
    expect(selectLanguage(store.getState())).toBe('ru');
  });
});
