/**
 * "Advantages" section of the main page.
 *
 * Renders a section heading and a horizontal bar listing three key server
 * advantages. All text values are driven by i18n keys
 * (`index.advantagesTitle`, `index.advantage1`–`index.advantage3`).
 *
 * The decorative layer consists of:
 *   - a full-width section background image (`advantages-bg.png`);
 *   - a downward arrow divider (`advantages-arrow.svg`);
 *   - four corner decorations (`advantages-bg1–4.png`);
 *   - three small icon decorations (`advantages-bg1–3.svg`).
 * All decorative elements are hidden from screen readers (`aria-hidden="true"`).
 *
 * Accepts any standard HTML section attributes via rest props.
 */
import c from './advantages.module.scss';
import { useTranslation } from 'react-i18next';
import bg from 'shared/icons/advantages-bg.png';
import arrow from 'shared/icons/advantages-arrow.svg';
import decoration1 from 'shared/icons/advantages-bg1.png';
import decoration2 from 'shared/icons/advantages-bg2.png';
import decoration3 from 'shared/icons/advantages-bg3.png';
import decoration4 from 'shared/icons/advantages-bg4.png';
import iconDecoration1 from 'shared/icons/advantages-bg1.svg';
import iconDecoration2 from 'shared/icons/advantages-bg2.svg';
import iconDecoration3 from 'shared/icons/advantages-bg3.svg';

export const Advantages = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <section className={c.advantages} {...props}>
      <span className={c.bg} aria-hidden={true}>
        <img
          decoding="async"
          width="320"
          height="200"
          src={bg}
          alt={t('index.advantagesBgAlt')}
          className={c.bg_img}
        />
      </span>
      <span className={c.arrow} aria-hidden={true}>
        <img
          decoding="async"
          width="47"
          height="86"
          src={arrow}
          alt={t('index.advantagesArrowAlt')}
          className={c.img}
        />
      </span>
      <span className={c.decorate1} aria-hidden={true}>
        <img decoding="async" width="100" height="150" src={decoration1} alt="" className={c.img} />
      </span>
      <span className={c.decorate2} aria-hidden={true}>
        <img decoding="async" width="47" height="86" src={decoration2} alt="" className={c.img} />
      </span>
      <span className={c.decorate3} aria-hidden={true}>
        <img decoding="async" width="86" height="94" src={decoration3} alt="" className={c.img} />
      </span>
      <span className={c.decorate4} aria-hidden={true}>
        <img decoding="async" width="219" height="223" src={decoration4} alt="" className={c.img} />
      </span>
      <span className={c.decorate_small1} aria-hidden={true}>
        <img
          decoding="async"
          width="23"
          height="32"
          src={iconDecoration1}
          alt=""
          className={c.img}
        />
      </span>
      <span className={c.decorate_small2} aria-hidden={true}>
        <img
          decoding="async"
          width="18"
          height="25"
          src={iconDecoration2}
          alt=""
          className={c.img}
        />
      </span>
      <span className={c.decorate_small3} aria-hidden={true}>
        <img
          decoding="async"
          width="18"
          height="38"
          src={iconDecoration3}
          alt=""
          className={c.img}
        />
      </span>
      <h2 className={c.title}>{t('index.advantagesTitle').toUpperCase()}</h2>
      <div className={c.line}>
        <p className={c.advantage}>{t('index.advantage1').toUpperCase()}</p>
        <p className={c.advantage}>{t('index.advantage2').toUpperCase()}</p>
        <p className={c.advantage}>{t('index.advantage3').toUpperCase()}</p>
      </div>
    </section>
  );
};
