import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { BurgerButton } from './burgerButton';

describe('BurgerButton — burger menu toggle button with accessibility support', () => {
  it('sets aria-expanded to false when the menu is closed', () => {
    renderWithProviders(
      <BurgerButton menuId="menu" isOpenBurger={false} setIsOpenBurger={vi.fn()} />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when the menu is open', () => {
    renderWithProviders(
      <BurgerButton menuId="menu" isOpenBurger={true} setIsOpenBurger={vi.fn()} />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-controls to the provided menuId', () => {
    renderWithProviders(
      <BurgerButton menuId="test-menu" isOpenBurger={false} setIsOpenBurger={vi.fn()} />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'test-menu');
  });

  it('calls setIsOpenBurger when clicked', () => {
    const setIsOpenBurger = vi.fn();
    renderWithProviders(
      <BurgerButton menuId="menu" isOpenBurger={false} setIsOpenBurger={setIsOpenBurger} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(setIsOpenBurger).toHaveBeenCalledTimes(1);
  });
});
