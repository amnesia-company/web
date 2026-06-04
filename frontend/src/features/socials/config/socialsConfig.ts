import discord from 'shared/icons/icon-discord.svg';
import telegram from 'shared/icons/icon-telegram.svg';
import vkontakte from 'shared/icons/icon-vk.svg';
import tiktok from 'shared/icons/icon-tiktok.svg';
import youtube from 'shared/icons/icon-youtube.svg';

/**
 * Social network link configuration.
 * Each entry contains an icon, i18n keys for `aria-label` and `alt`, and a URL.
 */
export const socialsConfig = [
  {
    icon: discord,
    ariaLabel: 'ariaLabel.goToDiscord',
    href: 'https://discord.gg/yWAgBjXVHD',
    alt: 'header.discordAlt',
  },
  { icon: telegram, ariaLabel: 'ariaLabel.goToTelegram', href: '2', alt: 'header.telegramAlt' },
  {
    icon: vkontakte,
    ariaLabel: 'ariaLabel.goToVkontakte',
    href: 'https://vk.com/futureside_mc',
    alt: 'header.vkontakteAlt',
  },
  { icon: tiktok, ariaLabel: 'ariaLabel.goToTiktok', href: '4', alt: 'header.tiktokAlt' },
  { icon: youtube, ariaLabel: 'ariaLabel.goToYoutube', href: '5', alt: 'header.youtubeAlt' },
];
