import aboutImg from 'shared/icons/home-nav-icon1.png';
import topImg from 'shared/icons/home-nav-icon2.png';
import registerImg from 'shared/icons/home-nav-icon3.png';
import newsImg from 'shared/icons/home-nav-icon4.png';

/**
 * A single navigation item for the HomeNav section.
 *
 * @property text - i18n key for the link label
 * @property ariaLabel - i18n key for the aria-label attribute
 * @property href - in-page anchor (e.g. "#about")
 * @property imageUrl - icon URL shown in the mobile layout
 * @property imageAlt - i18n key for the icon's alt text
 */
type HomeNavItem = {
  text: string;
  ariaLabel: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

/**
 * Navigation items for the HomeNav section.
 * Each entry corresponds to one anchor section on the home page.
 */
export const homeNavConfig: HomeNavItem[] = [
  {
    text: 'index.about',
    ariaLabel: 'ariaLabel.goToHomeAbout',
    href: '#about',
    imageUrl: aboutImg,
    imageAlt: 'index.aboutAlt',
  },
  {
    text: 'index.topPlayers',
    ariaLabel: 'ariaLabel.goToHomeTopPlayers',
    href: '#top',
    imageUrl: topImg,
    imageAlt: 'index.topPlayersAlt',
  },
  {
    text: 'index.register',
    ariaLabel: 'ariaLabel.goToHomeRegister',
    href: '#register',
    imageUrl: registerImg,
    imageAlt: 'index.registerAlt',
  },
  {
    text: 'index.news',
    ariaLabel: 'ariaLabel.goToHomeNews',
    href: '#news',
    imageUrl: newsImg,
    imageAlt: 'index.newsAlt',
  },
];
