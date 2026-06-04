import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { HeaderDesktop } from './headerDesktop';
import { usePageContext } from 'vike-react/usePageContext';

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: vi.fn(),
}));

const mockUser = {
  id: 1,
  name: 'testUser',
  rating: 0,
  avatarUrl: '',
  backgroundUrl: '',
  status: 'online',
  borderAvatarType: 'default',
  createdAt: '2026-04-22T10:00:00.000Z',
};

describe('HeaderDesktop — desktop header with logo, navigation bar, and user links block', () => {
  it('renders the home link with a logo image', () => {
    vi.mocked(usePageContext).mockReturnValue({ urlPathname: '/news' } as any);
    renderWithProviders(<HeaderDesktop principalUserInfo={mockUser} />);
    expect(screen.getByRole('link', { name: 'header.logoAlt' })).toHaveAttribute('href', '/');
  });

  it('logo link has aria-current=page on the home page', () => {
    vi.mocked(usePageContext).mockReturnValue({ urlPathname: '/' } as any);
    renderWithProviders(<HeaderDesktop principalUserInfo={mockUser} />);
    expect(screen.getByRole('link', { name: 'header.logoAlt' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('logo link does not have aria-current on any other page', () => {
    vi.mocked(usePageContext).mockReturnValue({ urlPathname: '/news' } as any);
    renderWithProviders(<HeaderDesktop principalUserInfo={mockUser} />);
    expect(screen.getByRole('link', { name: 'header.logoAlt' })).not.toHaveAttribute(
      'aria-current'
    );
  });
});
