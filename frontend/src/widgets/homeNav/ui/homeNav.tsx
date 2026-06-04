import c from './homeNav.module.scss';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';
import type { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'react-i18next';
import { homeNavConfig } from '../config/homeNavConfig';
import bg from 'shared/icons/home-nav-bg.png';
import arrow from 'shared/icons/home-nav-arrow.png';

/**
 * Home page navigation widget.
 *
 * Renders a list of anchor links to sections of the home page.
 * Desktop (≥ 1200 px): vertical list with an ordinal number and arrow icon.
 * Mobile: 2 × 2 icon grid with labels.
 *
 * @param props - native HTML attributes forwarded to the <section> element
 */
export const HomeNav = ({ ...props }: ComponentPropsWithoutRef<'section'>) => {
  const { t } = useTranslation();

  const currentWidth = useWindowWidth();
  const isDesktop = currentWidth >= 1200;

  return (
    <section className={c.navigation} {...props}>
      <img src={bg} alt={t('index.navBgAlt')} className={c.bg} aria-hidden={true} />
      <div className="container">
        {isDesktop ? (
          <nav className={c.desktop}>
            {homeNavConfig.map((item, i) => (
              <a
                key={`anchor link ${item.href}`}
                aria-label={t(item.ariaLabel)}
                href={item.href}
                className={c.item}
              >
                <p className={c.number}>{String(i + 1).padStart(2, '0')}</p>
                <div className={c.right}>
                  <p className={c.text}>{t(item.text)}</p>
                  <img
                    decoding="async"
                    width="100"
                    height="85"
                    src={arrow}
                    alt={t(item.imageAlt)}
                    className={c.arrow}
                  />
                </div>
              </a>
            ))}
          </nav>
        ) : (
          <nav className={c.mobile}>
            {homeNavConfig.map((item) => (
              <a
                key={`anchor link ${item.href}`}
                aria-label={t(item.ariaLabel)}
                href={item.href}
                className={c.item}
              >
                <div className={c.wrapper}>
                  <img src={item.imageUrl} alt={t(item.imageAlt)} className={c.img} />
                </div>
                <span className={c.text}>
                  <p className={c.title}>{t(item.text).toUpperCase()}</p>
                </span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
};
