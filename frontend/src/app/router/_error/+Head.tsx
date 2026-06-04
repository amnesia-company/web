import { useTranslation } from 'react-i18next';

/**
 * Head tags for the 404 page.
 *
 * Sets <title> and <meta name="description"> from the i18n keys
 * title.notFound and description.notFound.
 */
export default function Head() {
  const { t } = useTranslation();
  return (
    <>
      <title>{t('title.notFound')}</title>
      <meta name="description" content={t('description.notFound')} />
    </>
  );
}
