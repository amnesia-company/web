import c from './burgerButton.module.scss';
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { burgerClickHandler } from '../model/burgerClickHandler';
import clsx from 'clsx';

interface BurgerButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** `id` of the menu element this button controls; used for `aria-controls`. */
  menuId: string;
  /** Whether the burger menu is currently open; drives `aria-expanded` and visual state. */
  isOpenBurger: boolean;
  /** State setter from the parent component used to toggle the menu. */
  setIsOpenBurger: Dispatch<SetStateAction<boolean>>;
}

/**
 * Burger menu toggle button with full accessibility support.
 *
 * Renders three animated lines that transition into a cross when the menu is
 * open. Sets `aria-controls`, `aria-expanded`, and `aria-label` automatically
 * based on the current state.
 */
export const BurgerButton = ({
  menuId,
  isOpenBurger,
  setIsOpenBurger,
  ...props
}: BurgerButtonProps) => {
  const { t } = useTranslation();

  const ariaLabelText = isOpenBurger ? 'ariaLabel.closeBurger' : 'ariaLabel.openBurger';

  return (
    <button
      aria-controls={menuId}
      aria-expanded={isOpenBurger}
      aria-label={t(ariaLabelText)}
      className={clsx(c.burger, isOpenBurger && c.pressed)}
      type="button"
      onClick={() => burgerClickHandler(setIsOpenBurger)}
      {...props}
    >
      <div aria-hidden="true" className={clsx(c.burger_inner, isOpenBurger && c.open)}>
        <span className={c.line}></span>
        <span className={c.line}></span>
        <span className={c.line}></span>
      </div>
    </button>
  );
};
