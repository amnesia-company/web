import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'app/store';

/**
 * Redux store provider.
 *
 * Wraps the component tree in a Redux Provider, making the global store
 * available to all descendant components via useSelector and useDispatch.
 */
interface Props {
  /** React child nodes. */
  children: ReactNode;
}

export function StoreProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
