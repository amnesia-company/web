import { useTranslation } from 'react-i18next';

/**
 * Head tags for the home page.
 *
 * Sets <title> and <meta name="description"> from the i18n keys
 * title.main and description.main.
 */
export default function Head() {
  const { t } = useTranslation();
  return (
    <>
      <title>{t('title.main')}</title>
      <meta name="description" content={t('description.main')} />
    </>
  );
}
