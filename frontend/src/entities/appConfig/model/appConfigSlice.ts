import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppConfigType } from '../lib/types';

const initialState: AppConfigType = {
  onlineCount: 0,
  language: '',
};

/**
 * Redux slice for application-level configuration.
 * Stores state data unrelated to the current user.
 */
export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    /**
     * Partially updates the app config in the store.
     * Only the fields present in the payload are overwritten.
     *
     * @param action.payload - Partial AppConfigType object with the fields to update.
     */
    setAppConfig(state, action: PayloadAction<Partial<AppConfigType>>) {
      if (action.payload.onlineCount !== undefined) state.onlineCount = action.payload.onlineCount;
    },
    /**
     * Sets the active UI language code.
     *
     * @param action.payload - Two-letter language code (e.g. "ru", "en").
     */
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setAppConfig, setLanguage } = appConfigSlice.actions;

export const appConfigReducer = appConfigSlice.reducer;
