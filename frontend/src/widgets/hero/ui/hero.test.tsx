import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { Hero } from './hero';

vi.mock('shared/icons/icon-copy.svg?url', () => ({ default: '/icon-copy.svg' }));

describe('Hero — hero section with server address and online player count', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('renders the top title in uppercase', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText('INDEX.TITLE_TOP')).toBeInTheDocument();
  });

  it('renders the bottom title in uppercase', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText('INDEX.TITLE_BOTTOM')).toBeInTheDocument();
  });

  it('renders the project name in uppercase', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText('INDEX.TITLE_NAME')).toBeInTheDocument();
  });

  it('renders the server address', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText('amnesia.ru')).toBeInTheDocument();
  });

  it('renders the online count from the Redux store', () => {
    renderWithProviders(<Hero />, {
      preloadedState: {
        user: {
          id: 0,
          name: '',
          rating: 0,
          avatarUrl: '',
          backgroundUrl: '',
          status: '',
          borderAvatarType: '',
          createdAt: '',
        },
        appConfig: { onlineCount: 42, language: '' },
        navUnderline: { position: null, hasAppeared: false },
      },
    });
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
