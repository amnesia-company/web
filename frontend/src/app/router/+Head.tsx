/**
 * Global `<head>` element applied to all pages.
 *
 * Loads the Manrope font from Google Fonts with preconnect hints for faster
 * loading. Sets base SEO tags: canonical with hreflang for a bilingual site
 * (ru/en), Open Graph tags for social media previews, icons, and mobile
 * address-bar theme colour.
 *
 * The domain is read from the `VITE_SITE_URL` environment variable.
 * Per-page `title`, `description` overrides are set at the
 * individual page level.
 */
export default function Head() {
  const baseUrl = import.meta.env.VITE_SITE_URL;

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#044F4D" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
        rel="stylesheet"
      />
      <link rel="canonical" href={`${baseUrl}?lang=en`} />
      <link rel="alternate" hrefLang="ru" href={`${baseUrl}?lang=ru`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}?lang=en`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:site_name" content="Amnesia" />
      <meta property="og:title" content="Amnesia" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />
    </>
  );
}
