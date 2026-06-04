import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { CopyButton } from './copyButton';

vi.mock('shared/icons/icon-copy.svg?url', () => ({ default: '/icon-copy.svg' }));

describe('CopyButton — icon button that writes text to the clipboard on click', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('renders a button element', () => {
    renderWithProviders(<CopyButton text="amnesia.ru" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls clipboard.writeText with the text prop when clicked', () => {
    renderWithProviders(<CopyButton text="amnesia.ru" />);
    fireEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('amnesia.ru');
  });

  it('merges a custom className with the default style', () => {
    renderWithProviders(<CopyButton text="amnesia.ru" className="extra" />);
    expect(screen.getByRole('button').className).toContain('extra');
  });
});
