import c from './headerDesktop.module.scss';
import { usePageContext } from 'vike-react/usePageContext';
import logo from 'shared/icons/logo.png';
import { useTranslation } from 'react-i18next';
import type { ComponentPropsWithoutRef } from 'react';
import { HeaderDesktopNav } from 'features/headerDesktopNav';
import { HeaderDesktopLinks } from 'features/headerDesktopLinks';
import type { UserType } from 'entities/user';

interface HeaderDesktopProps extends ComponentPropsWithoutRef<'div'> {
  /** Authenticated user profile. */
  principalUserInfo: UserType;
}

/**
 * Desktop application header.
 *
 * Contains a logo linking to the home page, the navigation bar,
 * and the user links block (theme toggle, support, profile).
 */
export const HeaderDesktop = ({ principalUserInfo, ...props }: HeaderDesktopProps) => {
  const { urlPathname } = usePageContext();
  const { t } = useTranslation();

  return (
    <div className={c.wrapper} {...props}>
      <div className={c.logo_wrapper}>
        <a aria-current={urlPathname === '/' ? 'page' : undefined} href="/" className={c.logo_link}>
          <img
            decoding="async"
            width="91"
            height="91"
            src={logo}
            alt={t('header.logoAlt')}
            className={c.logo}
          />
        </a>
      </div>
      <HeaderDesktopNav />
      <HeaderDesktopLinks
        userId={principalUserInfo.id}
        userAvatarUrl={principalUserInfo.avatarUrl}
        userName={principalUserInfo.name}
      />
    </div>
  );
};
