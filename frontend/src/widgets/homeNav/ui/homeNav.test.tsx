import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';
import { HomeNav } from './homeNav';

vi.mock('shared/hooks/useWindowWidth', () => ({
  useWindowWidth: vi.fn(() => 1200),
}));

describe('HomeNav — home page anchor navigation with desktop list and mobile icon grid', () => {
  it('renders 4 anchor links on desktop', () => {
    renderWithProviders(<HomeNav />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('renders ordinal numbers 01–04 on desktop', () => {
    renderWithProviders(<HomeNav />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('all desktop links point to the correct anchors', () => {
    renderWithProviders(<HomeNav />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '#about');
    expect(links[1]).toHaveAttribute('href', '#top');
    expect(links[2]).toHaveAttribute('href', '#register');
    expect(links[3]).toHaveAttribute('href', '#news');
  });

  it('renders 4 anchor links on mobile', () => {
    vi.mocked(useWindowWidth).mockReturnValueOnce(768);
    renderWithProviders(<HomeNav />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('renders all section labels in uppercase on mobile', () => {
    vi.mocked(useWindowWidth).mockReturnValueOnce(768);
    renderWithProviders(<HomeNav />);
    expect(screen.getByText('INDEX.ABOUT')).toBeInTheDocument();
    expect(screen.getByText('INDEX.TOPPLAYERS')).toBeInTheDocument();
    expect(screen.getByText('INDEX.REGISTER')).toBeInTheDocument();
    expect(screen.getByText('INDEX.NEWS')).toBeInTheDocument();
  });

  it('hides the background image from screen readers', () => {
    renderWithProviders(<HomeNav />);
    expect(screen.getByAltText('index.navBgAlt')).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes additional HTML attributes to the section element', () => {
    const { container } = renderWithProviders(<HomeNav id="nav-section" />);
    expect(container.querySelector('section#nav-section')).toBeInTheDocument();
  });
});
