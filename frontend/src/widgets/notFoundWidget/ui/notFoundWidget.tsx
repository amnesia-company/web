import c from './notFoundWidget.module.scss';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from 'features/primaryButton';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';

/**
 * Full-screen 404 overlay.
 *
 * Displays an error code and a back-to-home button.
 */
export const NotFoundWidget = () => {
  const { t } = useTranslation();

  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 1200;
  const buttonTextKey = isDesktop ? 'backToMainPageDesktop' : 'backToMainPageMobile';

  return (
    <section className={c.notFound}>
      <div className={c.background}>
        <div className="container">
          <dialog open className={c.modal}>
            <div className={c.text}>
              <p className={c.code}>404</p>
              <p className={c.error}>{t('error.error')}</p>
            </div>
            <PrimaryButton
              isLink={true}
              href="/"
              aria-label={t('ariaLabel.backToMainPage')}
              className={c.button}
            >
              {t(buttonTextKey)}
            </PrimaryButton>
          </dialog>
        </div>
      </div>
    </section>
  );
};
