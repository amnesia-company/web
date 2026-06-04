import type { Dispatch, SetStateAction } from 'react';

/**
 * Toggles the burger menu open/closed state.
 *
 * @param setIsOpenBurger - State setter from the parent component.
 */
export function burgerClickHandler(setIsOpenBurger: Dispatch<SetStateAction<boolean>>) {
  setIsOpenBurger((state) => !state);
}
