import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/tests/renderWithProviders';
import { PrimaryButton } from './primaryButton';

describe('PrimaryButton — polymorphic button that renders as <a> or <button>', () => {
  it('renders a button element by default', () => {
    renderWithProviders(<PrimaryButton>Click</PrimaryButton>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('renders an anchor element when isLink is true', () => {
    renderWithProviders(
      <PrimaryButton isLink href="/">
        Go home
      </PrimaryButton>
    );
    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument();
  });

  it('passes href to the anchor', () => {
    renderWithProviders(
      <PrimaryButton isLink href="/about">
        About
      </PrimaryButton>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
  });

  it('merges a custom className', () => {
    renderWithProviders(<PrimaryButton className="extra">Label</PrimaryButton>);
    expect(screen.getByRole('button').className).toContain('extra');
  });
});
