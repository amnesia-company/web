import { usePageContext } from 'vike-react/usePageContext';
import { App } from 'app/App';
import { NotFound } from 'pages/notFound';

/**
 * Vike error page.
 *
 * Renders NotFound when is404 === true. Wrapped in App so that
 * Redux and i18n providers are available.
 */
export default function ErrorPage() {
  const { is404 } = usePageContext();

  return <App>{is404 && <NotFound />}</App>;
}
