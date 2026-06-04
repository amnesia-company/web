/**
 * Navigation link configuration shared by the desktop and mobile nav.
 * Each entry contains i18n keys for the label and aria-label, and the route path.
 */
export const navConfig = [
  { title: 'header.news', href: '/news', ariaLabel: 'ariaLabel.goToNews' },
  { title: 'header.about', href: '/about', ariaLabel: 'ariaLabel.goToAbout' },
  { title: 'header.modes', href: '/modes', ariaLabel: 'ariaLabel.goToModes' },
  { title: 'header.beginners', href: '/beginners', ariaLabel: 'ariaLabel.goToBeginners' },
  { title: 'header.wiki', href: '/wiki', ariaLabel: 'ariaLabel.goToWiki' },
  { title: 'header.goods', href: '/goods', ariaLabel: 'ariaLabel.goToGoods' },
  { title: 'header.rules', href: '/rules', ariaLabel: 'ariaLabel.goToRules' },
  { title: 'header.media', href: '/media', ariaLabel: 'ariaLabel.goToMedia' },
] as const;

/** Union type representing a single navigation link config entry. */
export type ILink = (typeof navConfig)[number];
