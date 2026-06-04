/**
 * @file HTTP server for server-side rendering powered by Hono.
 *
 * In development mode the server is created via Node.js http.createServer.
 * Incoming requests are first handled by Vite middleware, which serves static
 * assets and enables HMR. Unhandled requests are forwarded to Hono via
 * getRequestListener, which performs SSR through Vike's renderPage.
 *
 * In production mode the server is started via serve() from @hono/node-server.
 * Static files are served from dist/client/ through serveStatic.
 * All other requests are rendered server-side via Vike's renderPage.
 *
 * Error handling:
 *   - EADDRINUSE — logs a port-in-use message and exits the process.
 *   - unhandledRejection — logs the reason without crashing the process.
 *   - SIGTERM / SIGINT — graceful shutdown: closes the HTTP server and Vite (dev).
 *
 * The port is configured via the PORT environment variable, defaulting to 3000.
 */
import { Hono } from 'hono';
import { serve, getRequestListener } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { renderPage } from 'vike/server';
import { createServer } from 'node:http';

const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT) || 3000;

/**
 * Resolves the request locale.
 *
 * Priority: `?lang=` query parameter → `Accept-Language` header → `"en"`.
 * The parameter must be a two-letter lowercase code (e.g. "ru", "en");
 * invalid values are ignored and the header is used as a fallback.
 */
function resolveLocale(url: string, acceptLanguage: string): string {
  try {
    const lang = new URL(url).searchParams.get('lang');
    if (lang && /^[a-z]{2}$/.test(lang)) return lang;
  } catch (e) {
    void e;
  }
  return acceptLanguage.split(',')[0]?.split(';')[0]?.trim().slice(0, 2).toLowerCase() || 'en';
}

const app = new Hono();

if (isProduction) {
  app.use('/*', serveStatic({ root: './dist/client' }));
}

app.all('*', async (c) => {
  const locale = resolveLocale(c.req.url, c.req.header('accept-language') ?? '');
  const pageContext = await renderPage({ urlOriginal: c.req.url, locale });
  const { httpResponse } = pageContext;
  if (!httpResponse) return c.notFound();
  const { body, statusCode, headers } = httpResponse;
  const responseHeaders = new Headers();
  headers.forEach(([k, v]) => responseHeaders.set(k, v));
  return new Response(body, { status: statusCode, headers: responseHeaders });
});

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

if (isProduction) {
  const server = serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[error] port ${port} is already in use`);
      process.exit(1);
    }
    throw err;
  });

  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({ server: { middlewareMode: true } });
  const honoHandler = getRequestListener(app.fetch);

  const server = createServer((req, res) => {
    vite.middlewares(req, res, () => honoHandler(req, res));
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[error] port ${port} is already in use`);
      process.exit(1);
    }
    throw err;
  });

  const shutdown = async () => {
    server.close();
    await vite.close();
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port} in development mode`);
  });
}
