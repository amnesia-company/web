import c from './header.module.scss';
import { BurgerButton } from 'features/burgerButton';
import { type ComponentPropsWithoutRef, startTransition, useEffect, useState } from 'react';
import { BurgerMenu } from 'features/burgerMenu';
import type { UserType } from 'entities/user';
import { usePageContext } from 'vike-react/usePageContext';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';
import { HeaderDesktop } from 'widgets/headerDesktop';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  /** Authenticated user profile. */
  principalUserInfo: UserType;
}

/**
 * Adaptive application header.
 *
 * Renders `HeaderDesktop` on wide viewports (≥1200 px) and a burger button
 * with `BurgerMenu` on narrower ones. Automatically closes the menu on URL change.
 */
export const Header = ({ principalUserInfo, ...props }: HeaderProps) => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const { urlPathname } = usePageContext();
  const windowWidth = useWindowWidth();

  const isDesktop = windowWidth >= 1200;

  useEffect(() => {
    startTransition(() => setIsOpenBurger(false));
  }, [urlPathname]);

  return (
    <header className={c.header} {...props}>
      <div className="container">
        {isDesktop ? (
          <HeaderDesktop principalUserInfo={principalUserInfo} />
        ) : (
          <>
            <BurgerButton
              menuId="menu"
              isOpenBurger={isOpenBurger}
              setIsOpenBurger={setIsOpenBurger}
            />
            <BurgerMenu
              id="menu"
              userName={principalUserInfo.name}
              userId={principalUserInfo.id}
              isOpenMenu={isOpenBurger}
            />
          </>
        )}
      </div>
    </header>
  );
};
