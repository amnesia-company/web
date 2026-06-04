import type { RootState } from 'app/store';

/** Returns the current number of players online from the store. */
export const selectOnlineCount = (state: RootState) => state.appConfig.onlineCount;

/** Returns the active UI language code from the store. */
export const selectLanguage = (state: RootState) => state.appConfig.language;
