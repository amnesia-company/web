import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

/**
 * Redux store configuration.
 *
 * Exports the configured store instance along with derived TypeScript
 * types for use throughout the application.
 *
 * @example
 * const dispatch = useDispatch<AppDispatch>();
 * const name = useSelector((state: RootState) => state.user.name);
 */

/** Global Redux store instance. */
export const store = configureStore({
    reducer: rootReducer,
})

/** Inferred type of the entire Redux state tree. Use in useSelector callbacks. */
export type RootState = ReturnType<typeof store.getState>;

/** Inferred type of the store dispatch function. Use with useDispatch. */
export type AppDispatch = typeof store.dispatch;
