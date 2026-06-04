/**
 * Root reducer.
 *
 * Combines all slice reducers into a single reducer passed to the Redux
 * store.
 */
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from 'entities/user';
import { appConfigReducer } from 'entities/appConfig';
import { navUnderlineReducer } from 'features/headerDesktopNav';

export const rootReducer = combineReducers({
  user: userReducer,
  appConfig: appConfigReducer,
  navUnderline: navUnderlineReducer,
});
