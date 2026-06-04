import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { HeaderDesktopNav } from './headerDesktopNav';
import { navConfig } from 'shared/config/navConfig';
import { useNavUnderline } from '../model/useNavUnderline';

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: vi.fn(() => ({ urlPathname: '/' })),
}));

vi.mock('../model/useNavUnderline', () => ({
  useNavUnderline: vi.fn(() => ({
    navRef: { current: null },
    displayPosition: null,
    isHiding: false,
    hasAppeared: false,
    onAnimationEnd: vi.fn(),
  })),
}));

describe('HeaderDesktopNav — desktop navigation bar with animated underline indicator', () => {
  it('renders all nav links from navConfig', () => {
    renderWithProviders(<HeaderDesktopNav />);
    navConfig.forEach((link) => {
      expect(screen.getByRole('link', { name: link.ariaLabel })).toBeInTheDocument();
    });
  });

  it('does not render the underline when displayPosition is null', () => {
    const { container } = renderWithProviders(<HeaderDesktopNav />);
    expect(container.querySelector('.underline')).toBeNull();
  });

  it('renders the underline with inline styles when displayPosition is set', () => {
    vi.mocked(useNavUnderline).mockReturnValue({
      navRef: { current: null },
      displayPosition: { left: 40, width: 100 },
      isHiding: false,
      hasAppeared: true,
      onAnimationEnd: vi.fn(),
    });
    const { container } = renderWithProviders(<HeaderDesktopNav />);
    const underline = container.querySelector('.underline') as HTMLElement;
    expect(underline).toBeInTheDocument();
    expect(underline.style.left).toBe('40px');
    expect(underline.style.width).toBe('100px');
  });
});
